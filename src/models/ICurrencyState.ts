export default interface ICurrencyState {
  loading: boolean;
  error: string;
  refreshing: boolean;
  items: ICurrencies;
  list: string[];
  searchTerm?: string;
  count?: number;
}

export interface ICurrency {
  _id: string;
  type: 'currency' | 'market';
  symbol: string;
  name?: string;
  code: string;
  imageUrl?: string;
  system?: boolean;
  decimal: number;
}

export interface ICurrencies {
  [key: string]: ICurrency;
}

export interface ICurrencyUpdate {
  type: string;
  currencyId: string;
  currencies: ICurrencies;
}
