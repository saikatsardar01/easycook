'use client'
import { useState } from 'react';
import clsx from 'clsx';

interface FilterAccordionProps {
  title: string;
  icon: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export default function FilterAccordion({ title, icon, options, selected, onChange }: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (opt: string) => {
    const newSelection = selected.includes(opt)
      ? selected.filter(item => item !== opt)
      : [...selected, opt];
    onChange(newSelection);
  };

  return (
    <div className="mb-4 group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-stone-200 hover:bg-stone-50 hover:shadow-md transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl filter drop-shadow-sm transition-transform group-hover:scale-110">{icon}</span>
          <span className="font-display font-bold text-stone-700 tracking-wide uppercase text-sm">{title}</span>
        </div>
        <span className={`text-stone-400 font-bold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      <div className={clsx(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-4 bg-white/50 border-x border-b border-stone-100 rounded-b-xl flex flex-wrap gap-2">
          {options.map((opt) => {
            const isActive = selected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleOption(opt)}
                className={clsx(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm border",
                  isActive 
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-emerald-200 scale-105" 
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-100"
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}