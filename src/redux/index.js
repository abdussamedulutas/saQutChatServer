import { combineReducers, createStore } from "redux";
import { Provider } from 'react-redux';

import AuthRedux from "./auth.js";
import as from "@mui/material"


let store = createStore(combineReducers({
    Auth: AuthRedux
}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export {
    store,
    Provider
};
