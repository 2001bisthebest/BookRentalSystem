import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'test',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.value = 'test login'
        },
        logout: (state) => {
            state.value = 'test logout'
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = userSlice.actions

export default userSlice.reducer