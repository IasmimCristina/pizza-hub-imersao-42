import { ListCard } from "./ListCard";
import type { Recipe } from "../../domain/entities/Recipe";
import { useUser } from "../context/UserContext";

type Props = {
  onView: (recipe: Recipe) => void;
};

export const RecipeLists = ({ onView }: Props) => {
  // Uso de Hooks no topo.
  const { user, removeFromFavorites, removeFromHated } = useUser();

  return (
    <div className="flex flex-col gap-8 my-8">
      <div>
        <h3 className="text-xl font-bold text-green-700 mb-2">Favoritas</h3>
        <div className="flex gap-3 flex-wrap">
          {user!.favorites.length === 0 && (
            <span className="text-gray-400 text-sm">
              Nenhuma favorita ainda.
            </span>
          )}
          {user!.favorites.map((recipe) => (
            <ListCard
              key={recipe.title}
              recipe={recipe}
              onRemove={() => removeFromFavorites(recipe.title)}
              color="green"
              onView={() => onView(recipe)}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-red-700 mb-2">Detestadas</h3>
        <div className="flex gap-3 flex-wrap">
          {user!.hated.length === 0 && (
            <span className="text-gray-400 text-sm">
              Nenhuma detestada ainda.
            </span>
          )}
          {user!.hated.map((recipe) => (
            <ListCard
              key={recipe.title}
              recipe={recipe}
              onRemove={() => removeFromHated(recipe.title)}
              color="red"
              onView={() => onView(recipe)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
