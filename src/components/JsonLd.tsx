import { Recipe } from '@/types';

export default function JsonLd({ recipe }: { recipe: Recipe }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    // image: [recipe.image], // If you eventually get images
    author: {
      '@type': 'Organization',
      name: 'EasyCook'
    },
    datePublished: new Date().toISOString(),
    description: `A delicious ${recipe.cuisine} ${recipe.diet} dish.`,
    prepTime: `PT${recipe.prep_time}M`, // Format: PT15M (15 mins)
    cookTime: `PT${recipe.cook_time}M`,
    totalTime: `PT${recipe.total_time}M`,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.course,
    recipeCuisine: recipe.cuisine,
    recipeIngredient: recipe.ingredients.split(',').map(i => i.trim()),
    recipeInstructions: recipe.instructions.split('.').map(step => ({
      '@type': 'HowToStep',
      text: step.trim()
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}