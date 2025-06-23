"use client"
import React from 'react';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import CreateForm from "./create-form";

export const CreateDialog = () => {
    const [open, setOpen] = React.useState(false);

    const handleSuccess =() => {
       setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>
                    Создать событие
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Создать событие</DialogTitle>
                    <DialogDescription>
                        Для создания события заполните форму
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <CreateForm onSuccess={handleSuccess}/>
                </div>
            </DialogContent>
        </Dialog>
    );
};

