import {writable} from "svelte/store";

export const rol = writable(100);
export const username = writable("");
export const active_user_id = writable(-1);
export const authenticated = writable(false);
