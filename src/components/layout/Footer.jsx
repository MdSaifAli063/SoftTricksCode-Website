import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaYoutube, FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendEmail, TEMPLATE_IDS } from '../../utils/emailService';
import { SITE } from '../../constants/site';
import BrandLogo from '../ui/BrandLogo';
import { useBooking } from '../../context/BookingContext';
import clsx from 'clsx';

const quickLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Our Services' },
  { to: '/about', label: 'Our Team' },
  { to: '/blog', label: 'Latest Blog' },
  { to: '/contact', label: 'Contact Us' },
];

const serviceLinks = [
  'Website',
  'Web Apps',
  'Mobile App Development',
  'Digital Marketing',
  'Logo & Branding',
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const { openBooking } = useBooking();

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!consent) {
      toast.error('Please agree to receive updates.');
      return;
    }
    setLoading(true);
    const result = await sendEmail(TEMPLATE_IDS.newsletter, {
      from_name: 'Newsletter',
      from_email: email,
      message: 'Newsletter subscription',
    });
    setLoading(false);
    if (result.success) {
      toast.success('Subscribed successfully!');
      setEmail('');
      setConsent(false);
    } else {
      toast.success('Thanks for subscribing!');
      setEmail('');
      setConsent(false);
    }
  };

  return (
    <footer className="relative mt-20 bg-stc-black">
      {/* Overlapping consultation CTA */}
      <div className="container-page relative z-20 -translate-y-1/2">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-stc-primary px-4 py-6 shadow-fly-lg sm:flex-row sm:px-10 sm:py-7">
          <button
            type="button"
            onClick={openBooking}
            className="max-w-full text-center font-serif text-lg font-bold leading-snug text-white sm:text-left sm:text-2xl"
          >
            Do you need free Consultation?
          </button>
          <a
            href={`mailto:${SITE.email}`}
            className="flex w-full max-w-full items-center gap-3 transition hover:opacity-90 sm:w-auto sm:gap-4"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-stc-primary sm:h-14 sm:w-14">
              <Mail size={24} />
            </span>
            <div className="min-w-0 text-left">
              <span className="block text-xs font-medium text-white">Send E-mail</span>
              <span className="break-anywhere text-sm font-semibold text-white sm:text-lg">
                {SITE.email}
              </span>
            </div>
          </a>
        </div>
      </div>

      <div className="footer-waves relative border-t border-white/5 pt-28 sm:pt-32">
        <div className="section-padding mx-auto max-w-7xl !pt-0">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <BrandLogo iconSize={56} />
              <p className="mt-4 text-sm leading-relaxed text-stc-gray">
                Building world-class software that solves real problems. Founded by Md Saif Ali &
                Ashwini T Gadad — serving clients worldwide from India.
              </p>
              <div className="mt-6 flex gap-2">
                {[
                  { href: 'https://github.com/Soft-Tricks-Code', icon: FaGithub, label: 'GitHub' },
                  {
                    href: 'https://www.youtube.com/@SoftTricksCode',
                    icon: FaYoutube,
                    label: 'YouTube',
                    highlight: true,
                  },
                  { href: 'https://twitter.com/SoftTricksCode', icon: FaTwitter, label: 'Twitter' },
                  { href: 'https://www.linkedin.com/company/softtrickscode', icon: FaLinkedin, label: 'LinkedIn' },
                  { href: 'https://www.instagram.com/softtrickscode', icon: FaInstagram, label: 'Instagram' },
                  { href: 'https://www.facebook.com/share/1BQQPVEXKF', icon: FaFacebook, label: 'Facebook' },
                ].map(({ href, icon: Icon, label, highlight }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={clsx(
                      'flex h-10 w-10 items-center justify-center rounded-full transition',
                      highlight
                        ? 'bg-stc-primary text-white'
                        : 'bg-white/5 text-stc-gray hover:bg-stc-primary hover:text-white'
                    )}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-white">Quick Links</h3>
              <ul className="mt-5 space-y-2.5">
                {quickLinks.map((link) => {
                  const active = pathname === link.to;
                  return (
                    <li key={link.label} className="flex items-center gap-2">
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-stc-primary" aria-hidden />
                      )}
                      <Link
                        to={link.to}
                        className={clsx(
                          'text-sm transition',
                          active ? 'text-white' : 'text-stc-gray hover:text-stc-primary-light'
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-white">Services</h3>
              <ul className="mt-5 space-y-2.5">
                {serviceLinks.map((title) => (
                  <li key={title}>
                    <Link
                      to="/services"
                      className="text-sm text-stc-gray transition hover:text-stc-primary-light"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-white">Newsletter</h3>
              <p className="mt-2 text-sm text-stc-gray">Don&apos;t miss the latest news</p>
              <form onSubmit={handleNewsletter} className="mt-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter E-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-5 pr-14 text-sm text-white placeholder:text-stc-gray/50 focus:border-stc-primary focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-stc-primary text-white transition hover:bg-stc-primary-light disabled:opacity-50"
                    aria-label="Subscribe"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <label className="mt-3 flex cursor-pointer items-start gap-2 text-xs text-stc-gray">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-white/20"
                  />
                  Please sign up for any updates
                </label>
              </form>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-stc-gray sm:flex-row sm:text-left sm:text-sm">
            <p>© {new Date().getFullYear()} Soft Tricks Code. All Rights Reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <span className="text-white/20">|</span>
              <Link to="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
