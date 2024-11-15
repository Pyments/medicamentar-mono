import { actionTypes } from "./actionTypes";

export type gridItemTypes = {
    description: string,
    name?: string,
    actionType: actionTypes,
    date: string,
    eventDate?: string,
    medic?: string
};