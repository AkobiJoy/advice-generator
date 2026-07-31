import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AdviceById from "./pages/AdviceById";
import SearchAdvice from "./pages/SearchAdvice";

function App() {
  return (
    <div className="min-h-screen bg-[#202733] text-white">
      <nav className="flex justify-center gap-6 py-6">
        <Link
          to="/"
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Random Advice
        </Link>

        <Link
          to="/advice-id"
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Advice by ID
        </Link>

        <Link
          to="/search"
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Search Advice
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advice-id" element={<AdviceById />} />
        <Route path="/search" element={<SearchAdvice />} />
      </Routes>
    </div>
  );
}

export default App;