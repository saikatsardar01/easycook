'use client'
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // NEW IMPORTS
// import Navbar from '../components/Navbar';
import RecipeCard from '@/components/RecipeCard';
import { searchByIngredients, getFridgeCount } from '@/app/actions';
import { Recipe } from '@/types';

function FridgeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState('');
  
  // Initialize ingredients from URL if they exist
  const [ingredients, setIngredients] = useState<string[]>([]);
  
  // Results State
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // --- 1. RESTORE STATE FROM URL ON LOAD ---
  useEffect(() => {
    const ingParam = searchParams.get('ing');
    
    if (ingParam) {
      const list = ingParam.split(',');
      setIngredients(list);
      
      // Auto-trigger search if URL has data
      // We define this inside to run immediately on mount
      const restoreSearch = async () => {
        setLoading(true);
        setHasSearched(true);
        setPage(1);

        const [count, data] = await Promise.all([
          getFridgeCount(list),
          searchByIngredients(list, 1)
        ]);

        setTotalCount(count);
        setRecipes(data);
        setHasMore(data.length === 12);
        setLoading(false);
      };

      restoreSearch();
    }
  }, []); // Run once on mount

  // --- 2. URL SYNC FUNCTION ---
  const updateURL = (list: string[]) => {
    const params = new URLSearchParams();
    if (list.length > 0) {
      params.set('ing', list.join(','));
      router.replace(`/fridge?${params.toString()}`, { scroll: false });
    } else {
      router.replace('/fridge', { scroll: false });
    }
  };

  // Add ingredient tag
  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    const val = inputValue.trim();
    if (val && !ingredients.includes(val)) {
      const newList = [...ingredients, val];
      setIngredients(newList);
      setInputValue('');
      // Note: We DON'T update URL here yet, we wait for "Find Recipes" click
      // to avoid refreshing results while user is still typing.
    }
  };

  // Remove ingredient tag
  const handleRemove = (ing: string) => {
    const newList = ingredients.filter(i => i !== ing);
    setIngredients(newList);
    // If we have already searched, update the URL + Results immediately on remove
    if (hasSearched) {
       updateURL(newList);
       if (newList.length > 0) {
         // Trigger re-search logic manually or rely on user to click Find again?
         // Better UX: User clicks "Find" again to confirm the new set.
       }
    }
  };

  // Perform Search & Update URL
  const handleSearch = async () => {
    if (ingredients.length === 0) return;
    
    // Push state to URL so "Back" button works later
    updateURL(ingredients);

    setLoading(true);
    setHasSearched(true);
    setPage(1);
    setRecipes([]); 
    
    const [count, data] = await Promise.all([
      getFridgeCount(ingredients),
      searchByIngredients(ingredients, 1)
    ]);
    
    setTotalCount(count);
    setRecipes(data);
    setHasMore(data.length === 12);
    setLoading(false);
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    
    const newRecipes = await searchByIngredients(ingredients, nextPage);
    
    if (newRecipes.length < 12) {
      setHasMore(false);
    }

    setRecipes(prev => [...prev, ...newRecipes]);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-paper pb-20 font-sans">
        
      {/* HERO HEADER */}
      <div className="bg-sky-900 text-white py-12 px-6 rounded-b-[2.5rem] shadow-soft mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[8rem] md:text-[10rem] opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">🧊</div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h1 className="font-display font-black text-3xl md:text-5xl mb-3">What's in your Fridge?</h1>
            <p className="text-sky-100 text-base md:text-lg">
              Tell us what you have, and we'll find the recipe.
            </p>
          </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* SEARCH INTERFACE */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-soft border border-stone-200 -mt-20 relative z-20">
          
          <label className="font-bold text-stone-700 ml-1 mb-3 block text-sm md:text-base">
            Add Ingredients (e.g. Potato, Paneer)
          </label>
          
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Type an ingredient..."
              className="w-full p-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 font-bold text-stone-700 placeholder:font-normal placeholder:text-stone-400"
            />
            <button 
              onClick={() => handleAdd()}
              className="w-full md:w-auto px-8 py-4 bg-stone-800 hover:bg-black text-white rounded-xl font-bold transition-colors shadow-md"
            >
              Add +
            </button>
          </div>

          {/* TAGS AREA */}
          <div className="flex flex-wrap gap-2 mb-8 min-h-[40px]">
            {ingredients.length === 0 && (
              <span className="text-stone-400 italic text-sm">No ingredients added yet...</span>
            )}
            {ingredients.map(ing => (
              <span key={ing} className="bg-sky-100 text-sky-800 px-4 py-2 rounded-full font-bold flex items-center gap-2 animate-in fade-in zoom-in shadow-sm border border-sky-200">
                {ing}
                <button 
                  onClick={() => handleRemove(ing)} 
                  className="hover:text-sky-950 text-lg w-5 h-5 flex items-center justify-center rounded-full hover:bg-sky-200 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* ACTION BUTTON */}
          <button 
            onClick={handleSearch}
            disabled={ingredients.length === 0 || loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold text-lg md:text-xl rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]"
          >
            {loading && page === 1 ? 'Searching...' : 'Find Recipes 🍳'}
          </button>
        </div>

        {/* RESULTS GRID */}
        <div className="mt-12">
            {loading && page === 1 ? (
              <div className="text-center py-20 opacity-50">
                  <div className="text-6xl animate-bounce mb-4">🧊</div>
                  <p className="font-bold text-stone-500">Rummaging through the fridge...</p>
              </div>
            ) : hasSearched && recipes.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-[2rem] border border-dashed border-stone-300 mx-auto max-w-lg">
                  <div className="text-6xl mb-4 grayscale opacity-30">🤷‍♂️</div>
                  <h3 className="font-bold text-xl text-stone-700">No matching recipes</h3>
                  <p className="text-stone-500 mt-2 px-4">Try removing some ingredients to broaden your search.</p>
              </div>
            ) : (
              <>
                  {hasSearched && (
                    <div className="flex items-center justify-between mb-6 px-2">
                      <h2 className="font-display font-bold text-xl md:text-2xl text-stone-800 flex items-center gap-2">
                          <span>🎉</span> Results
                      </h2>
                      <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-lg font-bold text-sm">
                          {totalCount} Dishes Found
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {recipes.map(r => (
                      <RecipeCard key={r.id} recipe={r} />
                    ))}
                  </div>

                  {/* LOAD MORE BUTTON */}
                  {hasSearched && hasMore && (
                    <div className="flex justify-center pb-12">
                      <button 
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="px-8 py-3 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-full font-bold shadow-sm transition-all hover:scale-105 disabled:opacity-50"
                      >
                        {loading ? 'Loading...' : 'Load More Recipes 👇'}
                      </button>
                    </div>
                  )}
                  
                  {hasSearched && !hasMore && recipes.length > 0 && (
                    <div className="text-center text-stone-400 font-bold text-sm uppercase tracking-widest pb-12">
                      End of list
                    </div>
                  )}
              </>
            )}
        </div>

      </div>
    </main>
  );
}

// WRAPPER FUNCTION (Required for useSearchParams)
export default function FridgePage() {
  return (
    <>
      {/* <Navbar /> */}
      <Suspense fallback={<div className="p-20 text-center font-bold text-stone-400">Loading Fridge...</div>}>
        <FridgeContent />
      </Suspense>
    </>
  );
}