import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        items: []
    }
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getItems: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { getItems } = productSlice.actions
export default productSlice.reducer

