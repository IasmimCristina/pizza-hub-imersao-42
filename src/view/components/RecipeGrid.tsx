import type { Recipe } from "../../domain/entities/Recipe";
import { RecipeCard } from "./RecipeCard";

type Props = {
  recipes: Recipe[];
  onView: (recipe: Recipe) => void;
};

export const RecipeGrid = ({ recipes, onView }: Props) => (
  <div className="pt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12 px-2 md:px-0 max-w-6xl mx-auto">
    {recipes.map((recipe) => (
      <RecipeCard key={recipe.title} recipe={recipe} onView={onView} />
    ))}
  </div>
);
