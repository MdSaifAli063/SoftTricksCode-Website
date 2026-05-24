import clsx from 'clsx';
import { Phone } from 'lucide-react';
import {
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
} from 'react-icons/fa6';
import GlassCard from './GlassCard';

const SOCIAL_CONFIG = [
  { key: 'github', Icon: FaGithub, label: 'GitHub', hover: 'hover:text-stc-primary' },
  { key: 'youtube', Icon: FaYoutube, label: 'YouTube', hover: 'hover:text-red-500' },
  { key: 'linkedin', Icon: FaLinkedin, label: 'LinkedIn', hover: 'hover:text-stc-primary' },
  { key: 'instagram', Icon: FaInstagram, label: 'Instagram', hover: 'hover:text-pink-500' },
  { key: 'twitter', Icon: FaXTwitter, label: 'X', hover: 'hover:text-stc-black' },
];

const imageClasses = {
  cutout: 'h-36 w-auto max-w-[120px] object-contain',
  portrait: 'h-36 w-28 rounded-2xl border border-stc-primary/20 object-cover object-top',
};

export default function FounderCard({ founder, compact = false, light = false }) {
  const activeSocials = SOCIAL_CONFIG.filter(({ key }) => founder.social?.[key]?.trim());

  return (
    <GlassCard light={light} glow={!light} tilt={false}>
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
        <img
          src={founder.photo}
          alt={founder.name}
          className={clsx('shrink-0', imageClasses[founder.imageVariant] || imageClasses.cutout)}
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h3
            className={clsx(
              'font-heading text-lg font-bold',
              light ? 'text-stc-black' : 'text-white'
            )}
          >
            {founder.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-stc-primary">{founder.role}</p>
          {!compact && (
            <p className={clsx('mt-2 text-sm', light ? 'text-stc-muted' : 'text-stc-gray')}>
              {founder.bio}
            </p>
          )}
          {founder.phone && (
            <a
              href={`tel:${founder.phoneTel}`}
              className={clsx(
                'mt-2 inline-flex items-center gap-2 text-sm transition hover:text-stc-primary',
                light ? 'text-stc-muted' : 'text-stc-gray'
              )}
            >
              <Phone size={14} className="text-stc-primary" />
              {founder.phone}
            </a>
          )}
          {activeSocials.length > 0 ? (
            <div className="mt-2 flex flex-wrap justify-center gap-3 sm:justify-start">
              {activeSocials.map(({ key, Icon, label, hover }) => (
                <a
                  key={key}
                  href={founder.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    'transition',
                    light ? 'text-stc-muted ' + hover : 'text-stc-gray ' + hover
                  )}
                  aria-label={`${founder.name} on ${label}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          ) : (
            !light && (
              <p className="mt-2 text-xs text-stc-gray/60 italic">Social links coming soon</p>
            )
          )}
        </div>
      </div>
    </GlassCard>
  );
}
