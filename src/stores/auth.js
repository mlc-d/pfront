import {writable} from "svelte/store";

export const token = writable('');
export const authenticated = writable(false);