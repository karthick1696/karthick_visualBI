import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga'

import RootReducer from "./reducers";
import RootSagas from "./sagas";

const sagas = createSagaMiddleware(RootSagas);

const store = createStore(
    RootReducer,
    applyMiddleware(sagas)
);

sagas.run(RootSagas);

export default store;
