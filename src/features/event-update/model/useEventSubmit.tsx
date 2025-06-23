import {useEventStore} from "@/features/event-selection";
import {toast} from "sonner";
import {type UpdateForm} from "./update";

const useEventSubmit = () => {
    const events = useEventStore(state => state.events);
    const updateEvent = (data: UpdateForm) => {
        const ids = new Set(data.events);

        const updated = events.map((event) =>
            ids.has(event.id.toString())
                ? { ...event, status: data.status }
                : event
        );
        toast.success(`Успешно изменен статус на: ${data.status}`)
        useEventStore.getState().setEvents(updated)
    }
    return {
        updateEvent
    };
};

export default useEventSubmit;