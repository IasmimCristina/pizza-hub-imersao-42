import ImersaoLogo from "/Imersao42.svg";
import { useAuth } from "../context/AuthContext";

type Props = {
  onLoginClick: () => void;
};

export const Header = ({ onLoginClick }: Props) => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black shadow-lg shadow-black/40 flex items-center justify-between px-8 py-4 h-14 md:h-24">
      <div className="flex items-center gap-4">
        <h1 className="text-sm md:text-4xl font-extrabold text-white tracking-tight">
          Pizza Hub 🍕
        </h1>
        <span className="block w-1 h-10 bg-gradient-to-b from-red-500 to-gray-800 rounded-full ml-1 md:ml-2" />
      </div>
      <div className="flex items-center gap-6">
        <img
          src={ImersaoLogo}
          alt="Imersão42"
          className="h-4 md:h-10 max-h-14 w-auto drop-shadow-lg"
        />
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-white font-semibold hidden sm:inline text-xs md:text-base">
              Olá, {user.name}
            </span>
          )}
          {!user ? (
            <button
              className="bg-white text-black rounded px-4 py-1 font-semibold hover:bg-gray-200 transition"
              onClick={onLoginClick}
            >
              Login
            </button>
          ) : (
            <button
              className="bg-red-600 text-white rounded px-4 py-1 font-semibold hover:bg-red-500 transition"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
