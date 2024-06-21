import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {Link, useNavigate, useParams} from "react-router-dom";

import {Navigation} from "@/components/navigation.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {
    getAccounts,
    selectAccounts
} from "@/features/account-slice.ts";
import {useAppDispatch, useAppSelector} from "@/hook.ts";
import {ResponseCode, TaskResponse} from "@/models/types/response.ts";
import {taskFormSchema} from "@/formSchema/task-form-schema.ts";
import {getTask, selectTask, updateImage, updateTask} from "@/features/task-slice.ts";
import {UpdateTaskDTO} from "@/models/dto/task/updateTaskDTO.ts";
import TaskForm from "@/pages/task/task-form.tsx";
import {Task} from "@/models/models/task.ts";

export default function TaskUpdatePage() {
    const [accountValues, setAccountValues] = useState<string[]>([]);
    const {id} = useParams();
    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const accounts = useAppSelector(selectAccounts);
    const task = useAppSelector(selectTask);

    const form = useForm<z.infer<typeof taskFormSchema>>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            name: "",
            accounts: [],
            channels: [],
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
        if (accounts.length === 0) {
            void dispatch(getAccounts());
        }
    }, [accounts, dispatch]);

    useEffect(() => {
        if (!id) {
            return;
        }

        void dispatch(getTask(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (task) {
            form.reset(task);
            setAccountValues(task.accounts.map((account) => account.id));
        }
    }, [task, form]);

    const updateExistingTask = async (values: UpdateTaskDTO) => {
        const updateTaskResult = await dispatch(updateTask(values));
        const response = updateTaskResult.payload as TaskResponse;
        if (response.code !== ResponseCode.OK) {
            toast({title: "Error", description: response.message});
            return null;
        }
        return response.data as Task;
    }

    const updateTaskImage = async (task: Task, image: File | undefined) => {
        if (!image) return;
        const formData = new FormData();
        formData.append("image", image);
        const updateImageResult = await dispatch(updateImage({id: task.id, formData}));
        const updateImageResponse = updateImageResult.payload as TaskResponse;
        if (updateImageResponse.code !== ResponseCode.OK) {
            toast({title: "Error", description: updateImageResponse.message});
        }
    }

    const handleSuccess = () => {
        toast({
            title: "Success",
            description: "The task has been updated successfully",
            duration: 5000,
        });
        form.reset();
        navigate("/tasks");
    }

    const onSubmit = async (values: UpdateTaskDTO) => {
        try {
            const image = values.image;
            delete values.image;

            const task = await updateExistingTask(values);
            if (!task) return;
            if (image instanceof File) {
                await updateTaskImage(task, image);
            }
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
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl text-white font-bold">
                            Update a task !
                        </h1>
                        <p>Fill in the form below to update a task.</p>
                    </div>
                    <div>
                        <Button asChild={true} className="border border-white">
                            <Link to="/tasks">Back to tasks</Link>
                        </Button>
                    </div>
                </div>
                <Separator/>
                <div>
                    {task && (
                        <TaskForm
                            form={form}
                            onSubmit={onSubmit}
                            fields={fields}
                            append={append}
                            remove={remove}
                            accounts={accounts}
                            accountValues={accountValues}
                            setAccountValues={setAccountValues}
                            task={task}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
