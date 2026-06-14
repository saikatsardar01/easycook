'use client'
import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface ChecklistProps {
  items: string[];
}

export default function Checklist({ items }: ChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showCelebration, setShowCelebration] = useState(false);

  const toggle = (item: string) => {
    setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const isComplete = items.length > 0 && items.every(i => checked[i]);

  useEffect(() => {
    if (isComplete) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <button 
          key={idx}
          onClick={() => toggle(item)}
          className={clsx(
            "w-full text-left flex items-start gap-4 p-4 rounded-xl transition-all border",
            checked[item] 
              ? "bg-stone-50 border-stone-100 opacity-60" 
              : "bg-white border-stone-200 hover:border-emerald-300 hover:shadow-md"
          )}
        >
          <div className={clsx(
            "mt-1 min-w-[24px] h-6 rounded-full border-2 flex items-center justify-center transition-colors",
            checked[item] ? "border-emerald-500 bg-emerald-500" : "border-stone-300 bg-white"
          )}>
            {checked[item] && <span className="text-white text-xs font-bold">✓</span>}
          </div>
          <span className={clsx("font-medium text-lg leading-snug", checked[item] ? "line-through text-stone-400" : "text-stone-700")}>
            {item}
          </span>
        </button>
      ))}

      {showCelebration && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-emerald-800 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 border-4 border-emerald-600">
            <span className="text-2xl">🎉</span>
            <span className="font-bold text-lg">You are ready to cook!</span>
          </div>
        </div>
      )}
    </div>
  );
}