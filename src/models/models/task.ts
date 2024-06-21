import {Account} from "@/models/models/account.ts";
import {Image} from "@/models/models/image.ts";

export type Task = {
    id: string;
    name: string;
    accounts: Account[];
    channels: { id: string }[];
    image?: File | Image;
    message: string;
    isRunning: boolean;
    resendInterval: number;
};
