import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import appStateReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(appStateReducer, composeWithDevTools(applyMiddleware(thunk)));
