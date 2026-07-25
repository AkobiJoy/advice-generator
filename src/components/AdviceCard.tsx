import { useEffect, useState } from "react"
import type { AdviceResponse } from "../types/advice"
import { FaDice } from "react-icons/fa";




const AdviceCard = () => {

const [advice , setAdvice] = useState<AdviceResponse["slip"] | null>(null)
const [loading, setLoading] = useState<boolean>(false)




const getAdvice = async () => {
    setLoading(true);
    setAdvice(null); 

    try {
        const response = await fetch("https://api.adviceslip.com/advice");

        if (!response.ok) {
            throw new Error("Failed to fetch advice");
        }

        const data: AdviceResponse = await response.json();
        setAdvice(data.slip);
    } catch (error) {
        console.error("Error fetching advice:", error);
    } finally {
        setLoading(false);

    }
};

useEffect(()=> {
getAdvice();
},
[]);


  return (
    <div 
    className="w-full max-w-[540px] bg-[#313A49] rounded-2xl 
    px-8 pt-10 pb-16 text-center shadow-xl relative">
      {/* <p className="text-[53FFAA] tracking-[4px] uppercase font-bold text-[13px]
      mb-6">Advice #{advice?.id}</p> */}

{/* <p className="text-[#53FFAA] tracking-[4px] uppercase font-bold text-[13px] mb-6">
  {loading ? (
    <span className="animate-pulse">Advice #...</span>
  ) : (
    `Advice #${advice?.id}`
  )}
</p>


<h1 className="text-[28px] font-extrabold leading-relaxed text-[#CEE3E9] 
min-h-[120px] flex items-center justify-center">
  {loading ? (
    <span className="animate-pulse text-[#CEE3E9]">
      Loading advice...
    </span>
  ) : (
    advice?.advice
  )}
</h1> */}



<p className="text-[#53FFAA] tracking-[4px] uppercase font-bold text-[13px] mb-6">
  {advice ? (
    `Advice #${advice.id}`
  ) : (
    <span className="animate-pulse">Advice #...</span>
  )}
</p>

<h1 className="text-[28px] font-extrabold leading-relaxed text-[#CEE3E9] min-h-[120px] flex items-center justify-center">
  {advice ? (
    advice.advice
  ) : (
    <span className="animate-pulse">Loading advice...</span>
  )}
</h1>

      <div className="flex items-center justify-between pt-10">
        <div className="w-[230px] h-[1px] bg-[#CEE3E9]"></div>
        <div className="font-extrabold text-xl text-emerald-950">||</div>
        <div className="w-[230px] h-[1px] bg-[#CEE3E9]"></div>
      </div>


<button
  onClick={getAdvice}
  disabled={loading}
  className={`rounded-full w-12 h-12 absolute bottom-[-1.5rem] 
    left-1/2 -translate-x-1/2 flex items-center justify-center 
    transition-all duration-300 ${
    loading
      ? "bg-green-400 cursor-not-allowed"
      : "bg-green-500 hover:shadow-[0_0_30px_#53FFAA] cursor-pointer"
  }`}
>
  <FaDice
    className={`text-black text-2xl ${loading ? "animate-spin" : ""}`}
  />
</button>
    </div>
  )
}

export default AdviceCard
