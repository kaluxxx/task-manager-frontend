import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import {useFieldArray, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";

import {Navigation} from "@/components/navigation.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {addImage, createTask} from "@/features/task-slice.ts";
import {taskFormSchema} from "@/formSchema/task-form-schema.ts";
import {useAppDispatch, useAppSelector} from "@/hook.ts";
import {CreateTaskDTO} from "@/models/dto/task/createTaskDTO.ts";
import {ResponseCode, TaskResponse} from "@/models/types/response.ts";
import TaskForm from "@/pages/task/task-form.tsx";
import {getAccounts, selectAccounts} from "@/features/account-slice.ts";
import {useEffect, useState} from "react";
import {Task} from "@/models/models/task.ts";
import {Button} from "@/components/ui/button.tsx";

export default function TaskAddPage() {
    const [accountValues, setAccountValues] = useState<string[]>([]);
    const {toast} = useToast();
    const accounts = useAppSelector(selectAccounts);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof taskFormSchema>>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            name: "",
            accounts: [],
            channels: [{id: ""}],
            image: undefined,
            message: "",
            resendInterval: 10,
        },
    });

    const {fields, append, remove} = useFieldArray({
        name: "channels",
        control: form.control,
    });

    useEffect(() => {
        void dispatch(getAccounts());
    }, [dispatch]);

    const createNewTask = async (values: CreateTaskDTO) => {
        const createTaskResult = await dispatch(createTask(values));
        const response = createTaskResult.payload as TaskResponse;
        if (response.code !== ResponseCode.CREATED) {
            toast({title: "Error", description: response.message});
            return null;
        }
        return response.data as Task;
    };

    const addImageToTask = async (task: Task, image: File | undefined) => {
        if (!image) return;
        const formData = new FormData();
        formData.append("image", image);
        const addImageResult = await dispatch(addImage({id: task.id, formData}));
        const addImageResponse = addImageResult.payload as TaskResponse;
        if (addImageResponse.code !== ResponseCode.OK) {
            toast({title: "Error", description: addImageResponse.message});
        }
    };

    const handleSuccess = () => {
        toast({
            title: "Success",
            description: "The task has been created successfully",
            duration: 5000,
        });
        form.reset();
        navigate("/tasks");
    };

    const onSubmit = async (values: CreateTaskDTO) => {
        try {
            const task = await createNewTask(values);
            if (!task) return;
            await addImageToTask(task, values.image);
            handleSuccess();
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
                <Navigation/>
                {accounts.length === 0 &&
                    <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-lg">No accounts found</p>
                        <p className="text-sm">
                            You need to add an account before creating a task.
                        </p>
                        <div>
                            <Button asChild={true} className="border border-white">
                                <Link to="/accounts">Add an account</Link>
                            </Button>
                        </div>
                    </div>
                }
                {accounts.length > 0 &&
                    <>
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col justify-center">
                                <h1 className="text-3xl text-white font-bold">
                                    Add a new task !
                                </h1>
                                <p>Fill in the form below to add a new task.</p>
                            </div>
                            <div>
                                <Button asChild={true} className="border border-white">
                                    <Link to="/tasks">Back to tasks</Link>
                                </Button>
                            </div>
                        </div>
                        <Separator/>
                        <div className="">
                            <TaskForm
                                form={form}
                                onSubmit={onSubmit}
                                fields={fields}
                                append={append}
                                remove={remove}
                                accounts={accounts}
                                accountValues={accountValues}
                                setAccountValues={setAccountValues}
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
