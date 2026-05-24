/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'stc-black': '#030712',
        'stc-navy': '#0a1628',
        'stc-dark': '#0f2744',
        'stc-primary': '#2563eb',
        'stc-primary-light': '#3b82f6',
        'stc-primary-dark': '#1d4ed8',
        'stc-cyan': '#00d4ff',
        'stc-gray': '#94a3b8',
        'stc-muted': '#64748b',
        'stc-light': '#f0f4f8',
        'stc-surface': '#ffffff',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        fly: '0 20px 50px -12px rgba(37, 99, 235, 0.35)',
        'fly-lg': '0 25px 60px -15px rgba(37, 99, 235, 0.45)',
        'fly-card': '0 8px 32px rgba(37, 99, 235, 0.2)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-stc': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e3a8a 100%)',
        'gradient-hero':
          'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(37,99,235,0.55) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(59,130,246,0.25) 0%, transparent 50%), linear-gradient(180deg, #0c1a3a 0%, #030712 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a1628 0%, #030712 100%)',
        'gradient-blue': 'linear-gradient(135deg, #2563eb, #1e40af)',
        'gradient-card-dark':
          'linear-gradient(135deg, rgba(15,39,68,0.95) 0%, rgba(3,7,18,0.98) 100%)',
        'rays':
          'repeating-conic-gradient(from 0deg at 50% 0%, rgba(37,99,235,0.08) 0deg 8deg, transparent 8deg 16deg)',
      },
    },
  },
  plugins: [],
};
