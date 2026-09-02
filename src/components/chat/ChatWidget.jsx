import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Code2,
  DollarSign,
  Briefcase,
  Calendar,
} from 'lucide-react';
import { BackToTopButton } from '../global/FloatingActions';
import { useBooking } from '../../context/BookingContext';
import { processUserQuery } from './chatEngine';
import { BRAND_ASSETS } from '../../constants/brand';
import { SITE } from '../../constants/site';

const STARTER_PROMPTS = [
  {
    icon: Code2,
    title: 'Explore Services',
    desc: 'Web apps, Mobile, AI & Cloud',
    query: 'What services do you offer?',
  },
  {
    icon: DollarSign,
    title: 'Pricing & Plans',
    desc: 'Starter from ₹5,999 • Negotiable',
    query: 'What is your pricing?',
  },
  {
    icon: Briefcase,
    title: 'Live Portfolio',
    desc: 'Computer World, LandHub, Mietaaf',
    query: 'Show me your portfolio projects',
  },
  {
    icon: Calendar,
    title: 'Book Discovery Call',
    desc: 'Free 30-min call with founders',
    query: 'I want to book a call',
  },
];

const INITIAL_QUICK_CHIPS = [
  { label: 'Services', query: 'What services do you offer?' },
  { label: 'Pricing & Plans', query: 'What is your pricing?' },
  { label: 'Live Portfolio', query: 'Show me your portfolio projects' },
  { label: 'Meet Founders', query: 'Who are the founders?' },
  { label: 'Book Free Call', query: 'I want to book a call' },
  { label: 'Careers & Jobs', query: 'Are you hiring?' },
];

let messageCounter = 100;
function getNextId() {
  messageCounter += 1;
  return `msg_${messageCounter}`;
}

function getCurrentTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-300 shadow-md backdrop-blur-md"
    >
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: '150ms' }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-xs text-slate-400 ml-1">Soft Tricks Code AI is thinking...</span>
    </motion.div>
  );
}

function FormattedText({ text, onNavigate }) {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-[13px] sm:text-sm leading-relaxed">
      {lines.map((line, idx) => {
        if (!line.trim()) {
          return <div key={idx} className="h-1" />;
        }

        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
        const content = isBullet ? line.trim().replace(/^[•-]\s*/, '') : line;

        const parts = [];
        const regex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(content)) !== null) {
          if (match.index > lastIndex) {
            parts.push(content.substring(lastIndex, match.index));
          }

          if (match[2]) {
            parts.push(
              <strong key={match.index} className="font-semibold text-white">
                {match[2]}
              </strong>
            );
          } else if (match[3] && match[4]) {
            const linkText = match[3];
            const href = match[4];
            const isInternal = href.startsWith('/');

            parts.push(
              <a
                key={match.index}
                href={href}
                onClick={(e) => {
                  if (isInternal) {
                    e.preventDefault();
                    onNavigate(href);
                  }
                }}
                target={isInternal ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="font-medium text-cyan-300 underline decoration-cyan-400/40 underline-offset-2 hover:text-white hover:decoration-white transition"
              >
                {linkText}
              </a>
            );
          }

          lastIndex = regex.lastIndex;
        }

        if (lastIndex < content.length) {
          parts.push(content.substring(lastIndex));
        }

        return (
          <div key={idx} className={isBullet ? 'flex items-start gap-2 pl-1' : ''}>
            {isBullet && <span className="text-cyan-400 select-none font-bold">•</span>}
            <div className="flex-1 text-slate-200">{parts}</div>
          </div>
        );
      })}
    </div>
  );
}

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

        <span className="relative mr-0 hidden max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-white px-0 py-2.5 text-sm font-bold text-stc-black shadow-lg transition-all duration-300 group-hover:mr-3 group-hover:max-w-[220px] group-hover:px-4 sm:block">
          Ask AI Assistant ✨
        </span>

        <span className="relative flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center">
          <span className="chat-fab-pulse" aria-hidden />
          <span className="relative flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-stc-primary-light via-stc-primary to-stc-primary-dark text-white shadow-[0_8px_20px_rgba(37,99,235,0.45)] ring-2 ring-white/20 transition group-hover:shadow-[0_12px_36px_rgba(37,99,235,0.65)]">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 translate-y-px" strokeWidth={2} />
          </span>
          <span
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 sm:h-5 sm:min-w-5 items-center justify-center rounded-full border-[1.5px] sm:border-2 border-stc-black bg-emerald-500 px-0.5 sm:px-1 text-[8px] sm:text-[10px] font-bold text-white shadow-sm"
            aria-hidden
          >
            AI
          </span>
        </span>
      </motion.button>
    </motion.div>
  );
}

export default function ChatWidget({ open, onOpenChange }) {
  const navigate = useNavigate();
  const { openBooking } = useBooking();
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'initial_1',
      from: 'bot',
      text: 'Hello! 👋 How can I help you today?',
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'Pricing & Packages', action: 'nav_pricing' },
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (messages.length > 1) {
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
        inputRef.current?.focus();
      }, 150);
    }
  }, [open, messages, isTyping]);

  const handleActionClick = (action) => {
    if (action === 'nav_services') {
      onOpenChange(false);
      navigate('/services');
    } else if (action === 'nav_portfolio') {
      onOpenChange(false);
      navigate('/portfolio');
    } else if (action === 'nav_pricing') {
      onOpenChange(false);
      navigate('/pricing');
    } else if (action === 'nav_about') {
      onOpenChange(false);
      navigate('/about');
    } else if (action === 'nav_contact') {
      onOpenChange(false);
      navigate('/contact');
    } else if (action === 'nav_careers') {
      onOpenChange(false);
      navigate('/careers');
    } else if (action === 'nav_home') {
      onOpenChange(false);
      navigate('/');
    } else if (action === 'nav_blog') {
      onOpenChange(false);
      navigate('/blog');
    } else if (action === 'nav_privacy') {
      onOpenChange(false);
      navigate('/privacy-policy');
    } else if (action === 'nav_terms') {
      onOpenChange(false);
      navigate('/terms');
    } else if (action === 'book_call') {
      onOpenChange(false);
      openBooking();
    } else if (action === 'whatsapp_saif') {
      const url = `https://wa.me/${SITE.phoneTel.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
        'Hi Saif! I would like to discuss a project with Soft Tricks Code.'
      )}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (action === 'email_us') {
      window.open(`mailto:${SITE.email}?subject=Project%20Inquiry%20-%20Soft%20Tricks%20Code`, '_self');
    }
  };

  const handleSendMessage = (userText) => {
    const textToSend = (userText || input).trim();
    if (!textToSend) return;

    const userMessage = {
      id: getNextId(),
      from: 'user',
      text: textToSend,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processUserQuery(textToSend);
      const botMessage = {
        id: getNextId(),
        from: 'bot',
        text: response.text,
        actions: response.actions,
        time: getCurrentTime(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 550);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: getNextId(),
        from: 'bot',
        text: 'Hello! 👋 How can I help you today?',
        actions: [
          { label: 'Explore Services', action: 'nav_services' },
          { label: 'Pricing & Packages', action: 'nav_pricing' },
          { label: 'View Portfolio', action: 'nav_portfolio' },
          { label: 'Book Free Call', action: 'book_call' },
        ],
        time: getCurrentTime(),
      },
    ]);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <div
        className="fixed bottom-2 z-50 flex flex-col items-center gap-2 safe-bottom sm:bottom-6 sm:gap-3"
        style={{ right: 'max(0.75rem, env(safe-area-inset-right))' }}
        aria-label="Quick actions"
      >
        <BackToTopButton hidden={open} />
        {!open && <ChatFab onClick={() => onOpenChange(true)} />}
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onOpenChange(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs sm:hidden"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 flex h-[68dvh] max-h-[560px] min-h-[420px] w-full flex-col overflow-hidden rounded-t-3xl border-t border-x sm:border border-white/20 bg-gradient-to-b from-[#091124] via-[#050b18] to-[#02050e] shadow-[0_-15px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(37,99,235,0.25)] backdrop-blur-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:w-[420px] sm:rounded-3xl"
              role="dialog"
              aria-label="Soft Tricks Code AI Assistant"
            >
              {/* Drag Handle on Mobile */}
              <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-white/25 sm:hidden" aria-hidden="true" />

              {/* Ambient Background Glow Elements */}
              <div
                className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-blue-600/15 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-16 top-1/3 h-48 w-48 rounded-full bg-indigo-600/15 blur-3xl"
                aria-hidden
              />

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2.5 sm:py-3.5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 shadow-inner">
                    <img
                      src={BRAND_ASSETS.logoOnDark100}
                      alt="Soft Tricks Code"
                      className="h-6 w-6 object-contain"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#091124] animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-body text-sm font-bold tracking-tight text-white">
                        Soft Tricks Code
                      </p>
                      <span className="rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-white shadow-xs">
                        AI
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                      Online • Instant 24/7 AI Engine
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleResetChat}
                    title="Reset conversation"
                    className="flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                    aria-label="Reset chat"
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
                    aria-label="Close chat"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Scroll Area */}
              <div ref={scrollContainerRef} className="relative z-10 flex-1 space-y-3.5 overflow-y-auto p-4 pt-3.5 hide-scrollbar">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`relative max-w-[92%] rounded-2xl px-4 py-3.5 shadow-lg ${
                        msg.from === 'user'
                          ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-br-xs shadow-[0_4px_20px_rgba(37,99,235,0.4)]'
                          : 'border border-white/12 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-[#0b162e]/90 text-slate-200 rounded-bl-xs backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                      }`}
                    >
                      <FormattedText
                        text={msg.text}
                        onNavigate={(path) => {
                          onOpenChange(false);
                          navigate(path);
                        }}
                      />

                      {/* Action Chips for Bot Responses */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3.5 flex flex-wrap gap-2 pt-2.5 border-t border-white/10">
                          {msg.actions.map((act, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleActionClick(act.action)}
                              className="group inline-flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:shadow-[0_0_16px_rgba(59,130,246,0.45)] active:scale-95"
                            >
                              <span>{act.label}</span>
                              <ChevronRight size={13} className="text-blue-300 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="mt-1 px-1 text-[10px] text-slate-500 font-medium">
                      {msg.time}
                    </span>
                  </motion.div>
                ))}

                {/* Starter Prompt Cards (Hidden on mobile to save vertical space; shown on desktop sm:) */}
                {messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mt-2 hidden sm:grid grid-cols-2 gap-2 pt-1"
                  >
                    {STARTER_PROMPTS.map((prompt, i) => {
                    const Icon = prompt.icon;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(prompt.query)}
                        className="group flex flex-col items-start justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-gradient-to-br hover:from-blue-900/20 hover:to-indigo-900/20 hover:shadow-[0_4px_16px_rgba(37,99,235,0.2)]"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-500/20 transition group-hover:scale-110 group-hover:bg-blue-500/20">
                          <Icon size={16} />
                        </div>
                        <div className="mt-2.5 min-w-0">
                          <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                            {prompt.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                            {prompt.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {isTyping && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Quick Starter Pills Carousel */}
            {messages.length <= 2 && (
              <div className="relative z-10 border-t border-white/5 bg-slate-950/40 px-3 py-2">
                <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1">
                  <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap flex items-center gap-1 mr-1">
                    <Sparkles size={12} className="text-cyan-400" /> Quick:
                  </span>
                  {INITIAL_QUICK_CHIPS.map((chip, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(chip.query)}
                      className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-white"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <div className="relative z-10 border-t border-white/10 bg-slate-950/95 p-3 backdrop-blur-xl pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] p-1.5 pl-4 shadow-inner focus-within:border-blue-400/70 focus-within:bg-white/[0.08] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about services, pricing, projects..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] active:scale-95"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
