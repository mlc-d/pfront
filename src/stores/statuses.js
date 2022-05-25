import {writable} from "svelte/store";

export const statuses = writable([]);
const getRoles = async () => {
    const url = "http://localhost:1323/api/v1/statuses";
    const res = await fetch(url);
    const data = await res.json();
    statuses.set(data)
}
getRoles().then(() => {});