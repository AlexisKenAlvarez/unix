import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        email: '',
        password: ''
    }
}

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        updateRegister: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { updateRegister } = registerSlice.actions

export default registerSlice.reducer;

