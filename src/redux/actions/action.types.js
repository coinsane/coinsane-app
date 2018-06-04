// All action types here

// ========= [auth] peace of state action types ========= //
export const CHECK_TOKEN = '[auth] CHECK_TOKEN';
export const GET_TOKEN = '[auth] GET_TOKEN';
export const GET_TOKEN_SUCCEED = '[auth] GET_TOKEN_SUCCEED';
export const GET_TOKEN_ERROR = '[auth] GET_TOKEN_ERROR';


// ========= [coins] peace of state action types ========= //
export const GET_PRICE = '[coins] GET_PRICE';
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
export const UPDATE_COINS_PERIOD = '[coins] UPDATE_COINS_PERIOD';


// ========= [coins] peace of state action types ========= //
export const UPDATE_COINS_CACHE = '[coins] UPDATE_COINS_CACHE';
export const GET_AVAILABLE_MARKETS = '[api] GET_AVAILABLE_MARKETS';
export const GET_AVAILABLE_MARKETS_SUCCESS = '[coins] GET_AVAILABLE_MARKETS_SUCCESS';
export const GET_AVAILABLE_MARKETS_ERROR = '[coins] GET_AVAILABLE_MARKETS_ERROR';
export const SEARCH_AVAILABLE_MARKETS = '[api] SEARCH_AVAILABLE_MARKETS';
export const SEARCH_AVAILABLE_MARKETS_SUCCESS = '[api] SEARCH_AVAILABLE_MARKETS_SUCCESS';
export const SEARCH_AVAILABLE_MARKETS_ERROR = '[api] SEARCH_AVAILABLE_MARKETS_ERROR';
export const CLEAR_MARKETS = '[coins] CLEAR_MARKETS';
export const UPDATE_COIN_TRANSACTIONS = '[coins] UPDATE_COIN_TRANSACTIONS';


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
export const UPDATE_PORTFOLIO_CHART_ERROR = '[portfolios] UPDATE_PORTFOLIO_CHART_ERROR';
export const UPDATE_PORTFOLIO_CHART_SUCCESS = '[portfolios] UPDATE_PORTFOLIO_CHART_SUCCESS';

export const UPDATE_PORTFOLIO_PERIOD = '[portfolios] UPDATE_PORTFOLIO_PERIOD';
export const UPDATE_PORTFOLIO_PERIOD_SUCCESS = '[portfolios] UPDATE_PORTFOLIO_PERIOD_SUCCESS';
export const UPDATE_PORTFOLIO_PERIOD_ERROR = '[portfolios] UPDATE_PORTFOLIO_PERIOD_ERROR';
export const UPDATE_PORTFOLIO_CURRENCY = '[portfolios] UPDATE_PORTFOLIO_CURRENCY';
export const UPDATE_PORTFOLIO_CURRENCY_SUCCESS = '[portfolios] UPDATE_PORTFOLIO_CURRENCY_SUCCESS';
export const UPDATE_PORTFOLIO_CURRENCY_ERROR = '[portfolios] UPDATE_PORTFOLIO_CURRENCY_ERROR';

export const PORTFOLIO_SELECT = '[portfolios] PORTFOLIO_SELECT';
export const PORTFOLIO_ADD = '[portfolios] PORTFOLIO_ADD';
export const PORTFOLIO_ADD_SUCCESS = '[portfolios] PORTFOLIO_ADD_SUCCESS';
export const PORTFOLIO_ADD_ERROR = '[portfolios] PORTFOLIO_ADD_ERROR';

export const PORTFOLIO_UPDATE = '[portfolios] PORTFOLIO_UPDATE';
export const PORTFOLIO_UPDATE_SUCCESS = '[portfolios] PORTFOLIO_UPDATE_SUCCESS';
export const PORTFOLIO_UPDATE_ERROR = '[portfolios] PORTFOLIO_UPDATE_ERROR';

export const PORTFOLIO_REMOVE = '[portfolios] PORTFOLIO_REMOVE';
export const PORTFOLIO_REMOVE_SUCCESS = '[portfolios] PORTFOLIO_REMOVE_SUCCESS';
export const PORTFOLIO_REMOVE_ERROR = '[portfolios] PORTFOLIO_REMOVE_ERROR';

export const PORTFOLIOS_ERROR = '[portfolios] PORTFOLIOS_ERROR';
export const UPDATE_PERIOD = '[portfolios] UPDATE_PERIOD';
export const UPDATE_PERIOD_SUCCESS = '[portfolios] UPDATE_PERIOD_SUCCESS';
export const UPDATE_COLLAPSED = '[portfolios] UPDATE_COLLAPSED';


// ========= [navigation] peace of state action types ========= //
export const DRAWER_ACTIONS = '[navigation] DRAWER_ACTIONS';
export const SET_ACTIVE_MENU = '[navigation] SET_ACTIVE_MENU';


// ========= [settings] peace of state action types ========= //
export const GET_SETTINGS = '[settings] GET_SETTINGS';
export const GET_SETTINGS_SUCCEED = '[settings] GET_SETTINGS_SUCCEED';
export const GET_SETTINGS_ERROR = '[settings] GET_SETTINGS_ERROR';


// ========= [markets] peace of state action types ========= //
export const GET_MARKET_CAP = '[markets] GET_MARKET_CAP';
export const GET_MARKET_CAP_SUCCESS = '[markets] GET_MARKET_CAP_SUCCESS';
export const GET_MARKET_CAP_ERROR = '[markets] GET_MARKET_CAP_ERROR';
export const UPDATE_MARKETS_CACHE = '[markets] UPDATE_MARKETS_CACHE';
export const MARKET_CHART_UPDATE = '[markets] MARKET_CHART_UPDATE';


// ========= [pages] peace of state action types ========= //
export const GET_PAGES = '[pages] GET_PAGES';
export const GET_PAGES_SUCCESS = '[pages] GET_PAGES_SUCCESS';
export const GET_PAGES_ERROR = '[pages] GET_PAGES_ERROR';

// ========= [transactions] peace of state action types ========= //
export const TRANSACTIONS_ADD = '[transactions] TRANSACTIONS_ADD';
export const TRANSACTIONS_ADD_SUCCESS = '[transactions] TRANSACTIONS_ADD_SUCCESS';
export const TRANSACTIONS_ADD_ERROR = '[transactions] TRANSACTIONS_ADD_ERROR';
export const UPDATE_TRANSACTIONS_ITEMS = '[transactions] UPDATE_TRANSACTIONS_ITEMS';
export const GET_TRANSACTIONS_SUCCESS = '[transactions] GET_TRANSACTIONS_SUCCESS';

export const UPDATE_DRAFT_TRANSACTION = '[transactions] UPDATE_DRAFT_TRANSACTION';
export const GET_TRANSACTION_PRICE_SUCCESS = '[transactions] GET_TRANSACTION_PRICE_SUCCESS';
export const GET_TRANSACTION_PRICE_ERROR = '[transactions] GET_TRANSACTION_PRICE_ERROR';

export const CLEAR_DRAFT_TRANSACTION = '[transactions] CLEAR_DRAFT_TRANSACTION';
export const RECALCULATE = '[transactions] RECALCULATE';
