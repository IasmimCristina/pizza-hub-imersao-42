
# APIs nativas do React – Bom uso

- **Foco:** criar custom Hooks que usam as melhores práticas relacionadas aos Hooks nativos do React para features como login, logout, adição, remoção, atualização da visualização das receitas, etc. Além de também explicar sobre os benefícios da Context API.

## Aplicativo Hands on: Pizza Hub - Imersão42

<img width="1009" height="257" alt="image" src="https://github.com/user-attachments/assets/ab21cf30-287b-405e-8aa8-ca75c2725bd0" />


**Descrição:**  
Um simples aplicativo que reúne receitas de diversos sabores de pizza. O usuário pode escolher se gosta ou não dessas receitas e adicioná-las ou removê-las de duas listas diferentes: favoritas e detestadas. Além disso, há sincronização entre tabs em relação às listas de diversos usuários estarem no local storage.

- **Possível futura melhoria:** adicionalmente, o usuário também poderia conseguir cadastrar novas receitas.

----


- Task 1: **listagem de receitas.**
- Task 2: **login e logout.**
- Task 3: **adição e remoção relacionadas às listas.**
- Task 4: **search\filtragem e sincronização entre abas.**


## Guia das branches:

- ``presentation/part-one``: **versão inicial do aplicativo sem utilização de Hooks ou contexto.**
- ``presentation/part-two`` e ``feature/pizza-recipes-list``: **versão com a task 1 implementada apenas, sem a task 2.**
- ``feature/pizza-recipes-user-lists``: **versão já com a adição e remoção de receitas por um usuário.**
- ``feature/pizza-recipes-storage-search``: **versão com a filtragem e uso de useEffect. Ou seja, versão final, sem testes.**
- ``tests/recipe-grid-app``: **testes implementados na versão final do app.**


**Foco da prática:**  
Criar custom Hooks que usam as melhores práticas relacionadas aos Hooks nativos do React para features como login, logout, adição, remoção, atualização da visualização das receitas, etc. Além de também explicar sobre os benefícios da Context API.

![pizzahubapp](https://github.com/user-attachments/assets/0b1abbc5-d951-4fa4-b62b-579ac0fc065b)



---

## Tecnologias

- Projeto usa: **React** & **TypeScript**
- Estilização: **Tailwind CSS**

---

## Como rodar o projeto

1. Dependências:
   ```bash
   pnpm install
   # ou
   npm install
   ```

2. Inicie o app:
   ```bash
   pnpm dev
   # ou
   npm run dev
   ```

3. Acesse em: [http://localhost:5173](http://localhost:5173)
