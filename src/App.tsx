import { Header } from "./view/components/Header";

import { Hero } from "./view/components/Hero";

export const App = () => {
  return (
    <>
      <Header />
      <main className="pt-14 md:pt-24">
        <Hero />
        <div className="px-4 md:px-8">
          <section>{/*  Grid de receitas aqui. */}</section>
        </div>
      </main>
    </>
  );
};

export default App;
