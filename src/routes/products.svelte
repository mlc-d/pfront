<script>
    import {apiFetch} from "../interceptors/fetch.js";
    import {token} from "../stores/auth.js";
    import {rol} from "../stores/session.js";
    import {goto} from "$app/navigation";

    let products = [];
    let productData = {
        name: "",
        ref: "",
        description: "",
    };
    let lengthbatches = 0;
    const getProducts = async () => {
        try{
            let {res, data} = await apiFetch('/api/v1/products', {}, $token);
            products = data;
            lengthbatches = products.length;
        }catch (error) {
            console.log(error);
        }
    }
    const createProduct = async () => {
        const newProduct = {
            name: productData.name,
            ref: productData.ref,
            description: productData.description,
        };
        let {res, data} = await apiFetch('/api/v1/products', {
            method: 'POST',
            body: JSON.stringify(newProduct)
        }, $token);
        productData = {
            name: "",
            ref: "",
            description: "",
        };
        await getProducts();
    }
    /*const checkAuth = async () => {
        if ($rol > 2) {
            await goto('/')
        }
    }
    checkAuth();*/
    getProducts();
</script>

<div class="container mx-auto py-6 grid sm:grid-cols-1 lg:grid-cols-2">
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50 hover:shadow-lg">
            <h3 class="text-xl uppercase">Crear</h3>
            <br>
            <form on:submit|preventDefault={createProduct}>
                NOMBRE:<input bind:value={productData.name} class="rounded-sm border-gray-200 border-2 w-full" type="text">
                <br>
                REFERENCIA:<input bind:value={productData.ref} class="rounded-sm border-gray-200 border-2 w-full" type="text">
                <br>
                DESCRIPCIÓN:<input bind:value={productData.description} class="rounded-sm border-gray-200 border-2 w-full" type="text">
                <hr class="py-1.5">
                <input type="submit" class="bg-white border-rose-900 border-2 uppercase text-rose-900 rounded-sm p-2 hover:bg-rose-900 hover:text-white" value="CREAR">
            </form>
        </div>
    </div>
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50 hover:shadow-lg">
            <label class="text-lg uppercase">Lista Productos</label>
            <br>
            <br>
            {#if lengthbatches === 0}
                <div><h2>Nada por aquí</h2></div>
            {:else}
                {#each products as product}
                    <div class="p-1">
                        <div class="border-2 border-slate-500 p-4">
                            <h2 class="uppercase font-bold">{product.name}</h2>
                            <p class="font-semibold">Ref: {product.ref}</p>
                            <p class="font-light">Descripción: {product.description}</p>
                            <small>{product.created_at.split('T', 1)}</small>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
</style>
