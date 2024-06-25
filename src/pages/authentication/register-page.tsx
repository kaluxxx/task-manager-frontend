import {Navigation} from "@/components/navigation.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {useAppDispatch} from "@/hook.ts";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {userFormSchema} from "@/formSchema/user-form-schema.ts";
import AuthenticationForm from "@/pages/authentication/authentication-form.tsx";
import {AuthenticationResponse, ResponseCode} from "@/models/types/response.ts";
import {AuthenticationDTO} from "@/models/dto/authentication/authenticationDTO.ts";
import {register} from "@/features/authentication-slice.ts";

export default function RegisterPage() {
    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof userFormSchema>>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (values: AuthenticationDTO) => {
        try {
            const resultAction = await dispatch(register(values)) as any;
            const response: AuthenticationResponse = resultAction.payload;
            const error = resultAction.error as Error;
            if (error) {
                throw error;
            }

            if (response.code === ResponseCode.CREATED) {
                toast({
                    title: "Account created",
                    description: "The account has been created successfully",
                    duration: 5000,
                });
                form.reset();
                navigate("/accounts");
            } else {
                toast({title: "Error", description: response.message});
            }
        } catch (error) {
            const message = (error as Error).message;
            toast({title: "Error", description: message});
        }
    }
    return (
        <div className="p-8 bg-black min-h-screen text-gray-400">
            <div className="container flex flex-col gap-8">
                <Navigation/>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl text-white font-bold">
                            Register
                        </h1>
                        <p>Register a new account</p>
                    </div>
                </div>
                <Separator/>
                <div className="max-w-xs">
                    <AuthenticationForm form={form} onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    );
}