export interface ICoins {
  [coinId: string]: ICoin;
}

export interface ICoin {
  _id: string;
  amount: number;
  market: string;
  portfolio: string;
  transactions: string[];
}
