import {z} from "zod";

import {UseFormReturn} from "react-hook-form";

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
import {accountFormSchema} from "@/formSchema/account-form-schema.ts";

interface AccountFormProps {
    form: UseFormReturn<z.infer<typeof accountFormSchema>>;
    onSubmit: (values: z.infer<typeof accountFormSchema>) => void;
}

export default function AccountForm({form, onSubmit}: AccountFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+1234567890" {...field} />
                            </FormControl>
                            <FormDescription>
                                <small>
                                    Enter your phone number with the country
                                    code. (e.g. +1234567890)
                                </small>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apiId"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>API ID</FormLabel>
                            <FormControl>
                                <Input placeholder="1234567" {...field} />
                            </FormControl>
                            <FormDescription>
                                <small>Enter your API ID.</small>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apiHash"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>API Hash</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="1234567890abcdef1234567890abcdef"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                <small>Enter your API Hash.</small>
                            </FormDescription>
                            <FormMessage />
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
