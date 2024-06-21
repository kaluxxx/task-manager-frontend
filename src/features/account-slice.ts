import {
    AsyncThunk,
    PayloadAction,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import {HttpRequestError} from "@/lib/http-request-error.ts";
import {CreateAccountDto} from "@/models/dto/account/createAccountDto.ts";
import {UpdateAccountDTO} from "@/models/dto/account/updateAccountDTO.ts";
import {Account} from "@/models/models/account.ts";
import {AccountState} from "@/models/states/account-state.ts";
import {AccountResponse} from "@/models/types/response.ts";
import accountService from "@/service/account-service.ts";
import {RootState} from "@/store.ts";

export const getAccounts: AsyncThunk<AccountResponse, void, object> =
    createAsyncThunk(
        "account/getAccounts",
        async (): Promise<AccountResponse> => {
            return await accountService.getAll();
        },
    );

export const getAccount: AsyncThunk<AccountResponse, string, object> =
    createAsyncThunk(
        "account/getAccount",
        async (id: string): Promise<AccountResponse> => {
            return await accountService.get(id);
        },
    );

export const createAccount: AsyncThunk<
    AccountResponse,
    CreateAccountDto,
    object
> = createAsyncThunk(
    "account/createAccount",
    async (account: CreateAccountDto): Promise<AccountResponse> => {
        return await accountService.create(account);
    },
);

export const disableAccount: AsyncThunk<AccountResponse, string, object> =
    createAsyncThunk(
        "account/disableAccount",
        async (id: string): Promise<AccountResponse> => {
            return await accountService.disable(id);
        },
    );

export const updateAccount: AsyncThunk<
    AccountResponse,
    UpdateAccountDTO,
    object
> = createAsyncThunk(
    "account/updateAccount",
    async (account: UpdateAccountDTO): Promise<AccountResponse> => {
        return await accountService.update(account);
    },
);

export const deleteAccount: AsyncThunk<AccountResponse, string, object> =
    createAsyncThunk(
        "account/deleteAccount",
        async (id: string): Promise<AccountResponse> => {
            return await accountService.delete(id);
        },
    );

const initialState: AccountState = {
    accounts: [],
    account: null,
    error: null,
    loading: {
        accounts: false,
        account: false,
    },
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        activate(state, action: PayloadAction<string>) {
            const id = action.payload;
            state.accounts = state.accounts.map((account) =>
                account.id === id
                    ? {
                          ...account,
                          isActivated: true,
                      }
                    : account,
            );
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAccounts.pending, (state) => {
            state.loading.accounts = true;
        });
        builder.addCase(
            getAccounts.fulfilled,
            (state, action: PayloadAction<AccountResponse>) => {
                state.loading.accounts = false;
                state.accounts = action.payload.data as Account[];
            },
        );
        builder.addCase(getAccounts.rejected, (state, action) => {
            const {message, code} = JSON.parse(action.error.message!) as {
                message: string;
                code: number;
            };
            state.error = new HttpRequestError(message, code);
        });
        builder.addCase(getAccount.pending, (state) => {
            state.loading.account = true;
        });
        builder.addCase(
            getAccount.fulfilled,
            (state, action: PayloadAction<AccountResponse>) => {
                state.loading.account = false;
                state.account = action.payload.data as Account;
            },
        );
        builder.addCase(getAccount.rejected, (state, action) => {
            const {message, code} = JSON.parse(action.error.message!) as {
                message: string;
                code: number;
            };
            state.error = new HttpRequestError(message, code);
        });
        builder.addCase(createAccount.pending, (state) => {
            state.loading.account = true;
        });
        builder.addCase(
            createAccount.fulfilled,
            (state, action: PayloadAction<AccountResponse>) => {
                state.loading.account = false;
                state.accounts = [
                    ...state.accounts,
                    action.payload.data as Account,
                ];
            },
        );
        builder.addCase(createAccount.rejected, (state, action) => {
            const {message, code} = JSON.parse(action.error.message!) as {
                message: string;
                code: number;
            };
            state.error = new HttpRequestError(message, code);
        });
        builder.addCase(updateAccount.pending, (state) => {
            state.loading.account = true;
        });
        builder.addCase(
            updateAccount.fulfilled,
            (state, action: PayloadAction<AccountResponse>) => {
                state.loading.account = false;
                state.account = action.payload.data as Account;
                state.accounts = state.accounts.map((account) =>
                    account.id === state.account?.id ? state.account : account,
                );
            },
        );
        builder.addCase(updateAccount.rejected, (state, action) => {
            const {message, code} = JSON.parse(action.error.message!) as {
                message: string;
                code: number;
            };
            state.error = new HttpRequestError(message, code);
        });
        builder.addCase(
            disableAccount.fulfilled,
            (state, action: PayloadAction<AccountResponse>) => {
                state.account = action.payload.data as Account;
                state.accounts = state.accounts.map((account) =>
                    account.id === state.account?.id ? state.account : account,
                );
            },
        );
        builder.addCase(deleteAccount.pending, (state, action) => {
            const id = action.meta.arg;
            const deletedAccount = state.accounts.find(
                (account) => account.id === id,
            );
            if (deletedAccount) {
                state.account = deletedAccount;
            }
            state.accounts = state.accounts.filter(
                (account) => account.id !== state.account?.id,
            );
        });
        builder.addCase(deleteAccount.fulfilled, (state) => {
            state.account = null;
        });
    },
});

export const selectAccounts = (state: RootState) => state.accountState.accounts;
export const selectAccount = (state: RootState) => state.accountState.account;
export const selectAccountsLoading = (state: RootState) =>
    state.accountState.loading.accounts;
export const selectAccountLoading = (state: RootState) =>
    state.accountState.loading.account;

export const { activate } = accountSlice.actions;

export default accountSlice.reducer;
