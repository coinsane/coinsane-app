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
export const COIN_HISTO_UPDATE_SUCCESS = '[coins] COIN_HISTO_UPDATE_SUCCESS';
export const COIN_HISTO_UPDATE_ERROR = '[coins] COIN_HISTO_UPDATE_ERROR';
export const ADD_TRANSACTION = '[coins] ADD_TRANSACTION';
export const ADD_TRANSACTION_SUCCESS = '[coins] ADD_TRANSACTION_SUCCESS';
export const ADD_TRANSACTION_ERROR = '[coins] ADD_TRANSACTION_ERROR';
export const PORTFOLIO_COIN_REMOVED = '[coins] PORTFOLIO_COIN_REMOVED';
export const COINS_ERROR = '[coins] COINS_ERROR';
export const SET_COIN_DATA = '[coins] SET_COIN_DATA';
export const COIN_MARKETS_UPDATE = '[coins] COIN_MARKETS_UPDATE';
export const COIN_MARKETS_UPDATE_SUCCESS = '[coins] COIN_MARKETS_UPDATE_SUCCESS';
export const COIN_MARKETS_UPDATE_ERROR = '[coins] COIN_MARKETS_UPDATE_ERROR';


// ========= [coins] peace of state action types ========= //
export const GET_AVAILABLE_MARKETS = '[api] GET_AVAILABLE_MARKETS';
export const GET_AVAILABLE_MARKETS_SUCCESS = '[coins] GET_AVAILABLE_MARKETS_SUCCESS';
export const GET_AVAILABLE_MARKETS_ERROR = '[coins] GET_AVAILABLE_MARKETS_ERROR';
export const SEARCH_AVAILABLE_MARKETS = '[api] SEARCH_AVAILABLE_MARKETS';
export const SEARCH_AVAILABLE_MARKETS_SUCCESS = '[api] SEARCH_AVAILABLE_MARKETS_SUCCESS';
export const SEARCH_AVAILABLE_MARKETS_ERROR = '[api] SEARCH_AVAILABLE_MARKETS_ERROR';
export const CLEAR_MARKETS = '[coins] CLEAR_MARKETS';


// ========= [currencies] peace of state action types ========= //
export const GET_AVAILABLE_CURRENCIES = '[currencies] GET_AVAILABLE_CURRENCIES';
export const GET_AVAILABLE_CURRENCIES_SUCCESS = '[currencies] GET_AVAILABLE_CURRENCIES_SUCCESS';
export const GET_AVAILABLE_CURRENCIES_ERROR = '[currencies] GET_AVAILABLE_CURRENCIES_ERROR';
export const SELECT_CURRENCY = '[currencies] SELECT_CURRENCY';
export const SELECT_CURRENCY_SUCCESS = '[currencies] SELECT_CURRENCY_SUCCESS';
export const SELECT_CURRENCY_ERROR = '[currencies] SELECT_CURRENCY_ERROR';
export const UPDATE_CHART = '[currencies] UPDATE_CHART';
export const UPDATE_CHART_SUCCESS = '[currencies] UPDATE_CHART_SUCCESS';
export const UPDATE_CHART_ERROR = '[currencies] UPDATE_CHART_ERROR';


// ========= [transactions] peace of state action types ========= //
export const GET_AVAILABLE_TRANSACTIONS = '[currencies] GET_AVAILABLE_TRANSACTIONS';
export const GET_AVAILABLE_TRANSACTIONS_SUCCESS = '[currencies] GET_AVAILABLE_TRANSACTIONS_SUCCESS';
export const GET_AVAILABLE_TRANSACTIONS_ERROR = '[currencies] GET_AVAILABLE_TRANSACTIONS_ERROR';
export const UPDATE_CURRENT_TRANSACTION = '[currencies] UPDATE_CURRENT_TRANSACTION';


// ========= [portfolios] peace of state action types ========= //
export const UPDATE_PORTFOLIOS = '[portfolios] UPDATE_PORTFOLIOS';
export const UPDATE_PORTFOLIOS_SUCCESS = '[portfolios] UPDATE_PORTFOLIOS_SUCCESS';
export const UPDATE_PORTFOLIOS_ERROR = '[portfolios] UPDATE_PORTFOLIOS_ERROR';

export const UPDATE_PORTFOLIO_CHART = '[portfolios] UPDATE_PORTFOLIO_CHART';
export const UPDATE_PORTFOLIO_CHART_SUCCESS = '[portfolios] UPDATE_PORTFOLIO_CHART_SUCCESS';
export const UPDATE_PORTFOLIO_CHART_ERROR = '[portfolios] UPDATE_PORTFOLIO_CHART_ERROR';

export const TOTALS_REPLACE = '[portfolios] TOTALS_REPLACE';
export const TOTALS_REPLACE_SUCCESS = '[portfolios] TOTALS_REPLACE_SUCCESS';

export const UPDATE_PORTFOLIO_PERIOD = '[portfolios] UPDATE_PORTFOLIO_PERIOD';
export const UPDATE_PORTFOLIO_PERIOD_SUCCESS = '[portfolios] UPDATE_PORTFOLIO_PERIOD_SUCCESS';
export const UPDATE_PORTFOLIO_PERIOD_ERROR = '[portfolios] UPDATE_PORTFOLIO_PERIOD_ERROR';
export const UPDATE_PORTFOLIO_CURRENCY = '[portfolios] UPDATE_PORTFOLIO_CURRENCY';
export const UPDATE_PORTFOLIO_CURRENCY_SUCCESS = '[portfolios] UPDATE_PORTFOLIO_CURRENCY_SUCCESS';
export const UPDATE_PORTFOLIO_CURRENCY_ERROR = '[portfolios] UPDATE_PORTFOLIO_CURRENCY_ERROR';

export const PORTFOLIO_SELECT = '[portfolios] PORTFOLIO_SELECT';
export const PORTFOLIO_UPDATE = '[portfolios] PORTFOLIO_UPDATE';
export const PORTFOLIO_ADDED = '[portfolios] PORTFOLIO_ADDED';
export const PORTFOLIO_REMOVED = '[portfolios] PORTFOLIO_REMOVED';
export const PORTFOLIOS_ERROR = '[portfolios] PORTFOLIOS_ERROR';
export const UPDATE_PERIOD = '[portfolios] UPDATE_PERIOD';
export const UPDATE_PERIOD_SUCCESS = '[portfolios] UPDATE_PERIOD_SUCCESS';
export const UPDATE_COLLAPSED = '[portfolios] UPDATE_COLLAPSED';


// ========= [navigation] peace of state action types ========= //
export const DRAWER_ACTIONS = '[navigation] DRAWER_ACTIONS';
export const SET_ACTIVE_MENU = '[navigation] SET_ACTIVE_MENU';


// ========= [inProcess] peace of state action types ========= //
export const UPDATE_TRANSACTION = '[process] UPDATE_TRANSACTION';
export const CLEAR_TRANSACTION = '[process] CLEAR_TRANSACTION';
export const RECALCULATE = '[process] RECALCULATE';


// ========= [settings] peace of state action types ========= //
export const GET_SETTINGS = '[settings] GET_SETTINGS';
export const GET_SETTINGS_SUCCEED = '[settings] GET_SETTINGS_SUCCEED';
export const GET_SETTINGS_ERROR = '[settings] GET_SETTINGS_ERROR';


// ========= [markets] peace of state action types ========= //
export const GET_MARKET_CAP = '[markets] GET_MARKET_CAP';
export const GET_MARKET_CAP_SUCCESS = '[markets] GET_MARKET_CAP_SUCCESS';
export const GET_MARKET_CAP_ERROR = '[markets] GET_MARKET_CAP_ERROR';


// ========= [pages] peace of state action types ========= //
export const GET_PAGES = '[pages] GET_PAGES';
export const GET_PAGES_SUCCEED = '[pages] GET_PAGES_SUCCEED';
export const GET_PAGES_ERROR = '[pages] GET_PAGES_ERROR';
