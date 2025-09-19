import type { Recipe } from "../../domain/entities/Recipe";
import { useAuth } from "../context/AuthContext";
import { useRecipeLists } from "../context/RecipeListsContext";

type Props = {
  recipe: Recipe;
  onView: (recipe: Recipe) => void;
};

export const RecipeCard = ({ recipe, onView }: Props) => {
  const { user } = useAuth();
  const { addToFavorites, addToHated } = useRecipeLists(); // Funções específicas providenciadas pelo context + custom Hook.

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col items-center overflow-visible transition-transform duration-200 hover:scale-105 hover:shadow-xl cursor-pointer group w-56 h-48 mx-auto relative"
      onClick={() => onView(recipe)}
    >
      {user && (
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-20">
          <button
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow transition text-xs"
            title="Adicionar aos favoritos"
            onClick={(e) => {
              e.stopPropagation();
              addToFavorites(recipe);
            }}
          >
            👍
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow transition text-xs"
            title="Adicionar aos detestados"
            onClick={(e) => {
              e.stopPropagation();
              addToHated(recipe);
            }}
          >
            👎
          </button>
        </div>
      )}
      <div className="relative -mt-8 z-10 w-[90%]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-32 object-cover rounded-xl shadow-lg border-4 border-white"
        />
      </div>
      <div className="flex flex-col flex-1 w-full px-2 pt-2 pb-5">
        <h2 className="text-base font-bold text-gray-900 mb-1 truncate">
          {recipe.title}
        </h2>
        <hr className="border-t border-gray-200 my-2" />
        <button
          className="mt-auto bg-red-700 text-white px-2 py-1 hover:bg-red-500 transition shadow"
          onClick={(e) => {
            e.stopPropagation();
            onView(recipe);
          }}
        >
          Ver receita
        </button>
      </div>
    </div>
  );
};
