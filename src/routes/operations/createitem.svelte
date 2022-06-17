<script>
    import { authenticated, token } from "../../stores/auth.js";
    import { apiFetch } from "../../interceptors/fetch.js";
    import { active_user_id, checkAuth } from "../../stores/session.js";

    let batches = [];
    let locations = [];
    let skus = [];
    let items = [];
    let itemData = {
        uic: "",
        batch_id: null,
        sku_id: null,
        location_id: null,
    };

    $: errors = [];

    const getBatches = async () => {
        try {
            let { res, data } = await apiFetch("/api/v1/batches", {}, $token);
            batches = data;
        } catch (error) {
            console.log(error);
        }
    };

    const getSkus = async () => {
        try {
            let { res, data } = await apiFetch("/api/v1/skus", {}, $token);
            skus = data;
        } catch (error) {
            console.log(error);
        }
    };
    const getLocations = async () => {
        try {
            let { res, data } = await apiFetch(
                `/api/v1/locbystatus?status=1`,
                {},
                $token
            );
            locations = data;
        } catch (error) {
            console.log(error);
        }
    };

    /* {
        "uic": "AAA006",
        "sku_id": 2,
        "batch_id": 1,
        "location_id": 3,
        "status_id": 1,
        "user_id": 2
    } */
    let input = "";
    const test = async () => {
        try {
            switch (input) {
                case "":
                    break;
                case "##OK##":
                    let { res, data } = await apiFetch(
                        "/api/v1/items",
                        {
                            method: "POST",
                            body: JSON.stringify(items),
                        },
                        $token
                    );
                    input = "";
                    items = [];
                    if (data.error) {
                        console.log(data);
                    }
                    break;
                case "ABORT!":
                    items = [];
                    input = "";
                    break;
                default:
                    const newItem = {
                        uic: input,
                        batch_id: itemData.batch_id,
                        sku_id: itemData.sku_id,
                        location_id: itemData.location_id,
                        status_id: 1,
                        user_id: parseInt($active_user_id),
                    };
                    items.push(newItem);
                    input = "";
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    $: confirm =
        itemData.batch_id > 0 &&
        (itemData.sku_id > 0) & (itemData.location_id > 0)
            ? false
            : true;
    $: editableMenus = false;

    getBatches();
    getSkus();
    getLocations();
</script>

<div class="flex justify-evenly justify-items-center text-center uppercase">
    <div class="border-2 border-rose-900 p-3">
        {#if batches !== undefined}
            <select
                name=""
                id=""
                bind:value={itemData.batch_id}
                disabled={editableMenus}
                class="px-4"
            >
                {#each batches as batch}
                    <option value={batch.id}>{batch.batch}</option>
                {/each}
            </select>
        {/if}
        {#if skus !== undefined}
            <select
                name=""
                id=""
                bind:value={itemData.sku_id}
                disabled={editableMenus}
                class="px-4"
            >
                {#each skus as sku}
                    <option value={sku.id}>{sku.sku}</option>
                {/each}
            </select>
        {/if}
        {#if locations !== undefined}
            <select
                name=""
                id=""
                bind:value={itemData.location_id}
                disabled={editableMenus}
                class="px-4"
            >
                {#each locations as location}
                    <option value={location.id}>{location.location}</option>
                {/each}
            </select>
        {/if}
        <br />
        <p class="px-3 font-semibold">confirmar</p>
        <input
            type="checkbox"
            disabled={confirm}
            on:change={() => {
                editableMenus = !editableMenus;
            }}
            checked=""
        />
        {#if editableMenus}
            <br />
            <br />
            <input
                type="text"
                name=""
                bind:value={input}
                placeholder="uic..."
                class="border-2 rounded-sm border-slate-500 px-2"
            />
            <br />
            <br />
            <button
                class="py-1 px-2 border-2 border-slate-800"
                on:click|preventDefault={test}
            >
                Enviar
            </button>
        {/if}
    </div>
    {#if errors.length > 0}
        <p>{errors}</p>
    {/if}
</div>

<style>
</style>
