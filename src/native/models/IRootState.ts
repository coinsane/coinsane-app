import {
  IAuthState,
  ICategoryState,
  ICoinState,
  ICurrencyState,
  IMarketState,
  INavigationState,
  IPageState,
  IPortfolioState,
  ISettingsState,
  IStatusState,
  ITransactionState,
} from '.';

export default interface IRootState {
  auth: IAuthState;
  categories: ICategoryState;
  coin: ICoinState;
  currencies: ICurrencyState;
  markets: IMarketState;
  navigation: INavigationState;
  pages: IPageState;
  portfolios: IPortfolioState;
  settings: ISettingsState;
  status: IStatusState;
  transactions: ITransactionState;
}
