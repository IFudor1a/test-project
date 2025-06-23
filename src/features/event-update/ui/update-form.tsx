'use client'
import React from 'react';
import {schema} from "../model/schema";
import useEventSubmit from "../model/useEventSubmit";
import BaseUpdateForm from "./base-form";
import {type UpdateForm} from "../model/update";


const UpdateForm = ({onSuccess}: {
    onSuccess?: () => void
}) => {
    const {updateEvent} = useEventSubmit();


    const onSubmit = (data: UpdateForm) => {
        updateEvent(data);
        onSuccess?.();
    }
    return (
        <BaseUpdateForm onSubmit={onSubmit} schema={schema}/>
    );
};

export default UpdateForm;