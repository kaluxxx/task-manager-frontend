import {HttpRequestError} from "@/lib/http-request-error.ts";

export interface RootState {
    error: HttpRequestError | null;
    loading: object;
}
