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
} from 'lucide-react';
import { BackToTopButton } from '../global/FloatingActions';
import { useBooking } from '../../context/BookingContext';
import { processUserQuery } from './chatEngine';
import { BRAND_ASSETS } from '../../constants/brand';
import { SITE } from '../../constants/site';

const INITIAL_QUICK_CHIPS = [
  { label: '🚀 Services', query: 'What services do you offer?' },
  { label: '💰 Pricing & Plans', query: 'What is your pricing?' },
  { label: '💼 Live Portfolio', query: 'Show me your portfolio projects' },
  { label: '👥 Meet Founders', query: 'Who are the founders?' },
  { label: '📅 Book Free Call', query: 'I want to book a call' },
  { label: '💼 Careers & Jobs', query: 'Are you hiring?' },
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
      className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-stc-gray"
    >
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-stc-primary-light" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-stc-primary-light" style={{ animationDelay: '150ms' }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-stc-primary-light" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-xs text-stc-gray/70 ml-1.5">Soft Tricks Code AI is typing...</span>
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
                className="font-medium text-stc-primary-light underline decoration-stc-primary-light/40 underline-offset-2 hover:text-white hover:decoration-white"
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
            {isBullet && <span className="text-stc-primary-light select-none font-bold">•</span>}
            <div className="flex-1">{parts}</div>
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
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'initial_1',
      from: 'bot',
      text: "Hi there! 👋 I'm **Soft Tricks Code AI Assistant**.\n\nI have complete knowledge about our software services, live projects, pricing plans, team, and hiring. How can I help you today?",
      actions: [
        { label: '🚀 Explore Services', action: 'nav_services' },
        { label: '💰 Pricing & Packages', action: 'nav_pricing' },
        { label: '💼 View Portfolio', action: 'nav_portfolio' },
        { label: '📅 Book Free Call', action: 'book_call' },
      ],
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    // Simulate natural AI thinking delay (450ms - 750ms)
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
        text: "Conversation reset! ✨ What would you like to know about **Soft Tricks Code**?",
        actions: [
          { label: '🚀 Explore Services', action: 'nav_services' },
          { label: '💰 Pricing & Packages', action: 'nav_pricing' },
          { label: '💼 View Portfolio', action: 'nav_portfolio' },
          { label: '📅 Book Free Call', action: 'book_call' },
        ],
        time: getCurrentTime(),
      },
    ]);
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
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-50 flex h-[min(90dvh,600px)] w-full flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-gradient-to-b from-[#0a1124] via-[#040814] to-[#02050e] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(37,99,235,0.25)] backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:left-auto sm:h-[580px] sm:w-[410px] sm:rounded-3xl"
            role="dialog"
            aria-label="Soft Tricks Code AI Support"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-stc-primary/20 via-stc-navy/80 to-stc-black/90 px-4 py-3.5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stc-primary/20 border border-stc-primary/40 shadow-inner">
                  <img
                    src={BRAND_ASSETS.logoOnDark100}
                    alt="Soft Tricks Code"
                    className="h-6 w-6 object-contain"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#0a1124] animate-pulse" />
                </div>
                <div>
                  <p className="font-body text-sm font-bold tracking-tight text-white">
                    Soft Tricks Code <span className="text-stc-primary-light">AI</span>
                  </p>
                  <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online • Instant AI Answers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-stc-gray transition hover:bg-white/10 hover:text-white"
                  aria-label="Reset chat"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-stc-gray transition hover:bg-red-500/20 hover:text-red-400"
                  aria-label="Close chat"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 space-y-3.5 overflow-y-auto p-4 hide-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`relative max-w-[90%] rounded-2xl px-4 py-3 shadow-md ${
                      msg.from === 'user'
                        ? 'bg-gradient-to-r from-stc-primary to-stc-primary-light text-white rounded-br-sm shadow-[0_4px_15px_rgba(37,99,235,0.35)]'
                        : 'border border-white/10 bg-[#0e172a]/95 text-stc-gray rounded-bl-sm backdrop-blur-md'
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
                      <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleActionClick(act.action)}
                            className="inline-flex items-center gap-1 rounded-lg border border-stc-primary/40 bg-stc-primary/15 px-2.5 py-1 text-xs font-semibold text-stc-primary-light transition-all hover:bg-stc-primary hover:text-white hover:shadow-[0_0_12px_rgba(59,130,246,0.5)] active:scale-95"
                          >
                            <span>{act.label}</span>
                            <ChevronRight size={12} className="opacity-70" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="mt-1 px-1 text-[10px] text-stc-gray/50">
                    {msg.time}
                  </span>
                </motion.div>
              ))}

              {isTyping && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Quick Starter Pills Carousel */}
            {messages.length <= 2 && (
              <div className="border-t border-white/5 bg-white/[0.02] px-3 py-2">
                <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1">
                  <span className="text-[11px] text-stc-gray/60 font-medium whitespace-nowrap flex items-center gap-1 mr-1">
                    <Sparkles size={12} className="text-stc-primary-light" /> Quick:
                  </span>
                  {INITIAL_QUICK_CHIPS.map((chip, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(chip.query)}
                      className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-stc-gray transition hover:border-stc-primary/50 hover:bg-stc-primary/20 hover:text-white"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <div className="border-t border-white/10 bg-[#070d1e]/90 p-3 backdrop-blur-md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about services, pricing, projects..."
                  className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-stc-gray/40 focus:border-stc-primary focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-stc-primary/30 transition"
                />

                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-stc-primary to-stc-primary-light text-white shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] active:scale-95"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
