// All action types here

// ========= [auth] peace of state action types ========= //
export const CHECK_TOKEN = '[auth] CHECK_TOKEN';
export const GET_TOKEN = '[auth] GET_TOKEN';
export const GET_TOKEN_SUCCEED = '[auth] GET_TOKEN_SUCCEED';
export const GET_TOKEN_ERROR = '[auth] GET_TOKEN_ERROR';


// ========= [coins] peace of state action types ========= //
export const GET_COURSE = '[coins] GET_COURSE';
export const GET_COURSE_SUCCESS = '[coins] GET_COURSE_SUCCESS';
export const GET_COURSE_ERROR = '[coins] GET_COURSE_ERROR';
export const COIN_HISTO_UPDATE = '[coins] COIN_HISTO_UPDATE';
export const ADD_TRANSACTION = '[coins] ADD_TRANSACTION';
export const ADD_TRANSACTION_SUCCESS = '[coins] ADD_TRANSACTION_SUCCESS';
export const ADD_TRANSACTION_ERROR = '[coins] ADD_TRANSACTION_ERROR';
export const PORTFOLIO_COIN_REMOVED = '[coins] PORTFOLIO_COIN_REMOVED';
export const COINS_ERROR = '[coins] COINS_ERROR';
export const SET_COIN_DATA = '[coins] SET_COIN_DATA';


// ========= [coins] peace of state action types ========= //
export const GET_AVALIABLE_MARKETS = '[api] GET_AVALIABLE_MARKETS';
export const GET_AVALIABLE_MARKETS_SUCCESS = '[coins] GET_AVALIABLE_MARKETS_SUCCESS';
export const GET_AVALIABLE_MARKETS_ERROR = '[coins] GET_AVALIABLE_MARKETS_ERROR';
export const SEARCH_AVALIABLE_MARKETS = '[api] SEARCH_AVALIABLE_MARKETS';
export const GET_SEARCHED_MARKETS_SUCCESS = '[api] GET_SEARCHED_MARKETS_SUCCESS';
export const GET_SEARCHED_MARKETS_ERROR = '[api] GET_SEARCHED_MARKETS_ERROR';
export const CLEAR_MARKETS = '[coins] CLEAR_MARKETS';

// ========= [currencies] peace of state action types ========= //
export const GET_AVALIABLE_CURRENCIES = '[currencies] GET_AVALIABLE_CURRENCIES';
export const GET_AVALIABLE_CURRENCIES_SUCCESS = '[currencies] GET_AVALIABLE_CURRENCIES_SUCCESS';
export const GET_AVALIABLE_CURRENCIES_ERROR = '[currencies] GET_AVALIABLE_CURRENCIES_ERROR';


// ========= [portfolios] peace of state action types ========= //
export const TOTALS_REPLACE = '[portfolios] TOTALS_REPLACE';
export const PORTFOLIOS_UPDATE = '[portfolios] PORTFOLIOS_UPDATE';
export const PORTFOLIO_SELECT = '[portfolios] PORTFOLIO_SELECT';
export const PORTFOLIO_UPDATE = '[portfolios] PORTFOLIO_UPDATE';
export const PORTFOLIO_ADDED = '[portfolios] PORTFOLIO_ADDED';
export const PORTFOLIO_REMOVED = '[portfolios] PORTFOLIO_REMOVED';
export const PORTFOLIOS_ERROR = '[portfolios] PORTFOLIOS_ERROR';


// ========= [navigation] peace of state action types ========= //
export const DRAWER_ACTIONS = '[navigation] DRAWER_ACTIONS';
export const SET_ACTIVE_MENU = '[navigation] SET_ACTIVE_MENU';


// ========= [inProccess] peace of state action types ========= //
export const UPDATE_TRANSACTION = '[proccess] UPDATE_TRANSACTION';
export const CLEAR_TRANSACTION = '[proccess] CLEAR_TRANSACTION';


export const API_REQUEST = '[api] API_REQUEST';