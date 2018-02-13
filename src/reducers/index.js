import navigation from './navigation';
import status from './status';
import member from './member';
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
  member,
  portfolios,
  coins,
};
