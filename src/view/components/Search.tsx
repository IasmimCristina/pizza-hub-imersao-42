type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Search = ({ 
  value, 
  onChange, 
  placeholder = "Buscar pizza..." 
}: SearchProps) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="z-50 mt-2 mb-auto px-4 py-2 rounded-lg rounded-b-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition w-64"
    aria-label="Buscar receitas"
  />
);
