import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: {
        value: ''
    },
    password: {
        value: ''
    }
}

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        }
    }
})

export const { setEmail, setPassword } = registerSlice.actions

export default registerSlice.reducer;

