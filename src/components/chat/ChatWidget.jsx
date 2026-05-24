import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { BackToTopButton } from '../global/FloatingActions';
import { useBooking } from '../../context/BookingContext';
import { SITE } from '../../constants/site';

const QUICK_REPLIES = [
  { label: 'See our services', action: 'services' },
  { label: 'Get a quote', action: 'quote' },
  { label: 'Book a call', action: 'book' },
  { label: 'Talk to a human', action: 'human' },
];

const BOT_RESPONSES = {
  services:
    'We offer Web Development, Mobile Apps, AI/ML, Healthcare, Agriculture, EdTech, Cloud & Cybersecurity. Visit our Services page!',
  quote:
    'Plans start at ₹15,000 (Starter) and ₹45,000 (Professional). Enterprise is custom — all prices are negotiable.',
  book: 'Opening the booking form for you...',
  human: `A team member will reach out within 24 hours. Call ${SITE.phone} or email ${SITE.email}`,
  default:
    'Thanks for your message! Our team will get back to you shortly. Explore our portfolio or book a free consultation.',
};

function ChatFab({ onClick }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex items-center justify-end"
        aria-label="Open chat — we're online"
      >
        <span className="pointer-events-none absolute -inset-1 rounded-full opacity-0 shadow-[0_8px_32px_rgba(37,99,235,0.55)] transition-opacity group-hover:opacity-100" />

        <span className="relative mr-0 hidden max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-white px-0 py-2.5 text-sm font-semibold text-stc-black shadow-lg transition-all duration-300 group-hover:mr-3 group-hover:max-w-[200px] group-hover:px-4 sm:block">
          Chat with us
        </span>

        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <span className="chat-fab-pulse" aria-hidden />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-stc-primary-light via-stc-primary to-stc-primary-dark text-white shadow-[0_10px_28px_rgba(37,99,235,0.55)] ring-2 ring-white/20 transition group-hover:shadow-[0_12px_36px_rgba(37,99,235,0.65)]">
            <MessageCircle size={26} strokeWidth={2} className="translate-y-px" />
          </span>
          <span
            className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-stc-black bg-emerald-500 px-1 text-[10px] font-bold text-white"
            aria-hidden
          >
            1
          </span>
        </span>
      </motion.button>
    </motion.div>
  );
}

export default function ChatWidget({ open, onOpenChange }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! 👋 I'm SoftTricksCode Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text) => {
    setTimeout(() => setMessages((m) => [...m, { from: 'bot', text }]), 500);
  };

  const handleQuickReply = (action) => {
    const label = QUICK_REPLIES.find((q) => q.action === action)?.label;
    setMessages((m) => [...m, { from: 'user', text: label }]);
    if (action === 'book') {
      addBotMessage(BOT_RESPONSES.book);
      setTimeout(() => {
        onOpenChange(false);
        openBooking();
      }, 800);
    } else {
      addBotMessage(BOT_RESPONSES[action] || BOT_RESPONSES.default);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: 'user', text: input }]);
    setInput('');
    addBotMessage(BOT_RESPONSES.default);
  };

  return (
    <>
      <div
        className="fixed bottom-5 right-4 z-50 flex flex-col items-center gap-3 safe-bottom sm:bottom-6 sm:right-6"
        aria-label="Quick actions"
      >
        <BackToTopButton hidden={open} />
        {!open && <ChatFab onClick={() => onOpenChange(true)} />}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-x-0 bottom-0 z-50 flex h-[min(88dvh,520px)] w-full flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-gradient-to-b from-stc-navy to-stc-black shadow-fly-lg sm:inset-x-auto sm:bottom-6 sm:right-6 sm:left-auto sm:h-[500px] sm:w-[min(100vw-2rem,380px)] sm:rounded-3xl"
            role="dialog"
            aria-label="Chat support"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-stc-primary/20 px-4 py-3">
              <div>
                <p className="font-serif font-bold text-white">SoftTricksCode</p>
                <p className="text-xs text-green-400">● Online — replies within 24h</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-stc-gray hover:text-white"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4 hide-scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.from === 'user'
                        ? 'bg-stc-primary text-white'
                        : 'border border-white/10 bg-white/5 text-stc-gray'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q.action}
                      type="button"
                      onClick={() => handleQuickReply(q.action)}
                      className="rounded-full border border-stc-primary/40 bg-stc-primary/10 px-3 py-1.5 text-xs font-medium text-stc-primary-light transition hover:bg-stc-primary hover:text-white"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSend} className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-stc-gray/50 focus:border-stc-primary focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stc-primary text-white transition hover:bg-stc-primary-light"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
