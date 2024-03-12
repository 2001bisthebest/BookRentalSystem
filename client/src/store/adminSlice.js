import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    admin: []
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        login: (state, action) => {
            state.admin = action.payload
        },
        logout: (state) => {
            state.admin = 'logout'
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = adminSlice.actions

export default adminSlice.reducer