import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {userFormSchema} from "@/formSchema/user-form-schema.ts";
import {Button} from "@/components/ui/button.tsx";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

interface AuthenticationFormProps {
    form: UseFormReturn<z.infer<typeof userFormSchema>>;
    onSubmit: (values: z.infer<typeof userFormSchema>) => void;
}

export default function AuthenticationForm({form, onSubmit}: AuthenticationFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormDescription>
                                <small>Enter your username.</small>
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                <small>Enter your password.</small>
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex justify-end w-full gap-4">
                    <Button
                        type="submit"
                        className="bg-zinc-800 text-white hover:bg-white hover:text-black"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}