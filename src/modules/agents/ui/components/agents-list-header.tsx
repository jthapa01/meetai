"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "./new-agent-dialog";

export const AgentsListHeader = () => {
    const [isNewAgentDialogOpen, setIsNewAgentDialogOpen] = useState(false);

    return(
        <>
            <NewAgentDialog open={isNewAgentDialogOpen} onOpenChange={setIsNewAgentDialogOpen} />
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Agents</h5>
                    <Button onClick={() => setIsNewAgentDialogOpen(true)}>
                        <PlusIcon />
                        New Agent
                    </Button>
                </div>
            </div>
        </>
    );
};