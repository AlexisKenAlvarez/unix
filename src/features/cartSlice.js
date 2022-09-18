import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        onCart: false
    },
    checked: {
        value: 0
    },
    amount: {
        value: 0
    },
    total: {
        value: 0
    },
    somethingDeleted: {
        value: false
    },
    checkOut: {
        value: []
    },
    itemToDelete: {
        name: ''
    }

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        handleCart: (state, action) => {
            state.value = action.payload
        },
        setChecked: (state, action) => {
            state.checked = action.payload
        },
        setTotal: (state, action) => {
            state.total = action.payload
        },
        setAmount: (state,action) => {
            state.amount = action.payload
        },
        setSomethingDeleted: (state, action) => {
            state.somethingDeleted = action.payload
        },
        setCheckOut: (state, action) => {
            void state.checkOut.value.push(action.payload)
        },
        toDelete: (state, action) => {
            // Construct a new result array immutably and return it
            const newItems = state.checkOut.value.filter(items => items.itemDetails.productName !== action.payload)
            state.checkOut.value = newItems
        },
        deleteName: (state, action) => {
            state.itemToDelete = action.payload
        }
    }
})

export const { handleCart,setChecked, setTotal, setAmount,setSomethingDeleted, setCheckOut, toDelete, deleteName } = cartSlice.actions
export default cartSlice.reducer

