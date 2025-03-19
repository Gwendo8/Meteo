import { useState, useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { FaKey, FaCity } from "react-icons/fa";

interface SearchFormProps {
  onSearch: (token: string, city: string, navigate: NavigateFunction) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [token, setToken] = useState(localStorage.getItem("apiToken") || "");
  const [city, setCity] = useState("");
  const [rememberToken, setRememberToken] = useState(
    !!localStorage.getItem("apiToken")
  );
  const navigate = useNavigate();

  useEffect(() => {
    console.log("SearchForm rendered with token:", token, "and city:", city);
  }, [token, city]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit called with token:", token, "and city:", city);
    if (rememberToken) {
      localStorage.setItem("apiToken", token);
    } else {
      localStorage.removeItem("apiToken");
    }
    onSearch(token, city, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Weather Search
        </h1>
        <div className="mb-4 w-full">
          <label className="block text-xl font-semibold mb-2">API Key</label>
          <div className="relative">
            <FaKey className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your API key..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4 w-full">
          <label className="block text-xl font-semibold mb-2">City Name</label>
          <div className="relative">
            <FaCity className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4 w-full flex items-center">
          <input
            type="checkbox"
            checked={rememberToken}
            onChange={(e) => setRememberToken(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm">Remember API Key</label>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
          Search
        </button>
      </form>
    </div>
  );
};
