import type { Recipe } from "../../domain/entities/Recipe";

type Props = {
  recipe: Recipe;
  onRemove: () => void;
  color: "green" | "red";
  onView: () => void;
};

export const ListCard = ({ recipe, onRemove, color, onView }: Props) => (
  <div
    className={`relative rounded-xl shadow-md overflow-hidden cursor-pointer group w-28 h-28 flex items-center justify-center bg-white border-2 border-${color}-400`}
    onClick={onView}
    title={recipe.title}
  >
    <img
      src={recipe.image}
      alt={recipe.title}
      className="object-cover w-full h-full group-hover:brightness-90 transition"
    />
    <button
      className={`absolute top-1 right-1 bg-${color}-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-${color}-700 transition`}
      onClick={e => {
        e.stopPropagation();
        onRemove();
      }}
      aria-label="Remover"
      title="Remover"
    >
      ×
    </button>
  </div>
);
