import {Navigation} from "@/components/navigation.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {useAppDispatch} from "@/hook.ts";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {userFormSchema} from "@/formSchema/user-form-schema.ts";
import AuthenticationForm from "@/pages/authentication/authentication-form.tsx";
import {AuthenticationResponse, ResponseCode} from "@/models/types/response.ts";
import {AuthenticationDTO} from "@/models/dto/authentication/authenticationDTO.ts";
import {login} from "@/features/authentication-slice.ts";

export default function LoginPage() {
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
            const resultAction = await dispatch(login(values));
            const response = resultAction.payload as AuthenticationResponse;

            if (response.code === ResponseCode.OK) {
                toast({
                    title: "Success",
                    description: "You have successfully logged in",
                    duration: 5000,
                });
                form.reset();
                navigate("/tasks");
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
    }
    return (
        <div className="p-8 bg-black min-h-screen text-gray-400">
            <div className="container flex flex-col gap-8">
                <Navigation/>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl text-white font-bold">
                            Login
                        </h1>
                        <p>Login to your account or <Link className="underline" to="/register">create a new one</Link></p>
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