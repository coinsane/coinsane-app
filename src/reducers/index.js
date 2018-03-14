import navigation from './navigation';
import status from './status';
import auth from './auth';
import portfolios from './portfolios';
import coins from './coins';

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
  coins,
};
