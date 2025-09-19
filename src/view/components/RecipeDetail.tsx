import type { Recipe } from "../../domain/entities/Recipe";

type Props = {
  recipe: Recipe;
  onBack: () => void;
};

export const RecipeDetail = ({ recipe, onBack }: Props) => (
  <section className="flex flex-col items-center mt-8">
    <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full flex flex-col items-center">

      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-36 h-36 object-cover rounded-xl shadow-lg border-4 border-white"
        />
      </div>
      <div className="h-16" />
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">{recipe.title}</h2>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-white shadow" />
        <span className="text-sm text-gray-500 font-medium tracking-wide uppercase">Duração: {recipe.duration}</span>
      </div>
      <div className="w-12 h-1 rounded-full bg-gradient-to-r from-red-950 via-red-700 to-white mb-4" />
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-800" />
          Instruções
        </h3>
        <p className="text-gray-700 leading-relaxed text-base bg-gray-50 rounded-lg p-4 shadow-inner border border-gray-100">
          {recipe.instructions}
        </p>
      </div>
      <button
        className="mt-8 bg-red-600 text-white px-6 py-2 hover:bg-red-500 transition font-semibold shadow"
        onClick={onBack}
      >
        Voltar
      </button>
    </div>
  </section>
);
