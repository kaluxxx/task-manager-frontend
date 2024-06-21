"use client"

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";

interface Option {
    value: string
    label: string;
}

interface SelectMultipleProps {
    options: Option[];
    setFormValue: (value: string[]) => void;
    formValue: string[];
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function SelectMultiple({options, setFormValue, formValue, open, setOpen}: SelectMultipleProps) {
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="w-full justify-between border border-white"
                    role="combobox"
                    aria-expanded={open}
                >
                    {formValue.length === 0
                        ? "Select accounts"
                        : formValue.length === 1
                            ? options.find((option) => option.value === formValue[0])?.label
                            : `${formValue.length} accounts selected`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search option..." className="border-0 focus:ring-0"/>
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            {options.map((option: Option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={() => {
                                        if (formValue.includes(option.value)) {
                                            setFormValue(formValue.filter((value) => value !== option.value));
                                        } else {
                                            setFormValue([...formValue, option.value]);
                                        }
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            formValue.includes(option.value) && "text-green-500"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );

}