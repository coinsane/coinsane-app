export default interface IMarketState {
  loading: boolean;
  error: string;
  refreshing: boolean;
  items: IMarkets;
  list: string[];
  cap: {
    loading: boolean;
    error: string;
  };
  searchTerm?: string;
  count?: number;
  cache: {};
}

export interface IPrice {
  from: string;
  to: string;
  price: number;
  lastUpdate: number;
  openDay: number;
  highDay: number;
  lowDay: number;
  open24H: number;
  high24H: number;
  low24H: number;
  change24H: number;
  changePct24H: number;
  changeDay: number;
  changePctDay: number;
  supply: number;
  marketCap: number;
  totalVolume24H: number;
  totalVolume24HTo: number;
  amount: number;
}

export interface IPrices {
  [symbol: string]: IPrice;
}

export interface IMarket {
  _id: string;
  name: string;
  symbol: string;
  imageUrl: string;
  prices: IPrices;
}

export interface IMarkets {
  [marketId: string]: IMarket;
}
