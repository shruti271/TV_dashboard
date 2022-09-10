import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import singlePhraseReducer from "./ducks/SinglePhrase";
import createSagaMiddleware from "redux-saga";

import watcherSaga from "./sagas/rootSaga";
import logger from "redux-logger";
import smallMeduimReducer from "./ducks/SmallMeduim";
import largeLineReducer from "./ducks/LargeLine";
import industryLineReducer from "./ducks/IndustrialLine";
import fetchTableReducer from "./ducks/MagaeData";

const reducer = combineReducers({
    singlePhase:singlePhraseReducer,
    smallMeduim:smallMeduimReducer,
    largeLineReducer:largeLineReducer,
    industryLineReducer:industryLineReducer,
    fetchTableReducer:fetchTableReducer
});
const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
const sagaMiddleWares = createSagaMiddleware();
const middleWares = [sagaMiddleWares];

if (process.env.NODE_ENV === "development") {
  middleWares.push(logger);
}

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleWares))
  );
  
  export const getStore = () => {
    return store;
  };
  // const store = createStore(reducer, applyMiddleware(...middleWares));
  
  sagaMiddleWares.run(watcherSaga);
  
  export default store;