import { goto } from "$app/navigation";
import { writable } from "svelte/store";
import { authenticated } from "./auth.js";

export const rol = writable(-100);
export const username = writable("");
export const active_user_id = writable(-1);

const checkAuth = async (auth) => {

    try {
        if (auth === false) {
            console.log('auth desde js: ', auth);
            await goto('/login');
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    }
}

export {checkAuth};