import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import watcherSaga from "./sagas/rootSaga";
import logger from "redux-logger";
// import shiftTargetReducer from "./ducks/ShiftTarget";
// import wipReducer from "./ducks/Wip";
import shiftReducer from "./ducks/Shift";
// import lineReducer from "./ducks/Line";

const reducer = combineReducers({
  // wipReducer: wipReducer,
  shiftReducer: shiftReducer,
  // shiftTargetReducer: shiftTargetReducer,
  // lineReducer:lineReducer
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

sagaMiddleWares.run(watcherSaga);

export default store;
