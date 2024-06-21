import {Plus} from "lucide-react";

import {useEffect} from "react";
import {Link} from "react-router-dom";

import {DataTable} from "@/components/data-table.tsx";
import FilterBar from "@/components/filter-bar.tsx";
import {Navigation} from "@/components/navigation.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    getAccounts,
    selectAccounts,
    selectAccountsLoading,
} from "@/features/account-slice.ts";
import {useAppDispatch, useAppSelector} from "@/hook.ts";
import {accountColumns} from "@/pages/account/column.tsx";

export default function AccountListPage() {
    const accountsLoading = useAppSelector(selectAccountsLoading);
    const accounts = useAppSelector(selectAccounts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(getAccounts());
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
                        <p>Here's a list of your telegram accounts !</p>
                    </div>
                </div>
                <DataTable
                    columns={accountColumns}
                    data={accounts}
                    isLoading={accountsLoading}
                    filterBar={(table) => (
                        <FilterBar
                            table={table}
                            searchInput={
                                <Input
                                    placeholder="Filter by username..."
                                    value={
                                        (table
                                            .getColumn("username")
                                            ?.getFilterValue() as string) ?? ""
                                    }
                                    onChange={(event) =>
                                        table
                                            .getColumn("username")
                                            ?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
                            }
                        />
                    )}
                    addButton={
                        <Button className="border border-white">
                            <Link
                                to="/accounts/new"
                                className="flex items-center"
                            >
                                <Plus className="w-4 h-4 mr-2 shrink-0" />
                                Add telegram account
                            </Link>
                        </Button>
                    }
                />
            </div>
        </div>
    );
}
