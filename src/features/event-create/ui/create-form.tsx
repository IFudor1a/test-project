'use client'
import React from 'react';
import {EventCreate, EventForm} from "@/entities/event";
import {schema} from "../model/schema";
import useEventSubmit from "../model/useEventSubmit";


const CreateForm = ({onSuccess}: {
    onSuccess?: () => void
}) => {
    const {addEvent} = useEventSubmit();


    const onSubmit = (data: EventCreate) => {
        addEvent(data);
        onSuccess?.();
    }
    return (
       <EventForm onSubmit={onSubmit} schema={schema} />
    );
};

export default CreateForm;