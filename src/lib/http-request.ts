// httpRequest.ts
import {HttpRequestError} from "@/lib/http-request-error.ts";
import {RequestParams} from "@/models/types/request-params.ts";
import {Response} from "@/models/types/response.ts";

const updateOptions = (options: RequestInit): RequestInit => {
    const updatedOptions = {...options};
    const token = localStorage.getItem("token");
    if (token) {
        updatedOptions.headers = {
            ...updatedOptions.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return updatedOptions;
};

const sendRequest = async <T>(
    {
        url,
        method,
        body,
    }: RequestParams
): Promise<Response<T>> => {
    const options: RequestInit = {
        method,
        headers: {},
    };


    if (body instanceof FormData) {
        options.body = body;
    } else {
        options.headers = {
            ...options.headers,
            "Content-Type": "application/json",
        };
        options.body = body ? JSON.stringify(body) : undefined;
    }


    const response = await fetch(url, updateOptions(options));

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new HttpRequestError(
            errorResponse.message || response.statusText,
            response.status,
        );
    }

    if (method === "DELETE") {
        return {
            message: response.statusText,
            code: response.status,
        };
    }

    const data = (await response.json()) as T;
    return {
        data: data ? data : undefined,
        message: response.statusText,
        code: response.status,
    };
};

const httpRequest = {
    post: <T>(params: RequestParams): Promise<Response<T>> =>
        sendRequest<T>({...params, method: "POST"}),
    get: <T>(params: RequestParams): Promise<Response<T>> =>
        sendRequest<T>({...params, method: "GET"}),
    put: <T>(params: RequestParams): Promise<Response<T>> =>
        sendRequest<T>({...params, method: "PUT"}),
    delete: <T>(params: RequestParams): Promise<Response<T>> =>
        sendRequest<T>({...params, method: "DELETE"}),
};

export default httpRequest;
export {HttpRequestError};
