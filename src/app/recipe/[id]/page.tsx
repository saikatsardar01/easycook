// 'use client';

// import React, { useEffect, useState, useRef } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { Recipe } from '@/types';
// import { getRecipeById, getRecipes } from '@/app/actions';
// import RecipeCard from '@/components/RecipeCard';
// import clsx from 'clsx';

// interface UIIngredient {
//   item: string;
//   amount: string;
// }

// interface UIRecipe extends Omit<Recipe, 'ingredients'> {
//   ingredients: UIIngredient[];
// }

// export default function RecipeDetail() {
//   const router = useRouter();
//   const params = useParams();
//   const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

//   const [recipe, setRecipe] = useState<UIRecipe | undefined>(undefined);
//   const [related, setRelated] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
//   const [showCelebration, setShowCelebration] = useState(false);
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);

//   // VOICE STATE
//   const [speakingStep, setSpeakingStep] = useState<number | null>(null);
//   const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
//   const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

//   // 1. LOAD VOICES (Crucial Fix for Bengali/Hindi)
//   // Browsers load voices asynchronously. We must wait for them.
//   useEffect(() => {
//     const loadVoices = () => {
//       const voices = window.speechSynthesis.getVoices();
//       if (voices.length > 0) {
//         setAvailableVoices(voices);
//       }
//     };

//     loadVoices();
//     // Chrome needs this event listener
//     if (window.speechSynthesis.onvoiceschanged !== undefined) {
//       window.speechSynthesis.onvoiceschanged = loadVoices;
//     }
//   }, []);

//   // 2. DATA LOADING
//   useEffect(() => {
//     if (!id) return;

//     const loadData = async () => {
//       setLoading(true);
//       window.scrollTo(0, 0);

//       const rawData = await getRecipeById(id);

//       if (rawData) {
//         const ingredientsArray = rawData.ingredients
//           ? rawData.ingredients.split(',').map(i => ({
//             item: i.trim(),
//             amount: ""
//           }))
//           : [];

//         setRecipe({
//           ...rawData,
//           ingredients: ingredientsArray
//         });

//         // Check Favorite
//         const favorites = JSON.parse(localStorage.getItem('easycook_favorites') || '[]');
//         if (favorites.some((r: Recipe) => r.id === rawData.id)) {
//           setIsFavorite(true);
//         }

//         // FETCH RELATED RECIPES (Fix for "Not Showing")
//         // We use a clean cuisine string to ensure matches
//         const cleanCuisine = rawData.cuisine ? rawData.cuisine.trim() : '';
//         if (cleanCuisine) {
//           try {
//             const relatedData = await getRecipes({ cuisine: [cleanCuisine] });
//             // Filter out current recipe and take top 3
//             const filtered = relatedData.filter(r => r.id !== rawData.id).slice(0, 3);
//             setRelated(filtered);
//           } catch (err) {
//             console.error("Failed to load related recipes", err);
//           }
//         }
//       }

//       setCheckedIngredients(new Set());
//       setShowCelebration(false);
//       setLoading(false);
//     };

//     loadData();

//     // Screen Wake Lock
//     if ('wakeLock' in navigator) {
//       let wakeLock: any = null;
//       const requestWakeLock = async () => {
//         try { wakeLock = await (navigator as any).wakeLock.request('screen'); } catch (err) { }
//       };
//       requestWakeLock();
//       return () => { if (wakeLock) wakeLock.release(); };
//     }
//   }, [id]);

//   // --- SMART VOICE LOGIC ---
//   const speakStep = (index: number) => {
//     if (!window.speechSynthesis) return;

//     window.speechSynthesis.cancel(); // Stop previous

//     if (speakingStep === index) {
//       setSpeakingStep(null);
//       return;
//     }

//     // 1. Detect Language from Google Cookie
//     let currentLang = 'en';
//     const match = document.cookie.match(new RegExp('(^| )googtrans=([^;]+)'));
//     if (match) {
//       // e.g., "/auto/bn" -> "bn"
//       currentLang = match[2].split('/').pop() || 'en';
//     }

//     // 2. Get Translated Text
//     const element = document.getElementById(`step-text-${index}`);
//     // Clean up text (remove excessive spaces/newlines)
//     const textToSpeak = element ? element.innerText.replace(/\s+/g, ' ').trim() : '';

//     if (!textToSpeak) return;

//     const utterance = new SpeechSynthesisUtterance(textToSpeak);
//     utterance.rate = 0.9;
//     utterance.pitch = 1;

//     // 3. Map to Browser Locale
//     const localeMap: Record<string, string> = {
//       'en': 'en-IN',
//       'hi': 'hi-IN',
//       'bn': 'bn-IN',
//       'mr': 'mr-IN',
//       'ta': 'ta-IN',
//       'te': 'te-IN',
//       'gu': 'gu-IN',
//       'kn': 'kn-IN'
//     };

//     const targetLocale = localeMap[currentLang] || 'en-US';
//     utterance.lang = targetLocale;

//     // 4. Find Best Voice (Prioritize "Google" voices as they are high quality)
//     // We use the 'availableVoices' state we loaded earlier
//     if (availableVoices.length > 0) {
//       const exactVoice = availableVoices.find(v => v.lang === targetLocale && v.name.includes('Google'));
//       const fallbackVoice = availableVoices.find(v => v.lang.includes(targetLocale));

//       if (exactVoice) utterance.voice = exactVoice;
//       else if (fallbackVoice) utterance.voice = fallbackVoice;
//     }

//     utterance.onend = () => setSpeakingStep(null);
//     utterance.onerror = () => setSpeakingStep(null);

//     speechRef.current = utterance;
//     window.speechSynthesis.speak(utterance);
//     setSpeakingStep(index);
//   };

//   useEffect(() => {
//     return () => {
//       if (window.speechSynthesis) window.speechSynthesis.cancel();
//     };
//   }, []);

//   const toggleFavorite = () => {
//     if (!recipe) return;
//     const favorites = JSON.parse(localStorage.getItem('easycook_favorites') || '[]');
//     if (isFavorite) {
//       const newFavs = favorites.filter((r: Recipe) => r.id !== recipe.id);
//       localStorage.setItem('easycook_favorites', JSON.stringify(newFavs));
//       setIsFavorite(false);
//     } else {
//       const recipeToSave = { ...recipe, ingredients: recipe.ingredients.map(i => i.item).join(', ') };
//       localStorage.setItem('easycook_favorites', JSON.stringify([...favorites, recipeToSave]));
//       setIsFavorite(true);
//     }
//   };

//   const toggleIngredient = (index: number) => {
//     const next = new Set(checkedIngredients);
//     if (next.has(index)) next.delete(index);
//     else next.add(index);
//     setCheckedIngredients(next);
//   };

//   useEffect(() => {
//     if (recipe && recipe.ingredients.length > 0) {
//       if (checkedIngredients.size === recipe.ingredients.length) setShowCelebration(true);
//     }
//   }, [checkedIngredients, recipe]);

//   const handleCopyLink = () => {
//     const url = window.location.href;
//     navigator.clipboard.writeText(url).then(() => { setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); });
//   };
//   const ingredientsText = recipe ? recipe.ingredients.map(i => `• ${i.amount ? i.amount + ' ' : ''}${i.item}`).join('%0a') : '';
//   const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
//   const shareText = recipe ? `*${recipe.title}* on EasyCook!%0a%0a*Ingredients needed:*%0a${ingredientsText}%0a%0aSee the full recipe here:` : '';

//   if (loading || !recipe) {
//     return (
//       <div className="min-h-[80vh] flex items-center justify-center bg-paper">
//         <div className="text-2xl font-display font-bold text-stone-300 animate-pulse">🥕 Chopping Ingredients...</div>
//       </div>
//     );
//   }

//   const instructionsList = recipe.instructions
//     ? recipe.instructions.split('.').map(step => step.trim()).filter(step => step.length > 3)
//     : [];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 pb-24 relative bg-paper min-h-screen">

//       {/* Celebration Overlay */}
//       {showCelebration && (
//         <div onClick={() => setShowCelebration(false)} className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 backdrop-blur-sm animate-in fade-in cursor-pointer">
//           <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full mx-6 text-center shadow-2xl border-4 border-stone-100 animate-in zoom-in duration-300 relative">
//             <div className="text-8xl mb-6 animate-bounce">🎉</div>
//             <h2 className="text-4xl font-display font-black text-stone-800 mb-4 leading-none">All set!</h2>
//             <p className="text-xl text-stone-500 font-sans font-bold mb-8">You are ready to cook!</p>
//             <div className="text-sm text-stone-300 font-bold uppercase tracking-widest">Tap to close</div>
//           </div>
//         </div>
//       )}

//       {/* Share Modal */}
//       {showShareModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setShowShareModal(false)}>
//           <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-display font-bold text-stone-800">Share Recipe</h3>
//               <button onClick={() => setShowShareModal(false)} className="p-2 bg-stone-100 rounded-full hover:bg-stone-200">✕</button>
//             </div>
//             <div className="grid grid-cols-1 gap-4">
//               <button onClick={handleCopyLink} className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors text-left">
//                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${copySuccess ? 'bg-green-100 text-green-600' : 'bg-stone-200 text-stone-600'}`}>{copySuccess ? '✓' : '🔗'}</div>
//                 <div><span className="block font-bold text-lg text-stone-800">{copySuccess ? 'Copied!' : 'Copy Link'}</span></div>
//               </button>
//               <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 transition-colors text-left">
//                 <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xl">WA</div>
//                 <span className="font-bold text-lg text-stone-800">WhatsApp</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Navigation */}
//       <div className="flex justify-between items-center mb-8">
//         <button onClick={() => router.push('/')} className="text-stone-500 hover:text-stone-900 font-bold flex items-center gap-2 transition-colors bg-white px-5 py-3 rounded-full shadow-sm hover:shadow-md border border-stone-200">← Back</button>
//         <div className="flex gap-3">
//           <button onClick={toggleFavorite} className={clsx("px-5 py-3 rounded-full shadow-sm hover:shadow-md border transition-all flex items-center gap-2 font-bold", isFavorite ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-white text-stone-500 border-stone-200 hover:text-rose-500")}>
//             <span className={clsx("text-xl", isFavorite && "animate-pulse")}>{isFavorite ? '❤️' : '🤍'}</span>
//             <span className="hidden md:inline">{isFavorite ? 'Saved' : 'Save'}</span>
//           </button>
//           <button onClick={() => setShowShareModal(true)} className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-2 transition-colors bg-white px-5 py-3 rounded-full shadow-sm hover:shadow-md border border-stone-200"><span>Share</span> 🔗</button>
//         </div>
//       </div>

//       {/* Header */}
//       <header className="text-center mb-12">
//         <div className="inline-flex flex-wrap justify-center gap-2 mb-6">
//           <span className="px-4 py-2 bg-white border border-stone-200 rounded-full text-xs font-extrabold uppercase tracking-widest text-stone-500">{recipe.cuisine}</span>
//           <span className="px-4 py-2 bg-white border border-stone-200 rounded-full text-xs font-extrabold uppercase tracking-widest text-stone-500">{recipe.course}</span>
//           <span className="px-4 py-2 bg-white border border-stone-200 rounded-full text-xs font-extrabold uppercase tracking-widest text-stone-500">{recipe.diet}</span>
//         </div>
//         <h1 className="text-4xl md:text-6xl font-display font-black text-stone-900 leading-tight mb-8">{recipe.title}</h1>
//         <div className="inline-flex bg-white rounded-[2rem] shadow-soft px-6 py-6 gap-6 md:gap-12 font-sans border border-stone-200 mx-4">
//           <div className="text-center"><span className="block text-xs font-bold uppercase text-stone-400 mb-1">Prep</span><span className="text-2xl font-bold text-stone-800">{recipe.prep_time}m</span></div>
//           <div className="w-px bg-stone-100"></div>
//           <div className="text-center"><span className="block text-xs font-bold uppercase text-stone-400 mb-1">Cook</span><span className="text-2xl font-bold text-stone-800">{recipe.cook_time}m</span></div>
//           <div className="w-px bg-stone-100"></div>
//           <div className="text-center"><span className="block text-xs font-bold uppercase text-stone-400 mb-1">Serves</span><span className="text-2xl font-bold text-stone-800">{recipe.servings}</span></div>
//         </div>
//       </header>

//       <div className="grid md:grid-cols-12 gap-8">

//         <aside className="md:col-span-5">
//           <div className="sticky top-8 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-soft border border-stone-200">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-display font-bold text-stone-800">Ingredients</h2>
//               <span className="text-sm font-bold text-stone-400 bg-stone-100 px-3 py-1 rounded-full">{checkedIngredients.size}/{recipe.ingredients.length}</span>
//             </div>
//             <ul className="space-y-3">
//               {recipe.ingredients.map((ing, idx) => {
//                 const isChecked = checkedIngredients.has(idx);
//                 return (
//                   <li key={idx}>
//                     <button onClick={() => toggleIngredient(idx)} className={`text-left w-full group flex items-start gap-4 p-3 rounded-2xl transition-all border ${isChecked ? 'bg-stone-50 border-stone-100 opacity-60' : 'bg-white border-stone-100 hover:border-emerald-200 hover:shadow-sm'}`}>
//                       <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isChecked ? 'bg-emerald-500 border-emerald-500 scale-110' : 'border-stone-300 bg-white group-hover:border-emerald-400'}`}>{isChecked && <span className="text-white text-xs">✓</span>}</div>
//                       <div className={`flex-1 transition-colors ${isChecked ? 'text-stone-400 line-through' : 'text-stone-800'}`}>{ing.amount && <span className="font-bold block text-lg">{ing.amount}</span>}<span className="font-medium text-lg">{ing.item}</span></div>
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </aside>

//         {/* INSTRUCTIONS */}
//         <div className="md:col-span-7">
//           <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-stone-200">
//             <h2 className="text-2xl font-display font-bold mb-8 pl-4 border-l-4 border-emerald-400 text-stone-800">Method</h2>

//             {instructionsList.length > 0 ? (
//               <div className="space-y-8">
//                 {instructionsList.map((step, idx) => {
//                   const isActive = speakingStep === idx;
//                   return (
//                     <div
//                       key={idx}
//                       className={clsx(
//                         "relative pl-6 group transition-all duration-500 p-4 rounded-2xl",
//                         isActive ? "bg-amber-50 shadow-sm border border-amber-100 scale-105" : ""
//                       )}
//                     >
//                       <span className={clsx(
//                         "absolute -left-3 top-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors border-2",
//                         isActive ? "bg-amber-500 text-white border-amber-500" : "bg-white text-stone-400 border-stone-100"
//                       )}>
//                         {idx + 1}
//                       </span>

//                       <div className="flex gap-4 items-start">
//                         <p
//                           id={`step-text-${idx}`}
//                           className={clsx("text-xl leading-loose font-sans font-medium flex-1", isActive ? "text-stone-900" : "text-stone-600")}
//                         >
//                           {step}.
//                         </p>

//                         <button
//                           onClick={() => speakStep(idx)}
//                           className={clsx(
//                             "w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center transition-all",
//                             isActive ? "bg-amber-200 text-amber-800 animate-pulse" : "bg-stone-100 text-stone-400 hover:bg-emerald-100 hover:text-emerald-600"
//                           )}
//                           title="Read this step"
//                         >
//                           {isActive ? '🔊' : '🔈'}
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <p className="whitespace-pre-line text-lg text-stone-600 leading-loose">{recipe.instructions}</p>
//             )}

//             <div className="mt-16 p-8 bg-orange-50 rounded-3xl text-center border border-orange-100">
//               <p className="font-display text-2xl font-bold text-orange-800/60">"Good food ends with good talk."</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RELATED RECIPES SECTION (FIXED VISIBILITY) */}
//       {related.length > 0 && (
//         <section className="mt-24 pt-12 border-t border-stone-200">
//           <h2 className="text-3xl font-display font-bold mb-10 text-center text-stone-800">You might also like</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {related.map(r => <RecipeCard key={r.id} recipe={r} />)}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }






'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Recipe } from '@/types';
// 👇 UPDATED IMPORT: We use getRecommendedRecipes now
import { getRecipeById, getRecommendedRecipes } from '@/app/actions';
import RecipeCard from '@/components/RecipeCard';
import clsx from 'clsx';

interface UIIngredient {
  item: string;
  amount: string;
}

interface UIRecipe extends Omit<Recipe, 'ingredients'> {
  ingredients: UIIngredient[];
}

export default function RecipeDetail() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [recipe, setRecipe] = useState<UIRecipe | undefined>(undefined);
  const [related, setRelated] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // VOICE STATE
  const [speakingStep, setSpeakingStep] = useState<number | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 1. LOAD VOICES
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // 2. DATA LOADING (OPTIMIZED)
  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      setLoading(true);
      window.scrollTo(0, 0);

      const numericId = parseInt(id);

      // A. Fetch Main Recipe (1 DB Read)
      const rawData = await getRecipeById(numericId);

      // B. Fetch Recommendations (3 DB Reads - Fixed Strategy)
      // We explicitly ask for the next 3 recipes instead of scanning cuisines
      const recommendedData = await getRecommendedRecipes(numericId);

      if (rawData) {
        const ingredientsArray = rawData.ingredients
          ? rawData.ingredients.split(',').map(i => ({
              item: i.trim(),
              amount: ""
            }))
          : [];

        setRecipe({
          ...rawData,
          ingredients: ingredientsArray
        });

        // Set the related recipes directly from the optimized action
        setRelated(recommendedData);

        // Check Favorite
        const favorites = JSON.parse(localStorage.getItem('easycook_favorites') || '[]');
        if (favorites.some((r: Recipe) => r.id === rawData.id)) {
          setIsFavorite(true);
        }
      }

      setCheckedIngredients(new Set());
      setShowCelebration(false);
      setLoading(false);
    };

    loadData();

    // Screen Wake Lock
    if ('wakeLock' in navigator) {
      let wakeLock: any = null;
      const requestWakeLock = async () => {
        try { wakeLock = await (navigator as any).wakeLock.request('screen'); } catch (err) { }
      };
      requestWakeLock();
      return () => { if (wakeLock) wakeLock.release(); };
    }
  }, [id]);

  // --- SMART VOICE LOGIC ---
  const speakStep = (index: number) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    if (speakingStep === index) {
      setSpeakingStep(null);
      return;
    }

    // 1. Detect Language from Google Cookie
    let currentLang = 'en';
    const match = document.cookie.match(new RegExp('(^| )googtrans=([^;]+)'));
    if (match) {
      currentLang = match[2].split('/').pop() || 'en';
    }

    // 2. Get Translated Text
    const element = document.getElementById(`step-text-${index}`);
    const textToSpeak = element ? element.innerText.replace(/\s+/g, ' ').trim() : '';

    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // 3. Map to Browser Locale
    const localeMap: Record<string, string> = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'bn': 'bn-IN',
      'mr': 'mr-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'gu': 'gu-IN',
      'kn': 'kn-IN'
    };

    const targetLocale = localeMap[currentLang] || 'en-US';
    utterance.lang = targetLocale;

    // 4. Find Best Voice
    if (availableVoices.length > 0) {
      const exactVoice = availableVoices.find(v => v.lang === targetLocale && v.name.includes('Google'));
      const fallbackVoice = availableVoices.find(v => v.lang.includes(targetLocale));

      if (exactVoice) utterance.voice = exactVoice;
      else if (fallbackVoice) utterance.voice = fallbackVoice;
    }

    utterance.onend = () => setSpeakingStep(null);
    utterance.onerror = () => setSpeakingStep(null);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeakingStep(index);
  };

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const toggleFavorite = () => {
    if (!recipe) return;
    const favorites = JSON.parse(localStorage.getItem('easycook_favorites') || '[]');
    if (isFavorite) {
      const newFavs = favorites.filter((r: Recipe) => r.id !== recipe.id);
      localStorage.setItem('easycook_favorites', JSON.stringify(newFavs));
      setIsFavorite(false);
    } else {
      const recipeToSave = { ...recipe, ingredients: recipe.ingredients.map(i => i.item).join(', ') };
      localStorage.setItem('easycook_favorites', JSON.stringify([...favorites, recipeToSave]));
      setIsFavorite(true);
    }
  };

  const toggleIngredient = (index: number) => {
    const next = new Set(checkedIngredients);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setCheckedIngredients(next);
  };

  useEffect(() => {
    if (recipe && recipe.ingredients.length > 0) {
      if (checkedIngredients.size === recipe.ingredients.length) setShowCelebration(true);
    }
  }, [checkedIngredients, recipe]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => { setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); });
  };
  const ingredientsText = recipe ? recipe.ingredients.map(i => `• ${i.amount ? i.amount + ' ' : ''}${i.item}`).join('%0a') : '';
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = recipe ? `*${recipe.title}* on EasyCook!%0a%0a*Ingredients needed:*%0a${ingredientsText}%0a%0aSee the full recipe here:` : '';

  if (loading || !recipe) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-paper">
        <div className="text-2xl font-display font-bold text-stone-300 animate-pulse">🥕 Chopping Ingredients...</div>
      </div>
    );
  }

  const instructionsList = recipe.instructions
    ? recipe.instructions.split('.').map(step => step.trim()).filter(step => step.length > 3)
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24 relative bg-paper min-h-screen">

      {/* Celebration Overlay */}
      {showCelebration && (
        <div onClick={() => setShowCelebration(false)} className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 backdrop-blur-sm animate-in fade-in cursor-pointer">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full mx-6 text-center shadow-2xl border-4 border-stone-100 animate-in zoom-in duration-300 relative">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-4xl font-display font-black text-stone-800 mb-4 leading-none">All set!</h2>
            <p className="text-xl text-stone-500 font-sans font-bold mb-8">You are ready to cook!</p>
            <div className="text-sm text-stone-300 font-bold uppercase tracking-widest">Tap to close</div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-display font-bold text-stone-800">Share Recipe</h3>
              <button onClick={() => setShowShareModal(false)} className="p-2 bg-stone-100 rounded-full hover:bg-stone-200">✕</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={handleCopyLink} className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors text-left">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${copySuccess ? 'bg-green-100 text-green-600' : 'bg-stone-200 text-stone-600'}`}>{copySuccess ? '✓' : '🔗'}</div>
                <div><span className="block font-bold text-lg text-stone-800">{copySuccess ? 'Copied!' : 'Copy Link'}</span></div>
              </button>
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 transition-colors text-left">
                <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xl">WA</div>
                <span className="font-bold text-lg text-stone-800">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => router.push('/')} className="text-stone-500 hover:text-stone-900 font-bold flex items-center gap-2 transition-colors bg-white px-5 py-3 rounded-full shadow-sm hover:shadow-md border border-stone-200">← Back</button>
        <div className="flex gap-3">
          <button onClick={toggleFavorite} className={clsx("px-5 py-3 rounded-full shadow-sm hover:shadow-md border transition-all flex items-center gap-2 font-bold", isFavorite ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-white text-stone-500 border-stone-200 hover:text-rose-500")}>
            <span className={clsx("text-xl", isFavorite && "animate-pulse")}>{isFavorite ? '❤️' : '🤍'}</span>
            <span className="hidden md:inline">{isFavorite ? 'Saved' : 'Save'}</span>
          </button>
          <button onClick={() => setShowShareModal(true)} className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-2 transition-colors bg-white px-5 py-3 rounded-full shadow-sm hover:shadow-md border border-stone-200"><span>Share</span> 🔗</button>
        </div>
      </div>

      {/* Header */}
      <header className="text-center mb-12">
        <div className="inline-flex flex-wrap justify-center gap-2 mb-6">
          <span className="px-4 py-2 bg-white border border-stone-200 rounded-full text-xs font-extrabold uppercase tracking-widest text-stone-500">{recipe.cuisine}</span>
          <span className="px-4 py-2 bg-white border border-stone-200 rounded-full text-xs font-extrabold uppercase tracking-widest text-stone-500">{recipe.course}</span>
          <span className="px-4 py-2 bg-white border border-stone-200 rounded-full text-xs font-extrabold uppercase tracking-widest text-stone-500">{recipe.diet}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black text-stone-900 leading-tight mb-8">{recipe.title}</h1>
        <div className="inline-flex bg-white rounded-[2rem] shadow-soft px-6 py-6 gap-6 md:gap-12 font-sans border border-stone-200 mx-4">
          <div className="text-center"><span className="block text-xs font-bold uppercase text-stone-400 mb-1">Prep</span><span className="text-2xl font-bold text-stone-800">{recipe.prep_time}m</span></div>
          <div className="w-px bg-stone-100"></div>
          <div className="text-center"><span className="block text-xs font-bold uppercase text-stone-400 mb-1">Cook</span><span className="text-2xl font-bold text-stone-800">{recipe.cook_time}m</span></div>
          <div className="w-px bg-stone-100"></div>
          <div className="text-center"><span className="block text-xs font-bold uppercase text-stone-400 mb-1">Serves</span><span className="text-2xl font-bold text-stone-800">{recipe.servings}</span></div>
        </div>
      </header>

      <div className="grid md:grid-cols-12 gap-8">

        <aside className="md:col-span-5">
          <div className="sticky top-8 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-soft border border-stone-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-stone-800">Ingredients</h2>
              <span className="text-sm font-bold text-stone-400 bg-stone-100 px-3 py-1 rounded-full">{checkedIngredients.size}/{recipe.ingredients.length}</span>
            </div>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = checkedIngredients.has(idx);
                return (
                  <li key={idx}>
                    <button onClick={() => toggleIngredient(idx)} className={`text-left w-full group flex items-start gap-4 p-3 rounded-2xl transition-all border ${isChecked ? 'bg-stone-50 border-stone-100 opacity-60' : 'bg-white border-stone-100 hover:border-emerald-200 hover:shadow-sm'}`}>
                      <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isChecked ? 'bg-emerald-500 border-emerald-500 scale-110' : 'border-stone-300 bg-white group-hover:border-emerald-400'}`}>{isChecked && <span className="text-white text-xs">✓</span>}</div>
                      <div className={`flex-1 transition-colors ${isChecked ? 'text-stone-400 line-through' : 'text-stone-800'}`}>{ing.amount && <span className="font-bold block text-lg">{ing.amount}</span>}<span className="font-medium text-lg">{ing.item}</span></div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* INSTRUCTIONS */}
        <div className="md:col-span-7">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-stone-200">
            <h2 className="text-2xl font-display font-bold mb-8 pl-4 border-l-4 border-emerald-400 text-stone-800">Method</h2>

            {instructionsList.length > 0 ? (
              <div className="space-y-8">
                {instructionsList.map((step, idx) => {
                  const isActive = speakingStep === idx;
                  return (
                    <div
                      key={idx}
                      className={clsx(
                        "relative pl-6 group transition-all duration-500 p-4 rounded-2xl",
                        isActive ? "bg-amber-50 shadow-sm border border-amber-100 scale-105" : ""
                      )}
                    >
                      <span className={clsx(
                        "absolute -left-3 top-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors border-2",
                        isActive ? "bg-amber-500 text-white border-amber-500" : "bg-white text-stone-400 border-stone-100"
                      )}>
                        {idx + 1}
                      </span>

                      <div className="flex gap-4 items-start">
                        <p
                          id={`step-text-${idx}`}
                          className={clsx("text-xl leading-loose font-sans font-medium flex-1", isActive ? "text-stone-900" : "text-stone-600")}
                        >
                          {step}.
                        </p>

                        <button
                          onClick={() => speakStep(idx)}
                          className={clsx(
                            "w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center transition-all",
                            isActive ? "bg-amber-200 text-amber-800 animate-pulse" : "bg-stone-100 text-stone-400 hover:bg-emerald-100 hover:text-emerald-600"
                          )}
                          title="Read this step"
                        >
                          {isActive ? '🔊' : '🔈'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="whitespace-pre-line text-lg text-stone-600 leading-loose">{recipe.instructions}</p>
            )}

            <div className="mt-16 p-8 bg-orange-50 rounded-3xl text-center border border-orange-100">
              <p className="font-display text-2xl font-bold text-orange-800/60">"Good food ends with good talk."</p>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED RECIPES SECTION (OPTIMIZED) */}
      {related.length > 0 && (
        <section className="mt-24 pt-12 border-t border-stone-200">
          <h2 className="text-3xl font-display font-bold mb-10 text-center text-stone-800">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map(r => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}