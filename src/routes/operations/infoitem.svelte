<script>
    import { authenticated, token } from "../../stores/auth.js";
    import { apiFetch } from "../../interceptors/fetch.js";
    import { checkAuth } from "../../stores/session.js";

    
    let item = {}
    let histories = [];
    let requestedUic = "";
    var fulfilled;
    
    const sanitizeDate = (date) => {
        try {
            let values = date.split('T', 2);
            values[1] = values[1].split('.', 1)
            return `${values[0]} ${values[1]}`;
        } catch (error) {
            console.log(error);
        }
    }
    
    const getItem = async () => {
        try {
            let {res, data} = await apiFetch(`/api/v1/item?uic=${requestedUic}`, {}, $token);
            if (data.error) {
                alert(data["error"]);
                return;
            }
            fulfilled = true;
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    
    const getHistory = async () => {
        if (fulfilled) {
            let {res, data} = await apiFetch(`/api/v1/history?uic=${requestedUic}`, {}, $token);
            return data;
        }
    }
    
    const getInformation = async () => {
        fulfilled = false;
        item = await getItem();
        item.updated_at = sanitizeDate(item.updated_at);
        histories = await getHistory();
        histories.forEach(history => {
            history.created_at = sanitizeDate(history.created_at);
        });
    }
    
</script>

<div class="h-screen">
    <div class="text-center items-center justify-center">
        <header class="uppercase">
            <h1 class="text-2xl uppercase">buscar uic</h1>
            <br>
            <!-- svelte-ignore a11y-autofocus -->
            <input type="text" maxlength="6" bind:value={requestedUic} autofocus class="border-2 border-slate-800 rounded-sn">
            <hr class="py-1.5 border-gray-50">
            <button on:click|preventDefault={getInformation} class="bg-rose-900 text-white rounded-sm uppercase py-1.5 px-3">BUSCAR</button>
        </header>
    </div>
    <hr class="py-3 border-gray-50">
    {#if (fulfilled)}
        <div class="text-center items-center justify-center">
            <h3 class="uppercase text-lg">estado actual</h3>
        </div>
        <div class="flex justify-center text-center">
            <table class="border-2 border-slate-800 rounded-sm shadow-xl shadow-gray-800">
                <thead>
                    <tr class="bg-rose-900 text-white">
                        <td class="px-2">
                            ID
                        </td>
                        <td class="px-5">
                            UIC
                        </td>
                        <td class="px-5">
                            LOTE
                        </td>
                        <td class="px-5">
                            SKU
                        </td>
                        <td class="px-5">
                            UBICACIÓN
                        </td>
                        <td class="px-5">
                            ESTADO
                        </td>
                        <td class="px-5">
                            USUARIO
                        </td>
                        <td class="px-2">
                            FECHA
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {#if item !== undefined}
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {item.uic}
                            </td>
                            <td>
                                {item.batch}
                            </td>
                            <td>
                                {item.sku}
                            </td>
                            <td>
                                {item.location}
                            </td>
                            <td>
                                {item.status}
                            </td>
                            <td>
                                {item.user}
                            </td>
                            <td class="px-2">
                                {item.updated_at}
                            </td>
                        {/if}
                    </tr>
                </tbody>
            </table>       
        </div>
        <br>
        <br>
        <div class="flex justify-center text-center uppercase">
            <h3 class="uppercase text-lg">historia</h3>
        </div>
        <div>
            <div class="flex justify-center text-center">
                <table class="border-2 border-slate-800 rounded-sm shadow-lg shadow-gray-700">
                    <thead>
                        <tr class="bg-rose-900 text-white">
                            <td class="px-2">
                                ID
                            </td>
                            <td class="px-5">
                                UIC
                            </td>
                            <td class="px-5">
                                SKU
                            </td>
                            <td class="px-5">
                                UBICACIÓN
                            </td>
                            <td class="px-5">
                                ESTADO
                            </td>
                            <td class="px-5">
                                USUARIO
                            </td>
                            <td class="px-5">
                                FECHA
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {#each histories as history}
                        <tr>
                            <td>
                                {history.id}
                            </td>
                            <td>
                                {history.uic}
                            </td>
                            <td>
                                {history.sku}
                            </td>
                            <td>
                                {history.location}
                            </td>
                            <td>
                                {history.status}
                            </td>
                            <td>
                                {history.user}
                            </td>
                            <td class="px-2">
                                {history.created_at}
                            </td>
                        </tr>
                        {/each}
                    </tbody>
                </table>       
            </div>
        </div>
    {/if}
</div>

<style></style>