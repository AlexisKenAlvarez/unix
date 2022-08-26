import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import { configureStore } from "@reduxjs/toolkit";
import Slide from './features/slideSlice'

export const store = configureStore({
    reducer: {
        nextSlide: Slide
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

