export interface IAmount {
  [symbol: string]: number;
}

export interface IProvider {
  _id: string;
  name: string;
}
export interface IService {
  _id: string;
  provider: IProvider;
}

export interface IPortfolioCoin {
  _id: string;
  market: string;
  amount: number;
}

export interface IPortfolio {
  _id: string;
  inTotal: boolean;
  title: string;
  changePct: number;
  amount: number;
  amounts: IAmount[];
  service?: IService;
  data: IPortfolioCoin[];
}

export interface IPortfolios {
  [portfolioId: string]: IPortfolio;
}

export interface IChartDataItem {
  [timestamp: string]: number
}

export interface IChartData {
  data: IChartDataItem;
  high: number;
  low: number;
  pct: number;
}

export interface IChart {
  [periodCurrency: string]: IChartData;
}

export interface ICharts {
  [chartId: string]: IChart;
}
