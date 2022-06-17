<script>
    import { authenticated, token } from "../stores/auth.js";
    import { apiFetch } from "../interceptors/fetch.js"
    import { checkAuth } from "../stores/session.js";

    let batches = [];
    let batchData = {
        batch: "",
    };
    let lengthbatches = 0;

    
    const getbatches = async () => {
        try{
            let {res, data} = await apiFetch('/api/v1/batches', {}, $token);
            batches = data;
            lengthbatches = batches.length;
        }catch (error) {
            console.log(error);
        }
    }
    const createbatch = async () => {
        const newbatch = {
            batch: batchData.batch,
        };
        let {res, data} = await apiFetch('/api/v1/batches', {
            method: 'POST',
            body: JSON.stringify(newbatch)
        }, $token);
        batchData.batch = "";
        await getbatches();
    }
    getbatches();
</script>

<div class="container mx-auto py-6 grid sm:grid-cols-1 lg:grid-cols-2">
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50 hover:shadow-lg">
            <form action="" method="post" on:submit|preventDefault={createbatch}>
                <h3 class="text-xl">CREAR</h3>
                <br>
                NOMBRE:<input type="text" class="rounded-sm border-gray-200 border-2 w-full" bind:value={batchData.batch} maxlength="4">
                <hr class="py-1.5">
                <input type="submit" class="bg-white border-rose-900 border-2 uppercase text-rose-900 rounded-sm p-2 hover:bg-rose-900 hover:text-white" value="CREAR">
            </form>
        </div>
    </div>
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50 hover:shadow-lg">
            <label class="text-lg uppercase" for="">Lista batches</label>
            <br>
            <br>
            <table class="w-full">
                <thead>
                <tr class="text-center justify-center uppercase">
                    <th class="py-1 text-center justify-center">ID</th>
                    <th class="py-1 text-center justify-center">Nombre</th>
                    <th class="py-1 text-center justify-center">Creada</th>
                    <th class="py-1 text-right justify-items-end">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {#await batches}
                    <tr class="border-b-2">
                        <td class="py-1 text-center justify-center">...</td>
                        <td class="py-1 text-center justify-center">...</td>
                        <td class="py-1 text-center justify-center">...</td>
                        <td class="justify-items-end text-left">...</td>
                    </tr>
                {:then batches}
                    {#if lengthbatches > 0}
                        {#each batches as batch}
                            <tr class="border-b-2">
                                <td class="py-1 text-center justify-center">{batch.id}</td>
                                <td class="py-1 text-center justify-center">{batch.batch}</td>
                                <td class="py-1 text-center justify-center">{batch.created_at.split('T', 1)}</td>
                                <td class="justify-items-end text-left">
                                    <div class="justify-items-end justify-end text-right">
                                        <button class="px-1 bg-white border-2 border-slate-800 text-black hover:bg-slate-800 hover:text-white"><small>EDITAR</small></button>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                        {:else}
                        <p>Nada por aquí...</p>
                    {/if}
                {/await}
                </tbody>
            </table>
        </div>
    </div>
</div>

<style></style>