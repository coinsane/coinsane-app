import { AnyAction } from 'redux';

export enum ActionTypes {
  GET_PRICE = 'coin/GET_PRICE',
  COIN_HISTO_UPDATE = 'coin/COIN_HISTO_UPDATE',
  UPDATE_COIN_TRANSACTIONS = 'coin/UPDATE_COIN_TRANSACTIONS',
  COIN_TRANSACTION_REMOVE = 'coin/COIN_TRANSACTION_REMOVE',
  UPDATE_COINS_CACHE = 'coin/UPDATE_COINS_CACHE',
  PORTFOLIO_COIN_REMOVED = 'coin/PORTFOLIO_COIN_REMOVED',
  COINS_ERROR = 'coin/COINS_ERROR',
  GET_AVAILABLE_TRANSACTIONS = 'coin/GET_AVAILABLE_TRANSACTIONS',
  UPDATE_COINS_PERIOD = 'coin/UPDATE_COINS_PERIOD',
  COIN_HISTO_UPDATE_SUCCESS = 'coin/COIN_HISTO_UPDATE_SUCCESS',
  GET_AVAILABLE_TRANSACTIONS_ERROR = 'coin/GET_AVAILABLE_TRANSACTIONS_ERROR',
}

export interface ICoinAction extends AnyAction {
  payload: any;
  type: ActionTypes.GET_PRICE
    | ActionTypes.COIN_HISTO_UPDATE
    | ActionTypes.UPDATE_COIN_TRANSACTIONS
    | ActionTypes.COIN_TRANSACTION_REMOVE
    | ActionTypes.UPDATE_COINS_CACHE
    | ActionTypes.PORTFOLIO_COIN_REMOVED
    | ActionTypes.COINS_ERROR
    | ActionTypes.GET_AVAILABLE_TRANSACTIONS
    | ActionTypes.UPDATE_COINS_PERIOD
    | ActionTypes.COIN_HISTO_UPDATE_SUCCESS
    | ActionTypes.GET_AVAILABLE_TRANSACTIONS_ERROR
    ;
}

export const getCoinHisto = payload => ({ type: ActionTypes.COIN_HISTO_UPDATE, payload });

export function getPrice({ fsym, tsyms, date }) {
  return {
    type: ActionTypes.GET_PRICE,
    payload: {
      fsym,
      tsyms,
      date,
    },
  };
}

export const updateCoinsPeriod = payload => ({
  type: ActionTypes.UPDATE_COINS_PERIOD,
  payload,
});

export function getTransactionsList(coinId) {
  return {
    type: ActionTypes.GET_AVAILABLE_TRANSACTIONS,
    payload: {
      coinId,
    },
  };
}

export const removeCoin = payload => ({
  type: ActionTypes.PORTFOLIO_COIN_REMOVED,
  payload,
});

export function setCoinsError(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({ type: ActionTypes.COINS_ERROR, data }));
}
