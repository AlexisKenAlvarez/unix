import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:  {
        visible: false,
    },
    animate: {
        state: false
    }

}

export const deleteSlice = createSlice({
    name: "Delete",
    initialState,
    reducers: {
        toggleVisible: (state, action) => {
            state.value = action.payload
        },
        showAnimate: (state, action) => {
            state.animate = action.payload
        }
    }
})

export const { toggleVisible, showAnimate } = deleteSlice.actions
export default deleteSlice.reducer