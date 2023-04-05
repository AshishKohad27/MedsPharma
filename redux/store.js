// Don't make any changes to this file. 


import {
    legacy_createStore,
    compose,
    applyMiddleware,
    combineReducers
} from 'redux';
import { cartReducer } from './cart/reducer';
import { productReducer } from './product/reducer';

import thunk from 'redux-thunk';
import { userReducer } from './auth/user.reducer';

const rootReducer = combineReducers({
    
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
});

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
export const store = legacy_createStore( rootReducer, composeEnhancers(applyMiddleware(thunk)));