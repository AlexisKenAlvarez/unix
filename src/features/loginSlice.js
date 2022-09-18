import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        email: '',
        password: ''
    }
}

export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setLogin } = loginSlice.actions

export default loginSlice.reducer