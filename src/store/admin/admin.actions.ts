import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthResponse, ILoginData } from './admin.interface'
import { toast } from 'react-toastify'
import { AuthService } from '@/src/services/auth/auth.service'
import { errorCatch } from '@/src/api/api.helper'

export const login = createAsyncThunk<IAuthResponse, ILoginData>(
    "auth/login",
    async ({ username, password }, thunkApi) => {
        try {
            const response = AuthService.login(username, password);

            await toast.promise(response, {
                pending: "Performing login...",
                success: "You have successfully logged in 👌",
                error: "Invalid login or password 🚫",
            });

            return (await response).data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const logout = createAsyncThunk<void, boolean>("auth/logout", async (isNotify = true, thunkApi) => {
    await AuthService.logout();

    if (isNotify) {
        await toast.success('Logout is successful 👌')
    }
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
    "auth/check",
    async (_, thunkApi) => {
        try {
            const response = await AuthService.checkAuth();

            return response.data;
        } catch (error) {
            if (errorCatch(error) === "Unauthorized") {
                await AuthService.logout();

                await toast.error("Session time has expired. Please log in again.");
            }

            return thunkApi.rejectWithValue(error);
        }
    }
)