import { render, screen } from "@testing-library/react";
import type { Recipe } from "../../../domain/entities/Recipe";
import { RecipeGrid } from "../RecipeGrid";
import { UserProvider } from "../../context/UserContext"; // Importa o provider

const mockRecipes: Recipe[] = [
  {
    title: "Pizza Margherita",
    duration: "30 min",
    image: "margherita.jpg",
    instructions: "Prepare a massa, adicione molho e queijo.",
  },
  {
    title: "Pizza Calabresa",
    duration: "35 min",
    image: "calabresa.jpg",
    instructions: "Prepare a massa, adicione calabresa e queijo.",
  },
];

describe("RecipeGrid", () => {
  it("displays all received pizzas", () => {
    render(
      <UserProvider>
        <RecipeGrid recipes={mockRecipes} onView={() => {}} />
      </UserProvider>
    );
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.getByText("Pizza Calabresa")).toBeInTheDocument();
  });
});
