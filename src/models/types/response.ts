import {Account} from "@/models/models/account.ts";
import {Task} from "@/models/models/task.ts";

export enum ResponseCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}
export interface Response<T> {
    data?: T;
    message: string;
    code: number;
}

export interface TaskResponse extends Response<Task[] | Task> {
    data?: Task[] | Task;
}

export interface AccountResponse extends Response<Account[] | Account> {
    data?: Account[] | Account;
}

export interface AuthenticationResponse extends Response<{token: string}> {
    data?: {token: string};
}