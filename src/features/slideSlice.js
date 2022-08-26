import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        page: 1
    }
}

export const slideSlice = createSlice({
    name: "slider",
    initialState,
    reducers: {
        nextSlide: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { nextSlide } = slideSlice.actions

export default slideSlice.reducer