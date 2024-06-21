import {ColumnDef} from "@tanstack/react-table";

import AccountActionsCell from "@/components/account-actions-cell.tsx";
import HiddenCell from "@/components/hidden-cell.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Account} from "@/models/models/account.ts";
import {deleteAccount, disableAccount} from "@/features/account-slice.ts";

export const accountColumns: ColumnDef<Account>[] = [
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
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        id: "username",
        accessorKey: "username",
        header: "Username",
    },
    {
        id: "apiId",
        accessorKey: "apiId",
        header: "API ID",
    },
    {
        id: "apiHash",
        accessorKey: "apiHash",
        header: "API Hash",
        cell: ({row}) => <HiddenCell value={row.original.apiHash} />,
    },
    {
        id: "Is Activated",
        accessorKey: "isActivated",
        header: "Is Activated",
        // use a Bagde component to display the value
        cell: ({row}) => {
            const {isActivated} = row.original;
            return (
                <Badge variant={isActivated ? "secondary" : "destructive"}>
                    {isActivated ? "Yes" : "No"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const {id, isActivated} = row.original;
            const actions = [
                {
                    label: isActivated ? "Disable account" : "Activate account",
                    type: isActivated ? "disable" : "activate",
                    action: isActivated ? disableAccount : null,
                    params: id,
                },
                {
                    label: "Edit account",
                    type: "edit",
                    path: `/accounts/${id}/update`,
                },
                {
                    label: "Delete account",
                    type: "delete",
                    action: deleteAccount,
                    params: id,
                },
            ];
            return <AccountActionsCell id={id} actions={actions} />;
        },
    },
];
