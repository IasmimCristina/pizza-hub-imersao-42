import { useAuth } from "../context/AuthContext";

export const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative w-full h-20 md:h-40  flex items-center justify-center overflow-hidden bg-[url('/background.jpeg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60 " />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-xl md:text-3xl">
          {user && `Boas vindas, ${user.name}! `}
        </h1>
        <h2 className="text-xl md:text-3xl font-bold text-white text-center drop-shadow mb-2 px-2 md:px-4">
          Seu app que reúne receitas de diversos sabores de pizza!
        </h2>
      </div>
    </section>
  );
};
