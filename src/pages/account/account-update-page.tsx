import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate, useParams} from "react-router-dom";

import {Navigation} from "@/components/navigation.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {
    getAccount,
    selectAccount,
    updateAccount,
} from "@/features/account-slice.ts";
import {accountFormSchema} from "@/formSchema/account-form-schema.ts";
import {useAppDispatch, useAppSelector} from "@/hook.ts";
import {UpdateAccountDTO} from "@/models/dto/account/updateAccountDTO.ts";
import {AccountResponse, ResponseCode} from "@/models/types/response.ts";
import AccountForm from "@/pages/account/account-form.tsx";

export default function AccountUpdatePage() {
    const {id} = useParams();
    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const account = useAppSelector(selectAccount);

    const form = useForm<z.infer<typeof accountFormSchema>>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            id: "",
            phoneNumber: "",
            apiId: "",
            apiHash: "",
        },
    });

    useEffect(() => {
        if (!id) {
            return;
        }

        void dispatch(getAccount(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (account) {
            form.reset(account);
        }
    }, [account, form]);

    const onSubmit = async (values: UpdateAccountDTO) => {
        try {
            const resultAction = await dispatch(updateAccount(values));
            const response = resultAction.payload as AccountResponse;

            if (response.code === ResponseCode.OK) {
                toast({
                    title: "Account updated",
                    description: "The account has been updated successfully",
                    duration: 5000,
                });
                form.reset();
                navigate("/accounts");
            } else {
                toast({title: "Error", description: response.message});
            }
        } catch (error) {
            if (error instanceof Error) {
                toast({title: "Error", description: error.message});
            } else {
                toast({
                    title: "Error",
                    description: "An unknown error occurred",
                });
            }
        }
    };

    return (
        <div className="p-8 bg-black min-h-screen text-gray-400">
            <div className="container flex flex-col gap-8">
                <Navigation />
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl text-white font-bold">
                            Update an account !
                        </h1>
                        <p>Fill in the form below to update an account.</p>
                    </div>
                    <div>
                        <Button asChild={true} className="border border-white">
                            <Link to="/accounts">Back to accounts</Link>
                        </Button>
                    </div>
                </div>
                <Separator />
                <div className="max-w-xs">
                    <AccountForm form={form} onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
}
