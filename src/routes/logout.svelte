<script>
    import {goto} from "$app/navigation";
    import { authenticated, token } from "../stores/auth.js";
    import { apiFetch } from "../interceptors/fetch";

    const logout = async () => {
        try {
            let {res, data} = await apiFetch('/logout', {
                method: 'POST',
                credentials: 'include',
            }, $token);
            token.set("");
            authenticated.set(false);
            await goto('/login');
        } catch (error) {
            console.log(error);
        }
    }
    logout();
</script>