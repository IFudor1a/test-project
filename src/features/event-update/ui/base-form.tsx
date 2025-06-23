"use client"
import React, {useState} from 'react';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shared/ui/form";
import {useEventStore} from "@/features/event-selection";
import {useForm} from "react-hook-form";
import {z, ZodSchema, ZodType} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Checkbox} from "@/shared/ui/checkbox";
import {StatusSelect} from "@/shared/ui/status-select";
import {log} from "@/shared/lib/utils";
import {type UpdateForm} from "../model/update";
import {ScrollArea} from "@/shared/ui/scroll-area";
import {Button} from "@/shared/ui/button";


const BaseUpdateForm = ({
    onSubmit,
    schema
                        }: {
    onSubmit: (data: UpdateForm) => void,
    schema:  ZodType<any, any, any>;
}) => {
    const [loading, setLoading] = useState(false);

    const events = useEventStore(state => state.events);
    const form = useForm<z.infer<typeof schema>>(
        {
            resolver: zodResolver(schema),
            defaultValues: {
                events: []
            }
        }
    );
    console.log(form.watch())
    const formSubmit = async (formData: UpdateForm) => {
        setLoading(true);
        console.log(formData)
        try {
            onSubmit(formData)
        } catch (e) {
            log("error", e);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(formSubmit)}>
                    <FormField
                        control={form.control}
                        name="events"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">События</FormLabel>
                                    <FormDescription>
                                       Выберите события которые вы хотите изменить.
                                    </FormDescription>
                                </div>
                                <ScrollArea className="h-72  rounded-md">
                                {events.map((event) => (
                                    <FormField
                                        key={event.id}
                                        control={form.control}
                                        name="events"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={event.id}
                                                    className="flex flex-row items-center gap-2"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(event.id.toString())}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, event.id.toString()])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value: string) => value !== event.id.toString()
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {event.name}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                                <FormMessage />
                                </ScrollArea>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({field}) => (
                            <FormItem className="my-4">
                                <FormLabel>Статус</FormLabel>
                                <FormControl>
                                    <StatusSelect {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        Изменить
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default BaseUpdateForm;