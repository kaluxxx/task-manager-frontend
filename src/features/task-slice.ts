import {AsyncThunk, createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {CreateTaskDTO} from "@/models/dto/task/createTaskDTO.ts";
import {UpdateTaskDTO} from "@/models/dto/task/updateTaskDTO.ts";
import {Task} from "@/models/models/task.ts";
import {TaskState} from "@/models/states/task-state.ts";
import {TaskResponse} from "@/models/types/response.ts";
import taskService from "@/service/task-service.ts";
import {RootState} from "@/store.ts";

export const getTasks: AsyncThunk<TaskResponse, void, object> =
    createAsyncThunk("task/getTasks", async (): Promise<TaskResponse> => {
        return await taskService.getAll();
    });

export const getTask: AsyncThunk<TaskResponse, string, object> =
    createAsyncThunk(
        "task/getTask",
        async (id: string): Promise<TaskResponse> => {
            return await taskService.get(id);
        },
    );

export const createTask: AsyncThunk<TaskResponse, CreateTaskDTO, object> =
    createAsyncThunk(
        "task/createTask",
        async (task: CreateTaskDTO): Promise<TaskResponse> => {
            return await taskService.create(task);
        },
    );

export const addImage: AsyncThunk<TaskResponse, { id: string, formData: FormData }, object> =
    createAsyncThunk(
        "task/addImage",
        async ({id, formData}): Promise<TaskResponse> => {
            return await taskService.addImage(id, formData);
        },
    );

export const updateImage: AsyncThunk<TaskResponse, { id: string, formData: FormData }, object> =
    createAsyncThunk(
        "task/updateImage",
        async ({id, formData}): Promise<TaskResponse> => {
            return await taskService.updateImage(id, formData);
        },
    );

export const updateTask: AsyncThunk<TaskResponse, UpdateTaskDTO, object> =
    createAsyncThunk(
        "task/updateTask",
        async (task: UpdateTaskDTO): Promise<TaskResponse> => {
            return await taskService.update(task);
        },
    );

export const deleteTask: AsyncThunk<TaskResponse, string, object> =
    createAsyncThunk(
        "task/deleteTask",
        async (id: string): Promise<TaskResponse> => {
            return await taskService.delete(id);
        },
    );

export const startTask: AsyncThunk<TaskResponse, string, object> =
    createAsyncThunk(
        "task/startTask",
        async (id: string): Promise<TaskResponse> => {
            return await taskService.startTask(id);
        },
    );

export const stopTask: AsyncThunk<TaskResponse, string, object> =
    createAsyncThunk(
        "task/stopTask",
        async (id: string): Promise<TaskResponse> => {
            return await taskService.stopTask(id);
        },
    );

const initialState: TaskState = {
    tasks: [],
    task: null,
    loading: {
        tasks: false,
        task: false,
    },
    error: null,
};

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state) => {
            state.loading.tasks = true;
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.loading.tasks = false;
            state.tasks = action.payload.data as Task[];
        });
        builder.addCase(getTask.pending, (state) => {
            state.loading.task = true;
        });
        builder.addCase(getTask.fulfilled, (state, action) => {
            state.loading.task = false;
            state.task = action.payload.data as Task;
        });
        builder.addCase(createTask.pending, (state) => {
            state.loading.task = true;
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.loading.task = false;
            state.tasks = [...state.tasks, action.payload.data as Task];
        });
        builder.addCase(updateTask.pending, (state) => {
            state.loading.task = true;
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.loading.task = false;
            state.task = action.payload.data as Task;
            state.tasks = state.tasks.map((task) =>
                task.id === state.task?.id ? state.task : task,
            );
        });
        builder.addCase(deleteTask.pending, (state, action) => {
            const id = action.meta.arg;
            const deletedTask = state.tasks.find((task) => task.id === id);
            if (deletedTask) {
                state.task = deletedTask;
            }

            state.tasks = state.tasks.filter((task) => task.id !== id);

            state.loading.task = false;
        });
        builder.addCase(deleteTask.rejected, (state) => {
            state.tasks = [...state.tasks, state.task as Task];
        });
        builder.addCase(addImage.fulfilled, (state, action) => {
            state.task = action.payload.data as Task;
            state.tasks = state.tasks.map((task) =>
                task.id === state.task?.id ? state.task : task,
            );
        });
        builder.addCase(updateImage.fulfilled, (state, action) => {
            state.task = action.payload.data as Task;
            state.tasks = state.tasks.map((task) =>
                task.id === state.task?.id ? state.task : task,
            );
        });
        builder.addCase(startTask.fulfilled, (state, action) => {
            state.task = action.payload.data as Task;
            console.log("Task", state.task)
            state.tasks = state.tasks.map((task) =>
                task.id === state.task?.id ? state.task : task,
            );
        });
        builder.addCase(stopTask.fulfilled, (state, action) => {
            state.task = action.payload.data as Task;
            state.tasks = state.tasks.map((task) =>
                task.id === state.task?.id ? state.task : task,
            );
        });
    },
});

export const selectTasks = (state: RootState) => state.taskState.tasks;
export const selectTask = (state: RootState) => state.taskState.task;
export const selectTasksLoading = (state: RootState) =>
    state.taskState.loading.tasks;
export const selectTaskLoading = (state: RootState) =>
    state.taskState.loading.task;

export default taskSlice.reducer;
