import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4 text-center font-sans">
      <div className="text-9xl mb-4 animate-bounce">🥛</div>
      <h1 className="font-display font-black text-4xl md:text-6xl text-stone-800 mb-4">
        Oops! Spilled the milk.
      </h1>
      <p className="text-xl text-stone-500 max-w-md mb-8 leading-relaxed">
        We looked everywhere in the kitchen, but we couldn't find the page you were looking for.
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/" 
          className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg transition-transform hover:scale-105"
        >
          Return Home 🏠
        </Link>
        <Link 
          href="/fridge" 
          className="px-8 py-4 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 font-bold rounded-full shadow-sm transition-transform hover:scale-105"
        >
          Check Fridge 🧊
        </Link>
      </div>
    </div>
  );
}