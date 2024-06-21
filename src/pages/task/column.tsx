import {ColumnDef} from "@tanstack/react-table";

import {Badge} from "@/components/ui/badge.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Task} from "@/models/models/task.ts";
import ActionsCell from "@/components/actions-cell.tsx";
import {deleteTask, startTask, stopTask} from "@/features/task-slice.ts";
import SwitchCell from "@/components/switch-cell.tsx";

export const taskColumns: ColumnDef<Task>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "accounts",
        header: "Accounts",
        cell: ({row}) => {
            const accounts = row.original.accounts
            return (
                <div>
                    {accounts.map((account, index) => (
                        <Badge
                            key={index}
                            className="mr-2 bg-white text-black hover:bg-black hover:text-white"
                        >
                            {account.username}
                        </Badge>
                    ))}
                </div>
            )
        }
    },
    {
        accessorKey: "channels",
        header: "Channels",
        cell: ({row}) => {
            const channels = row.original.channels;
            return (
                <div>
                    {channels.map((channel, index) => (
                        <Badge
                            key={index}
                            className="mr-2 bg-white text-black hover:bg-black hover:text-white"
                        >
                            {channel.id}
                        </Badge>
                    ))}
                </div>
            );
        }
    },
    {
        accessorKey: "resendInterval",
        header: "Resend Interval",
        cell: ({row}) => {
            return (
                <div>{row.getValue("resendInterval")} minutes</div>
            );
        }
    },
    {
        accessorKey: "isRunning",
        header: "Is Running",
        cell: ({row}) => {
            const {id, isRunning} = row.original;

            const action = {
                label: isRunning ? "Task stopping" : "Task starting",
                action: isRunning ? stopTask : startTask,
                params: id,
            }

            return (
                <div className="flex items-center">
                    <SwitchCell
                        id={id}
                        value={isRunning}
                        action={action}
                    />
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const {id} = row.original;
            const actions = [
                {
                    label: "Edit task",
                    type: "edit",
                    path: `/tasks/${id}/update`,
                },
                {
                    label: "Delete task",
                    type: "delete",
                    action: deleteTask,
                    params: id,
                },
            ];
            return <ActionsCell actions={actions} />
        },
    },
];
