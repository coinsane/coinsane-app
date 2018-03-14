// All action types here

// ========= [auth] peace of state action types ========= //
export const CHECK_TOKEN = '[auth] CHECK_TOKEN';
export const GET_TOKEN = '[auth] GET_TOKEN';
export const GET_TOKEN_SUCCEED = '[auth] GET_TOKEN_SUCCEED';
export const GET_TOKEN_ERROR = '[auth] GET_TOKEN_ERROR';


// ========= [coins] peace of state action types ========= //
export const API_GET_AVALIABLE_COINS = '[api] GET_AVALIABLE_COINS'
export const GET_AVALIABLE_COINS_SUCCESS = '[coins] GET_AVALIABLE_COINS_SUCCESS';
export const GET_AVALIABLE_COINS_ERROR = '[coins] GET_AVALIABLE_COINS_ERROR';
export const COIN_HISTO_UPDATE = '[coins] COIN_HISTO_UPDATE';
export const PORTFOLIO_COIN_REMOVED = '[coins] PORTFOLIO_COIN_REMOVED';
export const COINS_ERROR = '[coins] COINS_ERROR';
export const SET_COIN_DATA = '[coins] SET_COIN_DATA';


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


export const API_REQUEST = '[api] API_REQUEST';