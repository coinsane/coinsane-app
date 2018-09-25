import { combineReducers } from 'redux';

import IRootState from 'src/models';
import auth from './authReducer';
import categories from './categoriesReducer';
import coin from './coinsReducer';
import currencies from './currenciesReducer';
import markets from './marketsReducer';
import navigation from './navigationReducer';
import pages from './pagesReducer';
import portfolios from './portfoliosReducer';
import settings from './settingsReducer';
import status from './statusReducer';
import transactions from './transactionsReducer';

const rootReducer = combineReducers<IRootState>({
  auth,
  categories,
  coin,
  currencies,
  markets,
  navigation,
  pages,
  portfolios,
  settings,
  status,
  transactions,
});

export default rootReducer;
