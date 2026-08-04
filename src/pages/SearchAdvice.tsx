import { useState } from "react";
import type {
  MessageResponse,
  SearchAdviceResponse,
  SearchAdviceSlip,
} from "../types/advice";
import { FaSearch } from "react-icons/fa";

function SearchAdvice() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<SearchAdviceSlip[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [hasSearched, setHasSearched] = useState(false);

  const searchAdvice = async () => {
    if (!query.trim()) {
      setError("Please enter a keyword.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch(
        `https://api.adviceslip.com/advice/search/${query}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch advice.");
      }

      const data: SearchAdviceResponse | MessageResponse =
        await response.json();

      if ("slips" in data) {
        setResults(data.slips);
        // setHasSearched(true);
      } else {
        setError(data.message.text);
      }

      setHasSearched(true);
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setQuery("");
    setResults([]);
    setError("");
    setHasSearched(false);
  };
  return (
    <main className="pt-8 bg-[#202632] flex items-center justify-center px-6 md:px-0">
      <div
        className="w-full max-w-[540px] bg-[#313A49] rounded-2xl
      px-8 pt-10 pb-16 text-center shadow-xl relative"
      >
        <h1 className="text-[#53FFAA] text-center md:text-2xl font-bold mb-6 capitalize">
          Search Advice By Keyword
        </h1>

        {!hasSearched && (
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchAdvice();
              }
            }}
            type="text"
            placeholder="Enter a keyword (e.g. life)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setError("");
            }}
            className="w-full p-3 rounded-lg bg-[#202632] text-white outline-none mb-6"
          />
        )}

        {!hasSearched && (
          <p className="text-sm text-[#CEE3E9] mt-4">
            Click the search Icon below to find matching advice.
          </p>
        )}

        {/* {!hasSearched && (
          <button
            className="w-full bg-[#53FFAA] text-black py-3 rounded-lg font-bold hover:bg-green-400 transition"
            onClick={searchAdvice}
          >
            🔍 Search Advice
          </button>
        )} */}

{!hasSearched && (
  <button
    onClick={searchAdvice}
    disabled={loading}
    className={`rounded-full w-14 h-14 absolute bottom-[-1.7rem]
    left-1/2 -translate-x-1/2 flex items-center justify-center
    transition-all duration-300 ${
      loading
        ? "bg-green-400 cursor-not-allowed"
        : "bg-[#53FFAA] hover:shadow-[0_0_30px_#53FFAA] cursor-pointer"
    }`}
  >
    <FaSearch
      className={`text-black text-xl ${
        loading ? "animate-spin" : ""
      }`}
    />
  </button>
)}




{/* 
        <button
          onClick={() => {
            if (hasSearched) {
              resetSearch();
              return;
            }

            searchAdvice();
          }}
          disabled={loading}
          className={`rounded-full w-14 h-14 absolute bottom-[-1.7rem]
  left-1/2 -translate-x-1/2 flex items-center justify-center
  transition-all duration-300 ${
    loading
      ? "bg-green-400 cursor-not-allowed"
      : "bg-[#53FFAA] hover:shadow-[0_0_30px_#53FFAA] cursor-pointer"
  }`}
        >
          <FaSearch
            className={`text-black text-xl ${loading ? "animate-spin" : ""}`}
          />
        </button> */}

        {loading && (
          <p className="text-[#CEE3E9] mt-6 animate-pulse">
            Searching advice...
          </p>
        )}

        {error && <p className="text-red-400 mt-4">{error}</p>}

        {results.length > 0 && (
          <div className="mt-8 space-y-5">
            <p className="text-[#53FFAA] font-bold">
              Found {results.length} result{results.length !== 1 && "s"}
            </p>

            {results.map((result) => (
              <div
                key={result.id}
                className="bg-[#202632] rounded-xl p-5 text-left"
              >
                <p className="text-[#53FFAA] font-bold">Advice #{result.id}</p>

                <p className="text-[#CEE3E9] mt-3 leading-relaxed">
                  "{result.advice}"
                </p>
              </div>
            ))}
          </div>
        )}

        {(results.length > 0 || error) && (
          <button
            onClick={resetSearch}
            className="mt-8 w-full border border-[#53FFAA]
          text-[#53FFAA] py-3 rounded-lg
          hover:bg-[#53FFAA]
          hover:text-black
          transition"
          >
            Search Again
          </button>
        )}
      </div>
    </main>
  );
}

export default SearchAdvice;
