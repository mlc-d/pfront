import {writable} from "svelte/store";

export const collections = writable([]);
const getRoles = async () => {
    const url = "http://localhost:1323/api/v1/collections";
    const res = await fetch(url);
    const data = await res.json();
    collections.set(data)
}
getRoles().then(() => {});