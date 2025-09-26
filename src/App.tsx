import { useState, useMemo } from "react";
import recipesData from "./infraestructure/data/recipes.json";
import type { Recipe } from "./domain/entities/Recipe";
import { Header } from "./view/components/Header";
import { RecipeGrid } from "./view/components/RecipeGrid";
import { Hero } from "./view/components/Hero";
import { RecipeDetail } from "./view/components/RecipeDetail";
import { LoginModal } from "./view/components/LoginModal";
import { AuthProvider, useUser } from "./view/context/UserContext";
import { RecipeLists } from "./view/components/RecipeLists";

export const MainApp = () => {
  // Uso de Hooks no topo.
  // Estado dinâmico que controla a aparição dos componentes:
  const [selected, setSelected] = useState<Recipe | null>(null); // Uso de null para representar nenhum valor.
  const [search, setSearch] = useState(""); // Novo estado de busca!
  const [showLogin, setShowLogin] = useState(false);

  const { user } = useUser();

  const recipes = recipesData as Recipe[];

  // Memoização da busca para otimizar performance
  const filteredRecipes = useMemo(() => {
    if (!search.trim()) return recipes;

    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase().trim()) ||
        recipe.instructions.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [recipes, search]);

  const handleCloseDetail = () => setSelected(null);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  return (
    // O Provider envolve o app e serve o contexto a vários componentes.
    <>
      <Header onLoginClick={handleShowLogin} />
      <main className="pt-14 md:pt-24">
        <Hero search={search} setSearch={setSearch} />
        <div className="px-4 md:px-8">
          {user && <RecipeLists onView={setSelected} />}
          {!selected ? (
            <section>
              <RecipeGrid
                recipes={filteredRecipes}
                onView={setSelected}
                search={search}
              />
            </section>
          ) : (
            <RecipeDetail recipe={selected} onBack={handleCloseDetail} />
          )}
        </div>
      </main>
      {showLogin && <LoginModal onClose={handleCloseLogin} />}
    </>
  );
};

export const App = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
