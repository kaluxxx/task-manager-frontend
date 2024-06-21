"use client";

import {z} from "zod";

export const taskFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    accounts: z.array(
        z.object({
            id: z.string()
        }).required()
    ).nonempty("Account is required"),
    channels: z.array(
        z.object({
            id: z.string().min(1, "Channel is required"),
        })
    ),
    message: z.string().min(1, "Message is required"),
    image: z.any().optional(),
    resendInterval: z.number().min(1, "Resend interval is required"),
});
