import {Plus} from "lucide-react";

import {useEffect} from "react";
import {Link} from "react-router-dom";

import {DataTable} from "@/components/data-table.tsx";
import FilterBar from "@/components/filter-bar.tsx";
import {Navigation} from "@/components/navigation.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    getTasks,
    selectTasks,
    selectTasksLoading,
} from "@/features/task-slice.ts";
import {useAppDispatch, useAppSelector} from "@/hook.ts";
import {taskColumns} from "@/pages/task/column.tsx";

export default function TaskListPage() {
    const tasksLoading = useAppSelector(selectTasksLoading);
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(getTasks());
    }, [dispatch]);

    return (
        <div className="p-8 bg-black min-h-screen text-gray-400">
            <div className="container flex flex-col gap-8">
                <Navigation />
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl text-white font-bold">
                            Welcome back !
                        </h1>
                        <p>Here's a list of your shill tasks !</p>
                    </div>
                </div>
                <DataTable
                    columns={taskColumns}
                    data={tasks}
                    isLoading={tasksLoading}
                    filterBar={(table) => (
                        <FilterBar
                            table={table}
                            searchInput={
                                <Input
                                    placeholder="Filter task name..."
                                    value={
                                        (table
                                            .getColumn("name")
                                            ?.getFilterValue() as string) ?? ""
                                    }
                                    onChange={(event) =>
                                        table
                                            .getColumn("name")
                                            ?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
                            }
                        />
                    )}
                    addButton={
                        <Button className="border border-white">
                            <Link to="/tasks/new" className="flex items-center">
                                <Plus className="w-4 h-4 mr-2 shrink-0" />
                                Create task
                            </Link>
                        </Button>
                    }
                />
            </div>
        </div>
    );
}
