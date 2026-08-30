import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { Canvas, useFrame } from '@react-three/fiber';
import ErrorBoundary from './ErrorBoundary';

const COUNT = 120;
const THRESHOLD = 2.8;

function createRandom(seed = 42) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function ParticleNetwork() {
  const groupRef = useRef();

  const [positions, connections] = useMemo(() => {
    const random = createRandom(12345);
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (random() - 0.5) * 16;
      pos[i * 3 + 1] = (random() - 0.5) * 16;
      pos[i * 3 + 2] = (random() - 0.5) * 16;
    }
    const linePositions = [];
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < THRESHOLD * THRESHOLD) {
          linePositions.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }
    return [pos, new Float32Array(linePositions)];
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#60a5fa" transparent opacity={0.7} />
      </points>
      {connections.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[connections, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#2563eb" transparent opacity={0.12} />
        </lineSegments>
      )}
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.25]} gl={{ antialias: false }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
      <ParticleNetwork />
    </Canvas>
  );
}

export default function ParticleBackground() {
  const isMobile = useIsMobile();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <ErrorBoundary fallback={null}>
        {!paused && (
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        )}
      </ErrorBoundary>
    </div>
  );
}
