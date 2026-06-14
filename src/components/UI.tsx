import React from 'react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyle = "font-sans font-semibold text-lg py-3 px-6 rounded-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-stone-800 text-stone-50 hover:bg-stone-700 shadow-md",
    secondary: "bg-white text-stone-800 border-2 border-stone-200 hover:border-stone-400 shadow-sm",
    outline: "bg-transparent text-stone-600 border border-stone-300 hover:text-stone-900",
    ghost: "bg-transparent text-stone-500 hover:bg-stone-100"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Filter Chip (Multi-select) ---
interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  label: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({ active, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`
        px-5 py-2 rounded-full text-base font-medium transition-all duration-200 border
        ${active 
          ? 'bg-stone-800 text-stone-50 border-stone-800 shadow-md' 
          : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
        }
      `}
    >
      {label}
    </button>
  );
};

// --- Search Input ---
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput: React.FC<SearchInputProps> = ({ className = '', ...props }) => {
  return (
    <div className="relative w-full">
      <input 
        type="search"
        className={`
          w-full bg-white text-stone-900 text-xl p-5 pl-12
          rounded-xl border border-stone-200 shadow-sm
          placeholder:text-stone-400 placeholder:italic
          focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none
          transition-all
          ${className}
        `}
        {...props}
      />
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-6 w-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};
