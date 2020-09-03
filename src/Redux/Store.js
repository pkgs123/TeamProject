import {createStore,applyMiddleware,compose} from 'redux';
import combineReducer from './Reducer/combineReducer';
import thunk from 'redux-thunk';

const reduxnewExt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
let store = createStore(combineReducer,compose(applyMiddleware(thunk),reduxnewExt));

export default store;