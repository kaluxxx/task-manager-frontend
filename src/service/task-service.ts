import {TASK_URL} from "@/config/api-config.ts";
import httpRequest from "@/lib/http-request.ts";
import {CreateTaskDTO} from "@/models/dto/task/createTaskDTO.ts";
import {UpdateTaskDTO} from "@/models/dto/task/updateTaskDTO.ts";
import {TaskResponse} from "@/models/types/response.ts";

const taskService = {
    getAll: (): Promise<TaskResponse> => httpRequest.get({url: TASK_URL}),
    get: (id: string): Promise<TaskResponse> =>
        httpRequest.get({url: `${TASK_URL}/${id}`}),
    create: (task: CreateTaskDTO): Promise<TaskResponse> =>
        httpRequest.post({url: TASK_URL, body: task}),
    update: (task: UpdateTaskDTO): Promise<TaskResponse> =>
        httpRequest.put({
            url: `${TASK_URL}/${task.id}`,
            body: task,
        }),
    delete: (id: string): Promise<TaskResponse> =>
        httpRequest.delete({url: `${TASK_URL}/${id}`}),
    addImage: (id: string, formData: FormData): Promise<TaskResponse> =>
        httpRequest.post({url: `${TASK_URL}/image/${id}`, body: formData}),
    updateImage: (id: string, formData: FormData): Promise<TaskResponse> =>
        httpRequest.put({url: `${TASK_URL}/image/${id}`, body: formData}),
    startTask: (id: string): Promise<TaskResponse> =>
        httpRequest.post({url: `${TASK_URL}/start/${id}`}),
    stopTask: (id: string): Promise<TaskResponse> =>
        httpRequest.post({url: `${TASK_URL}/stop/${id}`}),

};

export default taskService;
