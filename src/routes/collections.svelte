<script>
    let collections = [];
    let collectionData = {
        name: "",
        created_at: "",
    };
    let l = 0;
    let getCollections = () => {
        fetch("http://localhost:1323/api/v1/collections")
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData !== "{ message: 'Not Found' }" && responseData !== null) {
                    collections = responseData;
                    collectionData = {
                        id: null,
                        name: "",
                        created_at: "",
                    };
                    l = collections.length;
                }
            })
    };
    let createCollection = () => {
        collectionData.name.trim()
        const newCollection = {
            name: collectionData.name,
        };
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("http://localhost:1323/api/v1/collections", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(newCollection),
        })
            .then((response) => response.text())
            .then((responseData) => {
                if (responseData !== "ok") {
                    alert(responseData);
                }
                getCollections();
            })
    };
    getCollections();
</script>

<div class="container mx-auto py-6 grid grid-cols-2">
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50">
            <h3 class="text-xl uppercase">Crear</h3>
            <br>
            <label class="uppercase" for="">Nombre:</label>
            <br>
            <input type="text" class="rounded-sm border-gray-200 border-2 w-full" bind:value={collectionData.name}>
            <br>
            <br>
            <button class="bg-white border-rose-900 border-2 uppercase text-rose-900 rounded-sm p-2 hover:bg-rose-900 hover:text-white" on:click|preventDefault={createCollection}>Crear</button>
        </div>
    </div>
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50">
            <label class="text-lg uppercase" for="">Lista usuarios</label>
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
                    {#each collections as collection}
                    <tr class="border-b-2">
                        <td class="py-1 text-center justify-center">{collection.id}</td>
                        <td class="py-1 text-center justify-center">{collection.name}</td>
                        <td class="py-1 text-center justify-center">{collection.created_at}</td>
                        <td class="justify-items-end text-left">
                            <div class="justify-items-end justify-end text-right">
                                <button class="px-1 bg-white border-2 border-slate-800 text-black hover:bg-slate-800 hover:text-white"><small>EDITAR</small></button>
                            </div>
                        </td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>

<style>
</style>
