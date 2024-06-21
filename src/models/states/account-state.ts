import {Account} from "@/models/models/account.ts";
import {RootState} from "@/models/states/root-state.ts";

export interface AccountState extends RootState {
    account: Account | null;
    accounts: Account[] | [];
    loading: {
        account: boolean;
        accounts: boolean;
    };
}
