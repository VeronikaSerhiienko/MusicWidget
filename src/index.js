
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import artistDataReducer from './store/reducers/artistDataReducer';
import currentSongReducer from './store/reducers/currentSongReducer';

const rootReducer = combineReducers({
  artistData: artistDataReducer,
  currentSong: currentSongReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root'),
);
