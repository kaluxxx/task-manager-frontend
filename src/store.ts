import {configureStore} from "@reduxjs/toolkit";

import {accountSlice} from "@/features/account-slice.ts";
import {taskSlice} from "@/features/task-slice.ts";
import {authenticationSlice} from "@/features/authentication-slice.ts";

export const store = configureStore({
    reducer: {
        accountState: accountSlice.reducer,
        taskState: taskSlice.reducer,
        authenticationState: authenticationSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
