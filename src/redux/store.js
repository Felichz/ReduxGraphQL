import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import userReducer, { getSessionAction } from './userDuck';
import charsReducer, { fetchCharsAction } from './charsDuck';
import thunk from 'redux-thunk';

const mainReducer = combineReducers({
    user: userReducer,
    chars: charsReducer,
});

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const storeConfig = [
    mainReducer,
    undefined,
    composeEnhancers(applyMiddleware(thunk)),
];

export default function genStore() {
    const store = createStore(...storeConfig);

    // Try to get a logged user
    getSessionAction()(store.dispatch, store.getState);

    // Setup characters
    fetchCharsAction()(store.dispatch, store.getState);

    return store;
}
