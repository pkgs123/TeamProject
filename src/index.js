import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import App from './App';
import bgImg from '../src/Images/background.png';

const provider = <Provider store={store}>
    <App />
    
</Provider>

ReactDom.render(provider, document.getElementById('root'));