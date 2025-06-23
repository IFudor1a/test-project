import React from 'react';
import {CreateDialog} from "@/features/event-create";
import {UpdateDialog} from "@/features/event-update";

export const EventToolbar = () => {
    return (
        <div className="flex justify-end gap-3 my-3">
            <CreateDialog />
            <UpdateDialog />
        </div>
    );
};

