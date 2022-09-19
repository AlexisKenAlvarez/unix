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
import loginSlice from './features/loginSlice';
import statusSlice from './features/statusSlice';
import errSlice from './features/errSlice';
import productSlice from './features/productSlice'
import cartSlice from './features/cartSlice'
import deleteSlice from './features/deleteSlice'
import toDelete from './features/todeleteSlice'


export const store = configureStore({
    reducer: {
        nextSlide: Slide,
        toggleNav: ToggleNav,
        updateRegister: UpdateRegister,
        loginSlice: loginSlice,
        statusSlice: statusSlice,
        errSlice: errSlice,
        prodSlice: productSlice,
        cartSlice: cartSlice,
        del: deleteSlice,
        deleteThis: toDelete

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
    </BrowserRouter>

);

