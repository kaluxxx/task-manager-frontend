import {Task} from "@/models/models/task.ts";
import {RootState} from "@/models/states/root-state.ts";

export interface TaskState extends RootState {
    task: Task | null;
    tasks: Task[] | [];
    loading: {
        task: boolean;
        tasks: boolean;
    };
}
