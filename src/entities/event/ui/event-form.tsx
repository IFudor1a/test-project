'use client'
import React, {useState} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/ui/form";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import {log} from "@/shared/lib/utils";
import {useForm} from "react-hook-form";
import {z, ZodSchema, ZodType} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {StatusSelect} from "@/shared/ui/status-select";

export const EventForm = <T extends object>({
                        defaultValues,
                        onSubmit,
                        schema
                    }: {
    defaultValues?: Partial<T>,
    onSubmit: (data: T) => void,
    schema:  ZodType<any, any, any>;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof schema>>(
        {
            resolver: zodResolver(schema),
            defaultValues
        }
    );
    const formSubmit = async (formData: T) => {
        setLoading(true);
        try {
            await onSubmit(formData)
        } catch (e) {
            log("error", e);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(formSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem className="my-4">
                            <FormLabel>Название события</FormLabel>
                            <FormControl>
                                <Input placeholder="введите название" disabled={loading} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    Отправить
                </Button>
            </form>
        </Form>
    );
};

