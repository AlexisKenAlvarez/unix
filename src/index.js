import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import { configureStore } from "@reduxjs/toolkit";

// REDUCER SLICE
import Slide from './features/slideSlice'
import ToggleNav from './features/navSlice'
import UpdateRegister from './features/registerSlice'


export const store = configureStore({
    reducer: {
        nextSlide: Slide,
        toggleNav: ToggleNav,
        updateRegister: UpdateRegister
    }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
    </BrowserRouter>

);

