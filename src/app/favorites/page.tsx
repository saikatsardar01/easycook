'use client'
import { useState, useEffect } from 'react';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types';

export default function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from local storage
    const stored = JSON.parse(localStorage.getItem('easycook_favorites') || '[]');
    setFavorites(stored);
    setLoading(false);
  }, []);

  return (
    <>
      <main className="min-h-screen bg-paper p-4 md:p-8 pb-24">
         <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="font-display font-black text-4xl text-stone-800 mb-2">My Cookbook</h1>
              <p className="text-stone-500">Your personal collection of saved recipes.</p>
            </div>

            {loading ? (
               <div className="text-center py-20">Loading...</div>
            ) : favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map(r => (
                  <RecipeCard key={r.id} recipe={r} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-stone-300">
                <div className="text-6xl mb-4 grayscale opacity-30">📖</div>
                <h3 className="font-bold text-xl text-stone-700">Your cookbook is empty</h3>
                <p className="text-stone-500 mt-2 mb-6">Start browsing and click the ❤️ to save dishes here.</p>
                <a href="/" className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-full">Browse Recipes</a>
              </div>
            )}
         </div>
      </main>
    </>
  );
}