import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        status: ''
    }
}

export const userStatus = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setStatus } = userStatus.actions

export default userStatus.reducer