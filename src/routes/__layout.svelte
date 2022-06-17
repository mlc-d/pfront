<script>
    import { apiFetch } from "../interceptors/fetch.js";
    import Nav from "../components/nav.svelte"
    import Foot from "../components/foot.svelte";
    import Login from "./login.svelte"
    import { authenticated, token } from "../stores/auth.js";
    import "../app.css";
import { checkAuth } from "../stores/session.js";

    // echo api
    const echoApi = async () => {
        try {
            let {res, data} = await apiFetch('/api/v1/', {}, $token);
        } catch (error) {
            console.log(error);
        }
    }
    echoApi()
    .then(() => {
        checkAuth($authenticated);
    })


</script>
<div class="bg-gray-50">
    {#if ($authenticated)}
        <Nav />
        <div class="p-2">
            <slot></slot>
        </div>
        {:else}
            <Login />
    {/if}
    <!--  -->
</div>
<Foot />