import navigation from './navigation/navigation.reducer';
import status from './status/status.reducer';
import auth from './auth/auth.reducer';
import portfolios from './portfolios/portfolios.reducer';
import coin from './coin/coin.reducer';
import markets from './markets/markets.reducer';
import currencies from './currencies/currencies.reducer';
import inProcess from './inProcess/inProcess.reducer';
import settings from './settings/settings.reducer';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  navigation,
  status,
  auth,
  portfolios,
  coin,
  markets,
  currencies,
  inProcess,
  settings,
};
