import {DotsHorizontalIcon} from "@radix-ui/react-icons";

import {useState} from "react";
import {Link} from "react-router-dom";

import PhoneCodeDialog from "@/components/phone-code-dialog.tsx";
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

interface AccountActionCellProps {
    id: string;
    actions: FormAction[];
}

export default function AccountActionsCell({
    id,
    actions,
}: AccountActionCellProps) {
    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

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
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {actions.map((action: FormAction, index) => {
                        if (action.type === "edit" && action.path) {
                            return (
                                <DropdownMenuItem key={index}>
                                    <Link to={action.path}>{action.label}</Link>
                                </DropdownMenuItem>
                            );
                        }
                        if (action.type === "activate") {
                            return (
                                <DropdownMenuItem
                                    key={index}
                                    onSelect={() => setIsOpen(true)}
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
            <PhoneCodeDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                accountId={id}
            />
        </>
    );
}
