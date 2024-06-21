// accountService.ts
import {ACCOUNT_URL} from "@/config/api-config.ts";
import httpRequest, {HttpRequestError} from "@/lib/http-request.ts";
import {CreateAccountDto} from "@/models/dto/account/createAccountDto.ts";
import {UpdateAccountDTO} from "@/models/dto/account/updateAccountDTO.ts";
import {AccountResponse} from "@/models/types/response.ts";

const accountService = {
    getAll: async (): Promise<AccountResponse> =>
        httpRequest.get({url: ACCOUNT_URL}),
    get: async (id: string): Promise<AccountResponse> =>
        httpRequest.get({url: `${ACCOUNT_URL}/${id}`}),
    create: async (account: CreateAccountDto): Promise<AccountResponse> => {
        try {
            return await httpRequest.post({url: ACCOUNT_URL, body: account});
        } catch (error) {
            if (error instanceof HttpRequestError) {
                throw new Error(error.message);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    },
    disable: async (id: string): Promise<AccountResponse> => {
        try {
            return await httpRequest.put({url: `${ACCOUNT_URL}/disable/${id}`});
        } catch (error) {
            if (error instanceof HttpRequestError) {
                throw new Error(error.message);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    },
    verifyCode: async (code: string): Promise<AccountResponse> => {
        try {
            return await httpRequest.post({
                url: `${ACCOUNT_URL}/verify`,
                body: {code},
            });
        } catch (error) {
            if (error instanceof HttpRequestError) {
                throw new Error(error.message);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    },
    update: async (account: UpdateAccountDTO): Promise<AccountResponse> =>
        httpRequest.put({
            url: `${ACCOUNT_URL}/${account.id}`,
            body: account,
        }),
    delete: async (id: string): Promise<AccountResponse> =>
        httpRequest.delete({url: `${ACCOUNT_URL}/${id}`}),
};

export default accountService;
