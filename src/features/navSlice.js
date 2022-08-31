import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isActive: false
    }
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        toggleActive: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { toggleActive } = navSlice.actions

export default navSlice.reducer