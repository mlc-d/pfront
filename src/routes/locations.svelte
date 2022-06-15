<script>
    import { token } from "../stores/auth.js";
    import { apiFetch } from "../interceptors/fetch.js";
    import { rol } from "../stores/session.js";
    import { isOverlayOpen } from "../stores/Overlay.js";
    import Overlay from "../components/Overlay.svelte";

    let locations = [];
    let statuses = [];
    let locationData = {
        location: "",
        status_id: null,
    };
    let selectedLocation = {
        id: null,
        location: "",
        status_id: null,
    };

    const getStatuses = async () => {
        try {
            let { res, data } = await apiFetch("/api/v1/statuses", {}, $token);
            statuses = data;
        } catch (error) {
            console.log(error);
        }
    };
    const getLocations = async () => {
        try {
            let { res, data } = await apiFetch("/api/v1/locations", {}, $token);
            locations = data;
        } catch (error) {
            console.log(error);
        }
    };
    const createLocation = async () => {
        try {
            locationData.location.trim();
            const newLocation = {
                location: locationData.location,
                status_id: locationData.status_id,
            };
            let { res, data } = await apiFetch(
                "/api/v1/locations",
                {
                    method: "POST",
                    body: JSON.stringify(newLocation),
                },
                $token
            );
            if (data.error) {
                alert(data["error"]);
            }
            locationData = {
                location: "",
                status_id: null,
            };
            await getLocations();
        } catch (error) {
            console.log(error);
        }
    };
    const editLocation = async () => {
        try {
            selectedLocation.location.trim();
            const editedLocation = {
                id: selectedLocation.id,
                location: selectedLocation.location,
                status_id: selectedLocation.status_id,
            };
            let { res, data } = await apiFetch("/api/v1/locations",
                {
                    method: "PATCH",
                    body: JSON.stringify(editedLocation),
                },
                $token
            );
            if (data.error) {
                alert(data["error"]);
            }
            selectedLocation = {
                id: null,
                location: "",
                status_id: null,
            };
        } catch (error) {
            console.log(error);
        }
    };

    getStatuses();
    getLocations();
</script>

{#if $isOverlayOpen}
    <Overlay>
        <span class="text-stone-50">
            <form method="post" on:submit|preventDefault={editLocation}>
                <h3><strong>EDITANDO UBICACIÓN</strong></h3>
                <br />
                <small class="italic">los campos en blanco serán ignorados...</small>
                <br />
                Ubicación:
                <br />
                <input
                    type="text"
                    placeholder="..."
                    class="rounded-sm border-gray-200 border-2 text-black"
                    bind:value={selectedLocation.location}
                />
                <br>
                <br>
                <input
                    type="button"
                    class="p-2 bg-rose-900 text-white hover:-translate-y-0.5 transition-transform rounded-sm"
                    value="CANCELAR"
                    on:click={() => {
                        isOverlayOpen.set(false);
                    }}
                >
                <input
                    type="submit"
                    class="p-2 bg-green-600 text-white hover:-translate-y-0.5 transition-transform rounded-sm"
                    value="ENVIAR"
                    on:click={() => {
                        isOverlayOpen.set(false);
                    }}
                >
            </form>
        </span>
    </Overlay>
{/if}

<div class="container mx-auto py-6 grid grid-cols-2">
    <div class="px-2">
        <div
            class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50 hover:shadow-lg"
        >
            <h3 class="text-xl uppercase">Crear</h3>
            <br />
            <form method="post" on:submit|preventDefault={createLocation}>
                UBICACIÓN:<input
                    type="text"
                    class="rounded-sm border-gray-200 border-2 w-full"
                    bind:value={locationData.location}
                    maxlength="30"
                />
                <br />
                ESTADO:
                <br />
                {#await statuses}
                    <p>Cargando estados...</p>
                {:then statuses}
                    <select
                        name=""
                        class="bg-white border-2 border-gray-200"
                        bind:value={locationData.status_id}
                    >
                        {#each statuses as s}
                            <option value={s.id}>{s.status}</option>
                        {/each}
                    </select>
                {/await}
                <hr class="py-1.5" />
                <input
                    type="submit"
                    class="bg-white border-rose-900 border-2 uppercase text-rose-900 rounded-sm p-2 hover:bg-rose-900 hover:text-white"
                    value="CREAR"
                />
            </form>
        </div>
    </div>
    <div class="px-2">
        <div
            class="py-3 px-8 border-gray-400 border-2 rounded-sm hover:shadow-lg"
        >
            Lista ubicaciones
            <br />
            <br />
            <table class="w-full">
                <thead>
                    <tr class="text-center justify-center">
                        <th class="py-1 text-center justify-center">ID</th>
                        <th class="py-1 text-center justify-center">Nombre</th>
                        <th class="py-1 text-right justify-items-end">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {#await locations}
                        <tr class="border-b-2">
                            <td class="py-1 text-center justify-center">...</td>
                            <td class="py-1 text-center justify-center">...</td>
                            <td class="py-1 justify-end text-right">...</td>
                        </tr>
                    {:then locations}
                        {#each locations as location}
                            <tr class="border-b-2">
                                <td class="py-1 text-center justify-center"
                                    >{location.id}</td
                                >
                                <td class="py-1 text-center justify-center"
                                    >{location.location}</td
                                >
                                <td class="justify-items-end text-left">
                                    {#if $rol < 5}
                                        <div
                                            class="justify-items-end justify-end text-right"
                                        >
                                            <button
                                                class="px-1 bg-white border-2 border-slate-800 text-black hover:bg-slate-800 hover:text-white"
                                                on:click={() => {
                                                    isOverlayOpen.set(true);
                                                    selectedLocation.id = location.id;
                                                }}
                                            >
                                                <small>EDITAR</small>
                                            </button>
                                        </div>
                                    {:else}
                                        <p
                                            class="justify-items-end justify-end text-right"
                                        >
                                            ...
                                        </p>
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

<style>
</style>
