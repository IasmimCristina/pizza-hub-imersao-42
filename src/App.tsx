import { useState } from "react";
import recipesData from "./infraestructure/data/recipes.json";
import type { Recipe } from "./domain/entities/Recipe";
import { Header } from "./view/components/Header";
import { RecipeGrid } from "./view/components/RecipeGrid";
import { Hero } from "./view/components/Hero";
import { RecipeDetail } from "./view/components/RecipeDetail";
import { LoginModal } from "./view/components/LoginModal";
import { AuthProvider, useAuth } from "./view/context/AuthContext";
import { RecipeLists } from "./view/components/RecipeLists";
import { UserListsProvider } from "./view/context/UserListsContext";

export const MainApp = () => {
  // Uso de Hooks no topo.
  // Estado dinâmico que controla a aparição dos componentes:
  const [selected, setSelected] = useState<Recipe | null>(null); // Uso de null para representar nenhum valor.
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuth();

  const recipes = recipesData as Recipe[];

  return (
    // O Provider envolve o app e serve o contexto a vários componentes.

    <UserListsProvider>
      <Header onLoginClick={() => setShowLogin(true)} />

      <main className="pt-14 md:pt-24">
        <Hero />
        <div className="px-4 md:px-8">
          {user && <RecipeLists onView={setSelected} />}

          {!selected ? (
            <section>
              <RecipeGrid recipes={recipes} onView={setSelected} />
            </section>
          ) : (
            <RecipeDetail recipe={selected} onBack={() => setSelected(null)} />
          )}
        </div>
      </main>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </UserListsProvider>
  );
};

export const App = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
