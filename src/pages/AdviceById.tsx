import { useState } from "react";
import type { AdviceByIdResponse } from "../types/advice";
import { FaDice } from "react-icons/fa";

function AdviceById() {
  const [id, setId] = useState("");
  const [advice, setAdvice] = useState<AdviceByIdResponse["slip"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);

  const getAdviceById = async () => {
    if (!id) {
      setError("Please eneter an advice id.");
      return;
    }

    // setHasSearched(true);

    setLoading(true);
    setAdvice(null);
    setError("");
    //   setHasSearched(false);
    

    try {
      const response = await fetch(`https://api.adviceslip.com/advice/${id}`);

      if (!response.ok) {
        throw new Error("failed to fetch advice");
      }

      const data: AdviceByIdResponse = await response.json();

      if ("slip" in data) {
        setAdvice(data.slip);
      } else {
        setError("Advice ID is not valid.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-[#202632] flex items-center 
    justify-center px-6 md:px-0"
    >
      <div
        className="w-full max-w-[540px] bg-[#313A49] rounded-2xl 
    px-8 pt-10 pb-16 text-center shadow-xl relative"
      >
        <h1
          className="text-[#53FFAA] text-center text-xl md:text-2xl 
        font-bold mb-6"
        >
          Find Advice By Id
        </h1>

        <p className="text-[#53FFAA] tracking-[4px] uppercase font-bold text-[13px] mb-6">
          {loading ? (
            <span className="animate-pulse">Advice #...</span>
          ) : (
            advice && `Advice #${advice.id}`
          )}
        </p>


        {/* <p className="text-[#53FFAA] tracking-[4px] uppercase font-bold text-[13px] mb-6">
  {!hasSearched && id ? (
    `Advice #${id}`
  ) : loading ? (
    <span className="animate-pulse">Advice #...</span>
  ) : advice ? (
    `Advice #${advice.id}`
  ) : (
    <span className="animate-pulse">Advice #...</span>
  )}
</p> */}


        {advice && (
  <button
    onClick={() => {
      setAdvice(null);
      setId("");
      setError("");
    }}
    className="mt-6 bg-[#53FFAA] text-black px-6 py-2 rounded-lg font-semibold hover:bg-green-400 transition"
  >
    Get Another Advice
  </button>
)}

        <h1 className="text-[28px] font-extrabold leading-relaxed text-[#CEE3E9] min-h-[120px] flex items-center justify-center">
          {loading ? (
            <span className="animate-pulse">Loading advice...</span>
          ) : (
            advice?.advice
          )}
        </h1>



{!advice && (
        <input
          type="number"
          min="1"
          placeholder="Enter Advice Id"
          value={id}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getAdviceById();
            }
          }}
          onChange={(e) => {
            setId(e.target.value);
            setError("");
          }}
          className="w-full p-3 rounded-lg text-white outline-none"
        />
        )}

        <button
          onClick={() => {
    if (advice) {
      setAdvice(null);
      setId("");
      setError("");
      return;
    }

    getAdviceById();
  }}

          disabled={loading}
          className={`rounded-full w-12 h-12 absolute bottom-[-1.5rem]
  left-1/2 -translate-x-1/2 flex items-center justify-center
  transition-all duration-300 ${
    loading
      ? "bg-green-400 cursor-not-allowed"
      : "bg-green-500 hover:shadow-[0_0_30px_#53FFAA]"
  }`}
>
  <FaDice
    className={`text-black text-2xl ${
      loading ? "animate-spin" : ""
    }`}
  />
          
        </button>

        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      </div>
    </main>
  );
}

export default AdviceById;
