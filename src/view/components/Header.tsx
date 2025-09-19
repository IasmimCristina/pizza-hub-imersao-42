import ImersaoLogo from "/Imersao42.svg";

export const Header = () => (
  <header className="w-full absolute top-0 left-0 z-50 bg-black shadow-lg shadow-black/40 flex items-center justify-between px-8 py-4 h-14 md:h-24">
    <div className="flex items-center gap-4">
      <h1 className="text-xl md:text-4xl font-extrabold text-white tracking-tight">
        Pizza Hub 🍕
      </h1>
      <span className="block w-1 h-10 bg-gradient-to-b from-red-500 to-gray-800 rounded-full ml-2" />
    </div>
    <img
      src={ImersaoLogo}
      alt="Imersão42"
      className="h-8 md:h-14 max-h-14 w-auto drop-shadow-lg"
    />
  </header>
);
