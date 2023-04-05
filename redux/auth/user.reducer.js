import axios from "axios";
import {
    CLEAR_MESSAGE,
    ERROR_MESSAGE,
    GET_ALL_USERS,
    GET_DETAILS_FROM_TOKEN,
    LOGIN_ERROR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGOUT,
    SAVE_CREDENTIAL,
    SIGNUP_ERROR,
    SIGNUP_LOADING,
    SIGNUP_SUCCESS,
} from "./user.type";

let access_token;
console.log('access_token:', access_token)
if (typeof window !== 'undefined') {
    // Access localStorage here
    access_token = localStorage.getItem("access_token");
}

if (access_token) {
    axios.defaults.headers.common["authorization_access"] = access_token;
}

const initState = {
    isAuth: !!access_token,
    token: access_token,
    loading: false,
    error: false,
    message: "",
    errorMessage: "",
    tokenDetails: [],
    user: [],
    allUsers: [],
    loginCredential: {}
};

export const userReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOGIN_LOADING: {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem("access_token", payload.access_token);
            delete axios.defaults.headers.common["authorization_access"];
            axios.defaults.headers.common["authorization_access"] =
                payload.access_token;

            return {
                ...state,
                isAuth: true,
                token: payload.access_token,
                loading: false,
                error: false,
                message: payload.message,
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: payload,
            };
        }
        case SIGNUP_LOADING: {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                message: payload.message,
                user: payload.data,
            };
        }
        case SIGNUP_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload.message,
            };
        }
        case CLEAR_MESSAGE: {
            return {
                ...state,
                message: "",
                user: [],
                errorMessage: "",
            };
        }
        case GET_DETAILS_FROM_TOKEN: {
            return {
                ...state,
                tokenDetails: payload,
                loading: false,
                error: false,
            };
        }
        case ERROR_MESSAGE: {
            console.log("ERROR:",payload)
            return {
                ...state,
                errorMessage: payload,
            };
        }
        case LOGOUT: {
            localStorage.removeItem("access_token");
            delete axios.defaults.headers.common["authorization_access"];
            return {
                ...state,
                isAuth: false,
                loginCredential: {}
            };
        }
        case GET_ALL_USERS: {
            return {
                ...state,
                allUsers: payload.data,
            };
        }

        case SAVE_CREDENTIAL: {
            return {
                ...state,
                loginCredential: payload
            }
        }
        default: {
            return state;
        }
    }
};
