import {Table} from "@tanstack/react-table";
import {Settings2} from "lucide-react";

import {ReactNode} from "react";

import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

interface FilterBarProps<TData> {
    table: Table<TData>;
    searchInput: ReactNode;
}

export default function FilterBar<TData>({
    table,
    searchInput,
}: FilterBarProps<TData>) {
    return (
        <>
            {searchInput}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="ml-auto border border-white">
                        <Settings2 className="w-4 h-4 mr-2 shrink-0" /> Column
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
