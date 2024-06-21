
export interface UpdateTaskDTO {
    id?: string;
    name?: string;
    accounts?: { id: string }[];
    channels: { id: string }[];
    image?: File;
    message?: string;
    resendInterval?: number;
}
