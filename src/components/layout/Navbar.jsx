import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import { useBooking } from '../../context/BookingContext';
import clsx from 'clsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ onChatOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const navLinkClass = ({ isActive }) =>
    clsx(
      'px-3 py-2 text-sm font-medium transition-colors',
      isActive ? 'text-white' : 'text-stc-gray hover:text-white'
    );

  return (
    <>
      <header
        className={clsx(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-white/10 bg-stc-black/90 backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
          aria-label="Main"
        >
          <BrandLogo className="shrink-0" />

          <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                openBooking();
                onChatOpen?.();
              }}
              className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/5 py-2 pl-4 pr-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/10 sm:inline-flex sm:text-sm"
            >
              Let&apos;s Talk
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stc-primary">
                <Phone size={16} />
              </span>
            </button>
            <button
              type="button"
              className="rounded-full p-2 text-white lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] flex flex-col bg-stc-black lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <BrandLogo asLink={false} />
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={28} className="text-white" />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-serif text-lg text-white hover:bg-stc-primary/20"
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openBooking();
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-stc-primary py-3.5 font-semibold text-white"
              >
                Let&apos;s Talk <Phone size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
