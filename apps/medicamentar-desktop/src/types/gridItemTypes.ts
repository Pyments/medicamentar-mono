import { actionTypes } from "./actionTypes";

export type gridItemTypes = {
    description: string,
    name?: string,
    doctorName?: string,
    actionType: actionTypes,
    date: string,
    eventDate?: string,
};