import { updateFavorites, getFavorites } from '../firebase';

import ApolloClient, { gql } from 'apollo-boost';

// Constants
const UPDATE_NEXT_PAGE = 'UPDATE_NEXT_PAGE';

const FETCH_CHARS = 'FETCH_CHARS';
const FETCH_CHARS_SUCCESS = 'FETCH_CHARS_SUCCESS';
const FETCH_CHARS_ERROR = 'FETCH_CHARS_ERROR';

const NEXT_CHAR = 'NEXT_CHAR';

const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const GET_FAVORITES = 'GET_FAVORITES';
const GET_FAVORITES_SUCCESS = 'GET_FAVORITES_SUCCESS';
const GET_FAVORITES_ERROR = 'GET_FAVORITES_ERROR';
const CLEAN_FAVORITES_ACTION = 'CLEAN_FAVORITES_ACTION';

// const API_URL = 'https://rickandmortyapi.com/api/character/';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
});

let initialData = {
    fetching: false,
    array: [],
    favorites: [],
    error: null,
    nextPage: 1,
};

// Reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case UPDATE_NEXT_PAGE:
            return { ...state, nextPage: action.payload };
        case FETCH_CHARS:
            return { ...state, fetching: true };
        case FETCH_CHARS_SUCCESS:
            return { ...state, fetching: false, array: action.payload };
        case FETCH_CHARS_ERROR:
            return { ...state, fetching: false, error: action.payload };
        case NEXT_CHAR:
            return { ...state, array: action.payload };
        case ADD_TO_FAVORITES:
            return { ...state, ...action.payload };
        case GET_FAVORITES:
            return { ...state, fetching: true };
        case GET_FAVORITES_SUCCESS:
            return { ...state, fetching: false, favorites: action.payload };
        case GET_FAVORITES_ERROR:
            return { ...state, fetching: false, error: action.payload };
        case CLEAN_FAVORITES_ACTION:
            return { ...state, favorites: null };
        default:
            return state;
    }
}

// Actions (thunks)
export const fetchCharsAction = () => (dispatch, getState) => {
    dispatch({ type: FETCH_CHARS });

    const query = gql`
        query($page: Int) {
            characters(page: $page) {
                info {
                    pages
                    next
                    prev
                }
                results {
                    name
                    image
                }
            }
        }
    `;

    const { nextPage } = getState().chars;

    return client
        .query({
            query,
            variables: { page: nextPage },
        })
        .then(({ data, error }) => {
            if (!error) {
                dispatch({
                    type: FETCH_CHARS_SUCCESS,
                    payload: data.characters.results,
                });
                dispatch({
                    type: UPDATE_NEXT_PAGE,
                    payload: data.characters.info.next || 1,
                });
            } else {
                dispatch({
                    type: FETCH_CHARS_ERROR,
                    payload: error,
                });
            }
        });
};

export const nextCharAction = () => (dispatch, getState) => {
    const { array: chars, fetching } = getState().chars;

    if (!fetching) {
        if (chars.length === 1) {
            fetchCharsAction()(dispatch, getState);
            return;
        }

        dispatch({
            type: NEXT_CHAR,
            payload: chars.slice(1),
        });
    }
};

export const addToFavoritesAction = () => (dispatch, getState) => {
    const { array, favorites } = getState().chars;
    const { uid } = getState().user;

    updateFavorites(favorites, uid);
    dispatch({
        type: ADD_TO_FAVORITES,
        payload: {
            array: array.slice(1),
            favorites: [...favorites, array[0]],
        },
    });
};

export const setupFavoritesAction = () => (dispatch, getState) => {
    dispatch({
        type: GET_FAVORITES,
    });

    const { uid } = getState().user;

    getFavorites(uid)
        .then((favorites) => {
            dispatch({
                type: GET_FAVORITES_SUCCESS,
                payload: favorites,
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_FAVORITES_ERROR,
                payload: err.message,
            });
        });
};

export const cleanFavoritesAction = () => (dispatch) => {
    dispatch({
        type: CLEAN_FAVORITES_ACTION,
    });
};
