import {type Event, EventCreate} from "@/entities/event";
import {useEventStore} from "@/features/event-selection";
import {toast} from "sonner";

const useEventSubmit = () => {
    const addEvent = (data: EventCreate) => {
        const id = Date.now();
        const createdAt = new Date().toISOString();

        const newEvent: Event = {
            id,
            createdAt,
            status: "Добавлено",
            ...data
        }
        toast.success(`Успешно добавлено событие: ${data.name}`)
        useEventStore.getState().addEvent(newEvent)
    }
    return {
        addEvent
    };
};

export default useEventSubmit;