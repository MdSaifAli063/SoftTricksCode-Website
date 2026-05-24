import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../../data/faq';
import SectionBadge from '../ui/SectionBadge';
import clsx from 'clsx';

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-stc-cyan"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-sm font-semibold text-stc-black pr-4 sm:text-base">{item.question}</span>
        <ChevronDown
          className={clsx('shrink-0 text-stc-primary transition-transform', isOpen && 'rotate-180')}
          size={20}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-stc-muted">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-padding section-light">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <SectionBadge className="mb-4">FAQ</SectionBadge>
          <h2 className="font-serif text-3xl font-bold text-stc-black sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="fly-card-light rounded-3xl px-4 sm:px-6">
          {faqItems.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
