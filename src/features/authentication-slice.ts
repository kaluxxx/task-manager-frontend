import {AuthenticationState} from "@/models/states/authentication-state.ts";
import {AsyncThunk, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthenticationResponse} from "@/models/types/response.ts";
import {AuthenticationDTO} from "@/models/dto/authentication/authenticationDTO.ts";
import authenticationService from "@/service/authentication-service.ts";
import {HttpRequestError} from "@/lib/http-request-error.ts";
import {RootState} from "@/store.ts";

export const register: AsyncThunk<AuthenticationResponse, AuthenticationDTO, object> =
    createAsyncThunk(
        "authentication/register",
        async (account: AuthenticationDTO): Promise<AuthenticationResponse> => {
            return await authenticationService.register(account);
        },
    );

export const login: AsyncThunk<AuthenticationResponse, AuthenticationDTO, object> =
    createAsyncThunk(
        "authentication/login",
        async (account: AuthenticationDTO): Promise<AuthenticationResponse> => {
            return await authenticationService.login(account);
        },
    );

const initialState: AuthenticationState = {
    isAuthenticated: localStorage.getItem("token") !== null,
    error: null,
};

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            // save the token in local storage
            if (action.payload.data?.token) {
                localStorage.setItem("token", action.payload.data.token);
                state.isAuthenticated = true;
            } else {
                state.isAuthenticated = false;
            }
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = new HttpRequestError(action.error.message!, 401);
        });
        builder.addCase(register.rejected, (state, action) => {
            console.log(action.error.message);
            state.error = new HttpRequestError(action.error.message!, 401);
        });
    }
});

export const selectIsAuthenticated = (state: RootState) => state.authenticationState.isAuthenticated;

export default authenticationSlice.reducer;