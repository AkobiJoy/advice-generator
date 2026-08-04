import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AdviceById from "./pages/AdviceById";
import SearchAdvice from "./pages/SearchAdvice";

function App() {
  const location = useLocation();

  const pageContent = {
    "/": {
      title: "Generate Random Advice",
      subtitle: "Get a fresh piece of advice with a single click on the dice.",
    },
    "/advice-id": {
      title: "Find Advice by ID",
      subtitle: "Enter an advice ID to retrieve a specific piece of advice.",
    },
    "/search": {
      title: "Search Advice",
      subtitle: "Search for advice using keywords like life, love or success.",
    },
  };

  const currentPage =
    pageContent[location.pathname as keyof typeof pageContent];

  return (
    <div className="min-h-screen bg-[#202733] text-white">
      <div className="text-center pt-10 px-6">
        <h1 className="text-4xl font-extrabold text-[#53FFAA]">
          Advice Generator
        </h1>

        <p className="text-[#CEE3E9] mt-3 max-w-xl mx-auto leading-relaxed">
          Generate
          <span className="px-1 font-bold capitalize italic text-[#53FFAA]">
            Random advice,
          </span>
          retrieve a specific advice using its
          <span className="px-1 font-bold capitalize italic text-[#53FFAA]">
            {" "}
            ID,
          </span>
          or
          <span className="px-1 font-bold capitalize italic text-[#53FFAA]">
            search,
          </span>
          advice using keywords all powered by the Advice Slip REST API.
        </p>
      </div>

      <nav className="flex justify-center pt-8 pb-10">
        <div className="flex bg-[#313A49] rounded-full p-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-5 py-2 rounded-full text-sm font-semibold transition ${
                isActive
                  ? "bg-[#53FFAA] text-black"
                  : "text-[#CEE3E9] hover:bg-[#404B60]"
              }`
            }
          >
            🎲 Random
          </NavLink>

          <NavLink
            to="/advice-id"
            className={({ isActive }) =>
              `px-5 py-2 rounded-full text-sm font-semibold transition ${
                isActive
                  ? "bg-[#53FFAA] text-black"
                  : "text-[#CEE3E9] hover:bg-[#404B60]"
              }`
            }
          >
            🆔 By ID
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `px-5 py-2 rounded-full text-sm font-semibold transition ${
                isActive
                  ? "bg-[#53FFAA] text-black"
                  : "text-[#CEE3E9] hover:bg-[#404B60]"
              }`
            }
          >
            🔍 Search
          </NavLink>
        </div>
      </nav>

      <div className="text-center  px-6">
        <h2 className="text-xl font-semibold text-white mt-1">
          {currentPage.title}
        </h2>

        <p className="text-[#CEE3E9] mt-2">{currentPage.subtitle}</p>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advice-id" element={<AdviceById />} />
        <Route path="/search" element={<SearchAdvice />} />
      </Routes>
    </div>
  );
}

export default App;
