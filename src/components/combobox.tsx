"use client";

import {CommandList} from "cmdk";

import {ReactElement} from "react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command.tsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {Option} from "@/models/types/option.ts";

interface FilterProps {
    options: Option[];
    button: ReactElement;
    values: string[];
    open: boolean;
    setOpen: (open: boolean) => void;
    commandItemContent?: (option: Option) => ReactElement;
}

export function Combobox({
    options,
    button,
    open,
    setOpen,
    commandItemContent,
}: FilterProps) {
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{button}</PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Search ..." />
                    <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    className={cn(
                                        "flex items-center gap-2 my-1",
                                    )}
                                >
                                    {commandItemContent
                                        ? commandItemContent(option)
                                        : option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
