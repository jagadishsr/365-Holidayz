import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  title = 'Frequently Asked Questions',
  className = ''
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <div className={`space-y-5 ${className}`}>
      {title && (
        <h3 className="font-display text-2xl font-bold text-[#111827]">{title}</h3>
      )}

      <div className="divide-y divide-[#E5E2DC] border border-[#E5E2DC] rounded-2xl bg-white overflow-hidden">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold text-[#111827] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base">{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6B7280] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#D94E28]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-sm text-[#4B5563] leading-relaxed bg-[#FAF9F6]/60">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
