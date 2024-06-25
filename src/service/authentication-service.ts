import httpRequest from "@/lib/http-request.ts";
import {LOGIN_URL, REGISTER_URL} from "@/config/api-config.ts";
import {AuthenticationResponse} from "@/models/types/response.ts";
import {AuthenticationDTO} from "@/models/dto/authentication/authenticationDTO.ts";

const authenticationService = {
register: async (account: AuthenticationDTO):  Promise<AuthenticationResponse> => httpRequest.post({url: REGISTER_URL, body: account}),
login: async (account: AuthenticationDTO):  Promise<AuthenticationResponse>  => httpRequest.post({url: LOGIN_URL, body: account}),
};

export default authenticationService;