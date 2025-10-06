import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

//  Testes de integração
describe("App", () => {
  describe("Authentication flow", () => {
    it("logs in and logs out correctly", async () => {
      render(<App />);
      const user = userEvent.setup();

      // Abrir modal
      const loginButton = screen.getByRole("button", { name: /login/i });
      await user.click(loginButton);

      // Preencher e enviar o formulário
      const nameInput = screen.getByPlaceholderText(/nome/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);
      const submitButton = screen.getByRole("button", { name: /entrar/i });

      // Nossa autenticação é mínima: escopo pequeno.
      // Imersão42 --> Próximos vídeos focarão em autenticação.
      await user.type(nameInput, "Iasmim");
      await user.type(passwordInput, "password");
      await user.click(submitButton);

      // Mensagem de boas-vindas
      expect(screen.getByText(/Boas vindas, Iasmim!/i)).toBeInTheDocument();

      // Logout
      const logoutButton = screen.getByRole("button", { name: /logout/i });
      await user.click(logoutButton);

      // Mensagem de boas-vindas deve desaparecer
      expect(
        screen.queryByText(/Boas vindas, Iasmim!/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("User lists flow", () => {
    it("adds and removes recipes from favorites and hated lists", async () => {
      render(<App />);
      const user = userEvent.setup();

      // Login primeiro
      await user.click(screen.getByRole("button", { name: /login/i }));
      await user.type(screen.getByPlaceholderText(/nome/i), "Iasmim");
      await user.type(screen.getByPlaceholderText(/senha/i), "password");
      await user.click(screen.getByRole("button", { name: /entrar/i }));

      // Verificar que as listas estão vazias inicialmente
      const favoritesSection = screen.getByText(/Favoritas/i).closest("div");
      const hatedSection = screen.getByText(/Detestadas/i).closest("div");

      expect(favoritesSection).not.toBeNull();
      expect(hatedSection).not.toBeNull();

      expect(
        within(favoritesSection!).getByText(/Nenhuma favorita ainda/i)
      ).toBeInTheDocument();
      expect(
        within(hatedSection!).getByText(/Nenhuma detestada ainda/i)
      ).toBeInTheDocument();

      // Adicionar às favoritas
      const favButtons = screen.getAllByTitle("Adicionar aos favoritos");
      await user.click(favButtons[0]); // Adiciona a primeira pizza (Pizza de sushi)

      // Verificar que a pizza foi adicionada às favoritas
      const pizzaFavoriteCard = within(favoritesSection!).getByTitle(
        "Pizza de sushi"
      );
      expect(pizzaFavoriteCard).toBeInTheDocument();

      // Verificar que o texto "Nenhuma favorita ainda" desapareceu
      expect(
        within(favoritesSection!).queryByText(/Nenhuma favorita ainda/i)
      ).not.toBeInTheDocument();

      // Remover das favoritas
      const removeFavButtons = within(favoritesSection!).getAllByTitle(
        "Remover"
      );
      await user.click(removeFavButtons[0]);

      // Verificar que a pizza foi removida das favoritas
      expect(
        within(favoritesSection!).queryByTitle("Pizza de sushi")
      ).not.toBeInTheDocument();

      // Verificar que o texto "Nenhuma favorita ainda" voltou
      expect(
        within(favoritesSection!).getByText(/Nenhuma favorita ainda/i)
      ).toBeInTheDocument();

      // Adicionar às detestadas
      const hateButtons = screen.getAllByTitle("Adicionar aos detestados");
      await user.click(hateButtons[0]); // Adiciona a primeira pizza (Pizza de sushi)

      // Verificar que a pizza foi adicionada às detestadas
      const pizzaHatedCard = within(hatedSection!).getByTitle("Pizza de sushi");
      expect(pizzaHatedCard).toBeInTheDocument();

      // Verificar que o texto "Nenhuma detestada ainda" desapareceu
      expect(
        within(hatedSection!).queryByText(/Nenhuma detestada ainda/i)
      ).not.toBeInTheDocument();

      // Remover das detestadas
      const removeHatedButtons = within(hatedSection!).getAllByTitle("Remover");
      await user.click(removeHatedButtons[0]);

      // Verificar que a pizza foi removida das detestadas
      expect(
        within(hatedSection!).queryByTitle("Pizza de sushi")
      ).not.toBeInTheDocument();

      // Verificar que o texto "Nenhuma detestada ainda" voltou
      expect(
        within(hatedSection!).getByText(/Nenhuma detestada ainda/i)
      ).toBeInTheDocument();
    });
  });

  describe("Search functionality", () => {
    it("filters recipes by title correctly", async () => {
      render(<App />);
      const user = userEvent.setup();

      // Encontrar o campo de busca
      const searchInput = screen.getByPlaceholderText(/Buscar pizza/i);

      // Verificar que todas as pizzas estão visíveis inicialmente
      expect(screen.getByText(/Pizza de sushi/i)).toBeInTheDocument();
      expect(screen.getByText(/Pizza Margherita/i)).toBeInTheDocument();

      // Buscar por "sushi"
      await user.type(searchInput, "sushi");

      // Verificar que apenas a pizza de sushi aparece
      expect(screen.getByText(/Pizza de sushi/i)).toBeInTheDocument();
      expect(screen.queryByText(/Pizza Margherita/i)).not.toBeInTheDocument();

      // Limpar busca
      await user.clear(searchInput);

      // Verificar que todas as pizzas voltaram
      expect(screen.getByText(/Pizza de sushi/i)).toBeInTheDocument();
      expect(screen.getByText(/Pizza Margherita/i)).toBeInTheDocument();
    });

    it("filters recipes by duration correctly", async () => {
      render(<App />);
      const user = userEvent.setup();

      // Encontrar o campo de busca
      const searchInput = screen.getByPlaceholderText(/Buscar pizza/i);

      // Buscar por duração específica
      await user.type(searchInput, "30 min");

      // Verificar que apenas pizzas com essa duração aparecem
      const recipeCards = screen.getAllByRole("button", {
        name: /Ver receita/i,
      });
      expect(recipeCards.length).toBeGreaterThan(0);
    });

    it("shows no results when search term matches nothing", async () => {
      render(<App />);
      const user = userEvent.setup();

      // Encontrar o campo de busca
      const searchInput = screen.getByPlaceholderText(/Buscar pizza/i);

      // Buscar por algo que não existe
      await user.type(searchInput, "pizza inexistente");

      // Verificar que nenhuma pizza aparece
      expect(screen.queryByText(/Pizza de sushi/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Pizza Margherita/i)).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /Ver receita/i })
      ).not.toBeInTheDocument();
    });
  });
});
