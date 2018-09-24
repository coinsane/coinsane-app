import { combineReducers } from 'redux';

import IRootState from 'src/models';
import auth from './authReducer';
import category from './categoryReducer';
import coin from './coinReducer';
import currency from './currencyReducer';
import market from './marketReducer';
import navigation from './navigationReducer';
import page from './pageReducer';
import portfolio from './portfolioReducer';
import settings from './settingsReducer';
import status from './statusReducer';
import transaction from './transactionReducer';

const rootReducer = combineReducers<IRootState>({
  auth,
  category,
  coin,
  currency,
  market,
  navigation,
  page,
  portfolio,
  settings,
  status,
  transaction,
});

export default rootReducer;
