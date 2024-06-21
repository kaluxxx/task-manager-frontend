import {z} from "zod";

export const accountFormSchema = z.object({
    //id is optional because it is not required for creating a new account
    id: z.string().optional(),
    phoneNumber: z.string().regex(/^\+\d{10,14}$/),
    apiId: z.string(),
    apiHash: z.string(),
});
