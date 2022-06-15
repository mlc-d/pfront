<script>
    import { token } from "../stores/auth.js";
    import { apiFetch } from "../interceptors/fetch";

    const echoApi = async () => {
        try {
            let {res, data} = await apiFetch('/api/v1/', {}, $token)
        } catch (error) {
            console.log(error);
        }
    }
    echoApi();
</script>

<svelte:head>
    <title>PolygonWMS</title>
</svelte:head>

<h1 class="text-4xl text-center uppercase my-4">Bienvenido a PolygonWMS</h1>