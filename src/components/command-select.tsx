import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command";

interface Props {
    options: Array<{
        id: string;
        value: string;
        children: ReactNode;
    }>;
    onSelect: (value: string) => void;
    onSearch?: (query: string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
};

export const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an option...",
    className,
}: Props) => {
    return (
        <CommandResponsiveDialog>
            <CommandInput
                placeholder={placeholder}
                onValueChange={onSearch}
                className={cn("border-b", className)}
            />
            <CommandList>
                {options.map((option) => (
                    <CommandItem
                        key={option.id}
                        onSelect={() => onSelect(option.value)}
                    >
                        {option.children}
                    </CommandItem>
                ))}
            </CommandList>
        </CommandResponsiveDialog>
    );
};