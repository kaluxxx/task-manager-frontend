import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import {useEffect} from "react";
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import useWebSocket, {WebSocketMessage} from "@/hooks/useWebSocket.ts";
import {useAppDispatch} from "@/hook.ts";
import {activate} from "@/features/account-slice.ts";

interface PasswordModalProps {
    accountId: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const phoneCodeFormSchema = z.object({
    phoneCode: z.string().min(1, "Phone code is required"),
});

export default function PhoneCodeDialog({
    accountId,
    isOpen,
    setIsOpen,
}: PasswordModalProps) {
    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const [ws, sendMessage, closeWebSocket] = useWebSocket(
        "ws://localhost:8080",
    );

    const form = useForm<z.infer<typeof phoneCodeFormSchema>>({
        resolver: zodResolver(phoneCodeFormSchema),
        defaultValues: {
            phoneCode: "",
        },
    });

    useEffect(() => {
        if (ws) {
            ws.onmessage = async (event) => {
                const data: WebSocketMessage = JSON.parse(event.data);
                if (data.type === "accountActivated") {
                    toast({
                        title: "Success",
                        description:
                            "Your account has been activated successfully.",
                        duration: 5000,
                    });
                    dispatch(activate(accountId));
                    setIsOpen(false);
                    closeWebSocket();
                } else if (data.type === "codeSend") {
                    toast({
                        title: "Success",
                        description:
                            "The code has been sent to your telegram account.",
                        duration: 5000,
                    });
                } else if (data.type === "error") {
                    toast({
                        title: "Error",
                        description: data.message,
                    });
                }
            };
        }
    }, [ws, toast]);

    const activeAccount = () => {
        sendMessage({type: "activateAccount", accountId});
    };

    const onSubmit = (values: z.infer<typeof phoneCodeFormSchema>) => {
        sendMessage({
            type: "verifyCode",
            accountId,
            phoneCode: values.phoneCode,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter your connexion code</DialogTitle>
                    <div className="flex flex-col gap-2">
                        <span className="text-gray-900 text-sm">
                            Telegram requires a connexion to activate their API.
                        </span>
                        <span className="text-gray-900 text-sm">
                            Click on the button below for telegram to send you a
                            connexion code.
                        </span>
                        <span className="text-gray-900 text-sm">
                            Then insert the connexion code that telegram just
                            sent you by message.
                        </span>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="phoneCode"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Connexion code
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="123456"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormItem className="flex justify-between items-center">
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={activeAccount}
                                    >
                                        Get connexion code
                                    </Button>
                                    <Button className="bg-zinc-900 text-white">
                                        Submit
                                    </Button>
                                </FormItem>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
