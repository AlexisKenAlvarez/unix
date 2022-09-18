import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        msg: ''
    }
}

export const errMsg = createSlice({
    name: 'err',
    initialState,
    reducers: {
        setErr: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setErr } = errMsg.actions

export default errMsg.reducer
