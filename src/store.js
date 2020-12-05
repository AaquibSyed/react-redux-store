import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./Reducers/productReducers";

const initialState = {};
//const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

//createStore takes three params-reducers,initialstate and middlewares; if there are multiple reducers , we use combineReducers function, middlewares are used
//because here we are using fetch calls to API.
const store = createStore(
  combineReducers({
    products: productsReducer,
  }),
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
