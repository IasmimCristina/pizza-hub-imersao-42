import { useLoginForm } from "../hooks/useLoginForm";

type Props = {
  onClose: () => void;
};

export const LoginModal = ({ onClose }: Props) => {
  // Utilização do custom Hook que separa a lógica da UI.
  const { name, setName, password, setPassword, error, handleSubmit } =
    useLoginForm(onClose);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5 min-w-[320px] max-w-xs w-full border border-gray-100"
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-4xl font-bold transition bg-transparent border-none cursor-pointer p-2"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-1 tracking-tight">
          Login
        </h2>
        <div className="flex flex-col gap-3">
          <input
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
          <input
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <span className="text-red-500 text-sm text-center">{error}</span>
        )}
        <button
          type="submit"
          className="mt-2  bg-red-700 text-white py-2 font-semibold shadow hover:bg-red-400 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};
