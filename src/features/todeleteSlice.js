import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        deleteName: ''
    }
}

export const toDelete = createSlice({
    name: "toDelete",
    initialState,
    reducers: {
        deleteThis: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { deleteThis} = toDelete.actions
export default toDelete.reducer