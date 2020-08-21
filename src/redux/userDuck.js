import { loginWithGoogle, getLoggedUser, logout } from '../firebase';
import { setupFavoritesAction, cleanFavoritesAction } from './charsDuck';

// Constants
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_ERROR = 'LOGOUT_ERROR';

// The initial data object is important because the reducer
// is called once the store is created, and the state is
// undefined when that happens.
let initialData = {
    loggedIn: false,
    fetching: false,
};

// Reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, fetching: true };
        case LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                loggedIn: true,
                uid: action.payload.uid,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL,
                email: action.payload.email,
            };
        case LOGIN_ERROR:
            return { ...state, fetching: false, error: action.payload };
        case LOGOUT_SUCCESS:
            return initialData;
        case LOGOUT_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

// Actions

export const getSessionAction = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN,
    });

    getLoggedUser()
        .then((user) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: user,
            });
            setupFavoritesAction()(dispatch, getState);
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.message,
            });
        });
};

export const googleLoginAction = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN,
    });

    loginWithGoogle()
        .then((user) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: user,
            });
            setupFavoritesAction()(dispatch, getState);
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.message,
            });
        });
};

export const logoutAction = () => (dispatch) => {
    logout()
        .then(() => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });

            cleanFavoritesAction()(dispatch);
        })
        .catch((err) => {
            dispatch({
                type: LOGOUT_ERROR,
                error: err.message,
            });
        });
};
