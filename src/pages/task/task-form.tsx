import {z} from "zod";

import {UseFormReturn} from "react-hook-form";

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
import {taskFormSchema} from "@/formSchema/task-form-schema.ts";
import {Account} from "@/models/models/account.ts";
import {useEffect, useState} from "react";
import {SelectMultiple} from "@/components/select-multiple.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Task} from "@/models/models/task.ts";

interface TaskFormProps {
    form: UseFormReturn<z.infer<typeof taskFormSchema>>;
    accountValues: string[];
    setAccountValues: (values: string[]) => void;
    fields: any
    append: any
    remove: any
    onSubmit: (values: z.infer<typeof taskFormSchema>) => void;
    accounts: Account[];
    task?: Task;
}

export default function TaskForm({
                                     form,
                                     fields,
                                     append,
                                     remove,
                                     onSubmit,
                                     accounts,
                                     task,
                                     accountValues,
                                     setAccountValues
                                 }: TaskFormProps) {
    const [open, setOpen] = useState(false)
    const options = accounts.map((account) => ({
        value: account.id,
        label: account.username,
    }));

    useEffect(() => {
        if (accountValues.length > 0) {
            const accounts = accountValues.map((id) => ({id: id}));
            form.resetField("accounts")
            form.setValue("accounts", accounts as [{ id: string }, ...{ id: string }[]]);
        } else {
            form.resetField("accounts")
        }
    }, [accountValues, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col md:flex-row items-start gap-4 w-full">
                    <div className="flex flex-col gap-4 w-full md:w-1/2">
                        <FormField
                            control={form.control}
                            name="accounts"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Accounts</FormLabel>
                                    <FormControl>
                                        <SelectMultiple
                                            options={options}
                                            setFormValue={setAccountValues}
                                            formValue={accountValues}
                                            open={open}
                                            setOpen={setOpen}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 capitalize"/>
                                </FormItem>
                            )}
                        />
                        {fields.map((_: never, index: number) => {
                            return (
                                <FormField
                                    control={form.control}
                                    key={index}
                                    name={`channels.${index}.id`}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Channel ID</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500 capitalize"/>
                                        </FormItem>
                                    )}
                                />
                            );
                        })}
                        <FormField
                            name="channels"
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    append({channelId: ""});
                                                }}
                                                className="bg-zinc-800 text-white hover:bg-white hover:text-black"
                                            >
                                                Add Channel
                                            </Button>
                                            {fields.length > 1 && (
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        if (fields.length > 1) remove(fields.length - 1);
                                                    }}
                                                    className="bg-red-500 text-white hover:bg-white hover:text-black"
                                                >
                                                    Remove Channel
                                                </Button>
                                            )}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="resendInterval"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Resend Interval</FormLabel>
                                    <FormDescription>
                                        The interval in minutes to resend the message
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="1"  {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                form.setValue("resendInterval", Number(e.target.value));
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full md:w-1/2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Task name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-col gap-4">
                                            <Input
                                                type="file"
                                                id="image"
                                                onChange={(e) => {
                                                    if (!e.target.files) return;
                                                    form.setValue("image", e.target.files[0]);
                                                }}
                                            />
                                            {(form.getValues("image") instanceof File) && (
                                                <img
                                                    src={URL.createObjectURL(form.getValues("image"))}
                                                    alt="task"
                                                    className="w-20 h-20 object-cover"
                                                />
                                            )}
                                            {!(form.getValues("image") instanceof File)
                                                && task
                                                && task.image
                                                && !(task.image instanceof File)
                                                && (
                                                    <img
                                                        src={`data:image/jpeg;base64,${task.image.data as string}`}
                                                        alt="task image"
                                                        className="w-20 h-20 object-cover"
                                                    />
                                                )}
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Task message"
                                            rows={5}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription/>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
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
