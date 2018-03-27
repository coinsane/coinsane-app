import { all, put, call, takeLatest, select, takeEvery } from 'redux-saga/effects';
import { round } from '../../../lib/utils';
import { inProcess } from '../../actions';
import api from '../../../api';
import selectors from '../../selectors';
import {
  ADD_TRANSACTION,
  GET_COURSE,
  GET_COURSE_SUCCESS,
  RECALCULATE,
  UPDATE_TRANSACTION
} from '../../actions/action.types';

/** 
 * action.payload: {  }
 */
export function* addTransaction(action) {
  yield call(api.coins.addTransaction, action.payload);
}

/** 
 * action.payload: {  }
 */
export function* updateTransaction(action) {
  if (action.payload.coin || action.payload.currency) {
    let transaction = yield select(selectors.getTransaction);
    const reponse = yield call(api.coins.getCourse, { fsym: transaction.coinItem.symbol, tsym: transaction.currencyItem.code });
    yield put({ type: GET_COURSE_SUCCESS, payload: reponse.data.data[transaction.currencyItem.code] });
    yield put({ type: RECALCULATE, payload: 'price' });
  }
}

/** 
 * action.payload: { fsym, tsym, date }
 */
export function* getCourse(action) {
  console.log(action);
  const reponse = yield call(api.coins.getCourse, action.payload);
  yield put({ type: GET_COURSE_SUCCESS, payload: reponse.data.data[action.payload.tsym] });
  yield put({ type: RECALCULATE, payload: 'price' });
}

/** 
 * Calculate transaction amount, price, total
 */
export function* recalculate(action) {
  // Get inProcess -> transaction peace of state
  let transaction = yield select(selectors.getTransaction);
  
  if (action.payload === 'price') {
    if (+transaction.amount) {
      const total = transaction.price * transaction.amount;
      yield put(inProcess.updateProccessTransaction({ total: round(total, 8) }));
    } else if (+transaction.total) {
      const amount = transaction.total / transaction.price;
      yield put(inProcess.updateProccessTransaction({ amount: round(amount, 8) }));
    }
  }
  if (action.payload === 'total') {
    if (+transaction.total) {
      if (+transaction.amount) {
        const price = transaction.total / transaction.amount;
        yield put(inProcess.updateProccessTransaction({ price: round(price, 8) }));
      } else {
        const amount = transaction.total / transaction.price;
        yield put(inProcess.updateProccessTransaction({ amount: round(amount, 8) }));
      }
    }
  } 
  if (action.payload === 'amount') {
    if (+transaction.price) {
      const total = transaction.price * transaction.amount;
      yield put(inProcess.updateProccessTransaction({ total: round(total, 8) }));
    }
  }
}

// for rootSaga
export default [
  takeLatest(GET_COURSE, getCourse),
  takeLatest(RECALCULATE, recalculate),
  takeLatest(ADD_TRANSACTION, addTransaction),
  takeEvery(UPDATE_TRANSACTION, updateTransaction)
];