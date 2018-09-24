export default interface IStatusState {
  loading: boolean;
  error: string;
  refreshing: boolean;
  list: string[];
  items: {};
  draft: IDraftTransaction;
}

export interface IDraftTransaction {
  coin?: string;
  portfolio: string;
  market: string;
  currency: string;
  type: string;
  price: number;
  amount: number;
  total: number;
  date: string;
  time: string;
  category: string;
  note: string;
  deduct: boolean;
}
