export default interface ICoinState {
  loading: boolean;
  refreshing: boolean;
  error: boolean;
  list: {};
  items: ICoins;
  transactions: string[];
  transactionsLoading: boolean;
  transactionsError: string;
  markets: string[];
  marketsLoading: boolean;
  marketsError: string;
  period: string;
}

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
