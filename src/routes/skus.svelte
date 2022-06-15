<script>
    import {token} from "../stores/auth";
    import {apiFetch} from "../interceptors/fetch.js";
    import {rol} from "../stores/session.js";

    let skus = [];
    let products = [];
    let skus_length = 0;
    let products_length = 0;

    let skuData = {
        sku: "",
        product_id: null,
    };

    const getSkus = async () => {
        try {
            let {res, data} = await apiFetch('/api/v1/skus',{},$token);
            skus = data;
        } catch (error) {
            console.log(error)
        }
    }

    const getProducts = async () => {
        try {
            let {res, data} = await apiFetch('/api/v1/products', {}, $token);
            products = data;
        } catch (error) {
            console.log(error)
        }
    }

    const createSku = async () => {
        try {
            const newSku = {
                sku: skuData.sku,
                product_id: skuData.product_id,
            }
            let {res, data} = await apiFetch('/api/v1/users', {
                method: 'POST',
                body: JSON.stringify(newSku),
            }, $token);
            if (data.error) {
                console.log(data["error"]);
            }
            skuData.sku = "";
            skuData.product_id = null;
            await getSkus();
        } catch (error) {
            console.log(error)
        }
    }

    getProducts();
    getSkus();
</script>

<div class="container mx-auto py-6 grid grid-cols-2">
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50 hover:shadow-lg">
            <h3 class="text-xl uppercase">Crear</h3>
            <br>
            <form method="post" on:submit|preventDefault={createSku}>
                SKU:<input type="text" class="rounded-sm border-gray-200 border-2 w-full" bind:value={skuData.sku} maxlength="30">
                <br>
                <label for="">ROL:</label>
                <br>
                {#await products}
                    <p>Cargando productos...</p>
                {:then products}
                    <select name="" class="bg-white border-2 border-gray-200" bind:value={skuData.product_id}>
                        {#each products as p}
                            <option value={p.id}>{p.ref}</option>
                        {/each}
                    </select>
                {/await}
                <hr class="py-1.5">
                <input type="submit" class="bg-white border-rose-900 border-2 uppercase text-rose-900 rounded-sm p-2 hover:bg-rose-900 hover:text-white" value="CREAR">
            </form>
        </div>
    </div>
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm hover:shadow-lg">
            <label for="" class="text-lg uppercase" >Lista Skus</label>
            <br>
            <br>
            <table class="w-full">
                <thead>
                    <tr class="text-center justify-center">
                        <th class="py-1 text-center justify-center">ID</th>
                        <th class="py-1 text-center justify-center">Sku</th>
                        <th class="py-1 text-right justify-items-end">Producto</th>
                        <th class="py-1 text-right justify-items-end">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                {#await skus}
                    <tr class="border-b-2">
                        <td class="py-1 text-center justify-center">...</td>
                        <td class="py-1 text-center justify-center">...</td>
                        <td class="py-1 justify-center text-center">...</td>
                        <td class="py-1 justify-end justify-items-end text-right">...</td>
                    </tr>
                {:then skus}
                    {#each skus as sku}
                        <tr class="border-b-2">
                            <td class="py-1 text-center justify-center">{sku.id}</td>
                            <td class="py-1 text-center justify-center">{sku.sku}</td>
                            <td class="py-1 text-center justify-center">{sku.ref}</td>
                            <td class="justify-items-end text-left">
                                {#if $rol < 4}
                                    <div class="justify-items-end justify-end text-right">
                                        <button class="px-1 bg-white border-2 border-slate-800 text-black hover:bg-slate-800 hover:text-white"><small>EDITAR</small></button>
                                    </div>
                                    {:else}
                                    <p class="justify-items-end justify-end text-right">...</p>
                                {/if}
                            </td>
                        </tr>
                    {/each}
                {/await}
                </tbody>
            </table>
        </div>
    </div>
</div>

<style></style>