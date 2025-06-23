export type Status = "Добавлено" | "Начато" | "На проверке" | "Завершено"

export type Event = {
    id: number,
    name: string,
    status: Status,
    createdAt: string,
}

export type EventBaseForm = {
    name: string,
    status: Status,
}

export type EventCreate = Omit<EventBaseForm, 'status'>;

export type EventUpdate = EventBaseForm & {
    id: number,
    createdAt?: string,
};