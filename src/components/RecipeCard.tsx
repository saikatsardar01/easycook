// ADDED from Geminin on 10-12-2025 09:06

import Link from 'next/link';
import clsx from 'clsx';
import { Recipe } from '@/types';

interface BadgeStyle {
  icon: string;
  label?: string;
  color: string;
}

function getDietBadge(diet: string): BadgeStyle {
  const d = (diet || '').toLowerCase();
  
  if (d.includes('non')) {
    return { icon: '🍖', label: 'Non-Veg', color: 'bg-rose-100 text-rose-800 border-rose-200' };
  }
  if (d.includes('egg')) {
    return { icon: '🍳', label: 'Eggetarian', color: 'bg-amber-100 text-amber-800 border-amber-200' };
  }
  if (d.includes('vegan') || d.includes('sattvic') || d.includes('vegetarian')) {
    return { icon: '🍃', label: 'Veg', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
  }
  return { icon: '🛡️', label: 'Health', color: 'bg-sky-100 text-sky-800 border-sky-200' };
}

function getMainIcon(course: string): string {
  const c = (course || '').toLowerCase();
  if (c.includes('break')) return '🥯';
  if (c.includes('lunch')) return '🍛';
  if (c.includes('dinner')) return '🥘';
  if (c.includes('snack')) return '🍪';
  return '🍽️';
}

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const badge = getDietBadge(recipe.diet);
  const mainIcon = getMainIcon(recipe.course);

  // Check on load if this recipe is saved

  return (
    <Link href={`/recipe/${recipe.id}`} className="group block h-full">
      <div className="relative h-full flex flex-col bg-white rounded-[2rem] border border-stone-200 p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        
        <div className="flex justify-between items-start mb-4">
          <div className="notranslate text-5xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">
            {mainIcon}
          </div>
          <div className={clsx("flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm", badge.color)}>
            <span className="notranslate text-lg filter drop-shadow-sm">{badge.icon}</span>
            <span>{recipe.diet}</span>
          </div>
        </div>

        <div className="mt-auto">
          <h3 className="font-display font-bold text-xl text-stone-800 leading-tight mb-3 group-hover:text-emerald-700 transition-colors">
            {recipe.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500 font-bold">
            <span className="bg-stone-50 px-3 py-1 rounded-lg">
              ⏱️ {recipe.total_time} Min
            </span>
            <span className="bg-stone-50 px-3 py-1 rounded-lg">
              👥 {recipe.servings} ppl
            </span>
            <span className="bg-stone-50 px-3 py-1 rounded-lg text-xs uppercase tracking-wider">
               {recipe.cuisine}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}