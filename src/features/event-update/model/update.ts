import {Status} from "@/entities/event";

export type UpdateForm = {
    events: string[],
    status: Status
}