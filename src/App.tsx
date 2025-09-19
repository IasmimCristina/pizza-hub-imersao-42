import { useState } from "react";
import recipesData from "./infraestructure/data/recipes.json";
import type { Recipe } from "./domain/entities/Recipe";
import { Header } from "./view/components/Header";
import { RecipeGrid } from "./view/components/RecipeGrid";
import { Hero } from "./view/components/Hero";
import { RecipeDetail } from "./view/components/RecipeDetail";

export const App = () => {
  // Uso de Hooks no topo.
  // Estado dinâmico que controla a aparição dos componentes:
  const [selected, setSelected] = useState<Recipe | null>(null); // Uso de null para representar nenhum valor.
  const recipes = recipesData as Recipe[];

  return (
    <>
      <Header />
      <main className="pt-14 md:pt-24">
        <Hero />
        <div className="px-4 md:px-8">
          {!selected ? (
            <section>
              <RecipeGrid recipes={recipes} onView={setSelected} />
            </section>
          ) : (
            <RecipeDetail recipe={selected} onBack={() => setSelected(null)} />
          )}
        </div>
      </main>
    </>
  );
};

export default App;
