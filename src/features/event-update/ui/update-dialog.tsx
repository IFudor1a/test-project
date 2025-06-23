"use client"
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import UpdateForm from "./update-form";

export const UpdateDialog = () => {
    const [open, setOpen] = React.useState(false);

    const handleSuccess =() => {
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>
                    Изменить статус
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Изменить статус</DialogTitle>
                    <DialogDescription>
                        Для изменения статуса событий заполните форму
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <UpdateForm onSuccess={handleSuccess}/>
                </div>
            </DialogContent>
        </Dialog>
    );
};