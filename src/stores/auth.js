import {writable} from "svelte/store";

export const token = writable('');
export const authenticated = writable(false);
export const user_role = writable(4);