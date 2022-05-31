import {writable} from "svelte/store";

export const roles = writable([]);
const getRoles = async () => {
    const url = "http://localhost:1998/api/v1/roles";
    const res = await fetch(url);
    const data = await res.json();
    roles.set(data)
}
getRoles().then(() => {});