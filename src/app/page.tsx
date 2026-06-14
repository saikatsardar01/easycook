'use client'
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getRecipes, getRecipeCount } from '@/app/actions'; 
import FilterAccordion from '@/components/FilterAccordion';
import RecipeCard from '@/components/RecipeCard';
import { Recipe, FilterState, DIET_OPTIONS, SERVING_OPTIONS } from '@/types';

const FILTERS = {
  servings: SERVING_OPTIONS,
  cuisine: ['Indian', 'Mexican', 'Bengali', 'Gujarati', 'Continental', 'Chinese'],
  course: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
  diet: DIET_OPTIONS
};

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. INITIALIZE FILTERS
  const [selected, setSelected] = useState<FilterState>({
    servings: searchParams.getAll('servings'),
    cuisine: searchParams.getAll('cuisine'),
    course: searchParams.getAll('course'),
    diet: searchParams.getAll('diet')
  });

  // 🛑 CHANGE 1: Split State into "Typing" and "Committed"
  const initialSearch = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(initialSearch); // For the Input Box
  const [searchQuery, setSearchQuery] = useState(initialSearch); // For the API Call

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  // --- HELPER: SYNC STATE TO URL ---
  const updateURL = (newFilters: FilterState, newSearch: string) => {
    const params = new URLSearchParams();
    
    if (newSearch) params.set('q', newSearch);

    Object.entries(newFilters).forEach(([key, values]) => {
      values.forEach(value => params.append(key, value));
    });

    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  // --- FETCH DATA ---
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setPage(1);
      
      // 🛑 CHANGE 2: Fetch depends on 'searchQuery' (Committed), not 'inputValue'
      const dataPromise = getRecipes(selected, 1, searchQuery);
      const countPromise = getRecipeCount(selected, searchQuery);

      const [data, count] = await Promise.all([dataPromise, countPromise]);
      
      setRecipes(data);
      setTotalCount(count); 
      setHasMore(data.length === 12);
      setLoading(false);
    }

    // No debounce needed anymore because we only run this on explicit submit
    fetchData();
  
  // 🛑 CHANGE 3: Dependency array uses 'searchQuery', NOT 'inputValue'
  }, [selected, searchQuery]); 

  // --- HANDLERS ---
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    // Use searchQuery here too
    const newRecipes = await getRecipes(selected, nextPage, searchQuery); 
    if (newRecipes.length < 12) setHasMore(false);
    setRecipes(prev => [...prev, ...newRecipes]);
    setPage(nextPage);
    setLoading(false);
  };

  const handleFilterChange = (category: keyof FilterState, values: string[]) => {
    const newFilters = { ...selected, [category]: values };
    setSelected(newFilters);
    updateURL(newFilters, searchQuery);
  };

  // 🛑 CHANGE 4: Input Handler only updates local state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 🛑 CHANGE 5: New Submit Handler (Triggers the DB Call)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Stop page reload
    setSearchQuery(inputValue); // Commit the state
    updateURL(selected, inputValue); // Update URL
  };

  const clearAll = () => {
    const empty = { servings:[], cuisine:[], course:[], diet:[] };
    setInputValue('');  // Clear Input
    setSearchQuery(''); // Clear API State
    setSelected(empty);
    router.replace('/', { scroll: false });
  };

  const isFiltering = searchQuery || Object.values(selected).some(arr => arr.length > 0);

  return (
    <main className="min-h-screen bg-paper p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR */}
        <div className="lg:col-span-3">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200">
              <div className="flex flex-col">
                <h2 className="font-display font-bold text-xl text-stone-800 flex items-center gap-2">
                  <span>⚡</span> Filters
                </h2>
                {isFiltering && (
                  <button 
                    onClick={clearAll}
                    className="text-xs font-bold text-rose-500 hover:text-rose-700 hover:underline text-left mt-1 flex items-center gap-1"
                  >
                    <span>🗑️</span> Reset All
                  </button>
                )}
              </div>
              
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md flex items-center gap-1">
                <span className="notranslate">{totalCount}</span>
                <span>Dishes</span>
              </span>
            </div>

            <FilterAccordion title="Diet Preference" icon="🥗" options={FILTERS.diet} selected={selected.diet} onChange={(v) => handleFilterChange('diet', v)} />
            <FilterAccordion title="Cuisine Type" icon="🥘" options={FILTERS.cuisine} selected={selected.cuisine} onChange={(v) => handleFilterChange('cuisine', v)} />
            <FilterAccordion title="Meal Course" icon="🕰️" options={FILTERS.course} selected={selected.course} onChange={(v) => handleFilterChange('course', v)} />
            <FilterAccordion title="Servings" icon="🍽️" options={FILTERS.servings} selected={selected.servings} onChange={(v) => handleFilterChange('servings', v)} />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-9">
          
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <a href="/fridge" className="flex items-center justify-center gap-2 px-6 py-4 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-2xl border border-sky-100 transition-all shadow-sm hover:shadow-md shrink-0">
              <span className="text-2xl">🧊</span>
              <span className="md:hidden lg:inline">My Fridge</span>
            </a>

            {/* 🛑 CHANGE 6: Wrapped in <form> to handle Enter key */}
            <form onSubmit={handleSearchSubmit} className="relative group flex-1 flex gap-2">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="Search for 'Paneer', 'Chicken', or ingredients..."
                  value={inputValue} // Binds to typing state
                  onChange={handleInputChange} // Only updates typing state
                  className="w-full p-5 pl-14 rounded-2xl bg-white border border-stone-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-bold text-lg text-stone-700 placeholder:text-stone-300"
                />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                  🔍
                </span>
                
                {inputValue && (
                  <button 
                    type="button" // Important: type="button" so it doesn't submit form
                    onClick={() => { setInputValue(''); setSearchQuery(''); updateURL(selected, ''); }}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* 🛑 CHANGE 7: Explicit Search Button */}
              <button 
                type="submit"
                className="bg-emerald-600 text-white font-bold px-8 rounded-2xl hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Search
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recipes.map(r => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
          
          {loading && recipes.length === 0 && (
            <div className="text-center py-20">
              <div className="text-4xl animate-bounce mb-2">🥕</div>
              <p className="text-stone-400 font-bold">Searching the kitchen...</p>
            </div>
          )}

          {!loading && recipes.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
              <div className="text-6xl mb-4 grayscale opacity-50">🍽️</div>
              <h3 className="font-display font-bold text-xl text-stone-700">No recipes found</h3>
              <p className="text-stone-500 mt-2">Try adjusting your search or filters.</p>
              <button onClick={clearAll} className="mt-4 text-emerald-600 font-bold hover:underline">Clear All Filters</button>
            </div>
          )}

          {!loading && recipes.length > 0 && hasMore && (
            <div className="flex justify-center pb-20">
              <button 
                onClick={handleLoadMore}
                disabled={loading}
                className="group relative px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
              >
                <span className="flex items-center gap-2">
                  {loading ? 'Loading...' : 'Load More Recipes'}
                  <span className="group-hover:translate-y-1 transition-transform">👇</span>
                </span>
              </button>
            </div>
          )}

          {!hasMore && recipes.length > 0 && (
            <div className="text-center pb-20 text-stone-400 font-bold text-sm uppercase tracking-widest">
              You've reached the end of the list
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold text-stone-400">Loading Kitchen...</div>}>
      <HomeContent />
    </Suspense>
  );
}