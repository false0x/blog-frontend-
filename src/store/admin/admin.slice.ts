import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./admin.interface";
import { checkAuth, login } from './admin.actions'
import { getStoreLocal } from '@/src/utils/local-storage'

const initialState: IInitialState = {
    isLoading: false,
    isLoggedIn: getStoreLocal('isLoggedIn')
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, state => {
            state.isLoading = true
        }).addCase(login.fulfilled, state => {
            state.isLoading = false
            state.isLoggedIn = true
        }).addCase(login.rejected, state => {
            state.isLoading = false
        }).addCase(checkAuth.rejected, state => {
            state.isLoggedIn = false
        })
    }
})

export const { reducer } = adminSlice