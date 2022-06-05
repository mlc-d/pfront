import {writable} from "svelte/store";

export const rol = writable(100);
export const username = writable("");
export const authenticated = writable(false);
