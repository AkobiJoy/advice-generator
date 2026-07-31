// export interface AdviceResponse {
//     slip :{
//         id: number,
//         advice: string
//     }
// }

// export interface AdviceByIdResponse {
//     slip :{
//         id: number,
//         advice: string
//     }
// }

// export interface SearchAdviceResponse {
//     total_results: string,
//     query: string,
//     slips: {
//         id: number;
//         advice: string;
//         date: string;
//     }[];
// }



export interface AdviceSlip {
  id: number;
  advice: string;
}

export interface AdviceResponse {
  slip: AdviceSlip;
}

export interface SearchAdviceSlip extends AdviceSlip {
  date: string;
}

export interface AdviceByIdResponse {
  slip: AdviceSlip;
}

export interface SearchAdviceResponse {
  total_results: string;
  query: string;
  slips: SearchAdviceSlip[];
}