// ActionsCell.tsx
import {DotsHorizontalIcon} from "@radix-ui/react-icons";

import {Link} from "react-router-dom";

import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {useAppDispatch} from "@/hook.ts";
import {FormAction} from "@/models/types/form-action.ts";


interface ActionCellProps {
    actions: FormAction[];
}

const ActionsCell = ({actions}: ActionCellProps) => {
    const {toast} = useToast();
    const dispatch = useAppDispatch();

    const handleAction = async (action: FormAction) => {
        try {
            await dispatch(action.action(action.params));
            toast({
                title: "Success",
                description: `${action.label} completed successfully`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
                variant: "destructive",
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {actions.map((action, index) => {
                    if (action.type === "edit" && action.path) {
                        return (
                            <DropdownMenuItem key={index}>
                                <Link to={action.path}>{action.label}</Link>
                            </DropdownMenuItem>
                        );
                    }
                    if (action.type === "default") {
                        return (
                            <DropdownMenuItem
                                key={index}
                                onSelect={action.action(action.params)}
                            >
                                {action.label}
                            </DropdownMenuItem>
                        );
                    }
                    return (
                        <DropdownMenuItem
                            key={index}
                            onSelect={() => handleAction(action)}
                        >
                            {action.label}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionsCell;
