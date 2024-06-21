import {useAppDispatch} from "@/hook.ts";
import {Switch} from "@/components/ui/switch.tsx";
import {FormAction} from "@/models/types/form-action.ts";
import {ResponseCode} from "@/models/types/response.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {useState} from "react";

interface SwitchCellProps {
    id: string;
    value: boolean;
    action: FormAction;
}

export default function SwitchCell({
                                       id,
                                       value: initialValue,
                                       action,
                                   }: SwitchCellProps) {
    const dispatch = useAppDispatch();
    const {toast} = useToast();
    const [value, setValue] = useState(initialValue); // Add this line

    const onValueChange = async (switchValue: boolean) => {
        console.log("Switch value changed", switchValue)
        try {
            const toggleRunningTaskResult= await dispatch(action.action(action.params));
            const response = toggleRunningTaskResult.payload;

            console.log("Response", response)
            if (response.code !== ResponseCode.OK) {
                toast({title: "Error", description: response.message});
                return;
            }
            setValue(switchValue);
            console.log("Value", value)
            toast({
                title: "Success",
                description: `${action.label} completed successfully`,
            });
        } catch (error) {
            console.error(error);
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
        <Switch
            id={id}
            onCheckedChange={onValueChange}
            checked={value}
            className={value ? "bg-green-500" : "bg-red-500"}
        />
    );
}