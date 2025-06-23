import {type Event} from '@/entities/event';
import {create} from "zustand/react";
import {eventsMock} from "@/shared/mocks";

type State = {
    events: Event[],
    addEvent: (event: Event) => void,
    setEvents: (data: Event[]) => void
}

export const useEventStore = create<State>((set) => ({
    events: eventsMock,
    addEvent: (event) =>
        set((state) => ({
            events: [...state.events, event],
        })),
    setEvents: (data) => set({ events: data }),
}))