type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestParams {
    url: string;
    method?: Method;
    body?: unknown;
}
