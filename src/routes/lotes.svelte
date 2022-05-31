<script>
    let lotes = [];
    let loteData = {
        id: null,
        lote: "",
        created_at: "",
    };
    let l = 0;
    let getLotes = () => {
        fetch("http://localhost:1998/api/v1/lotes")
        .then(response => response.json())
        .then((responseData) => {
            if (responseData !== null && responseData !== "{ message: 'Not Found' }") {
                lotes = responseData;
                loteData = {
                    id: null,
                    lote: "",
                    created_at: "",
                };
                l = lotes.length;
            }
        })//.catch(console.log())
    }
    getLotes();
    let createLote = () => {
        const newLote = {
            lote: loteData.lote,
        };
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("http://localhost:1998/api/v1/lotes", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(newLote)
        })
        .then(response => response.text())
        .then((responseData) => {
            if (responseData === "duplicate") {
                alert("duplicate")
            }
            getLotes();
        })
    }
</script>

<div class="container mx-auto py-6 grid sm:grid-cols-1 lg:grid-cols-2">
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50">
            <h3 class="text-xl uppercase">Crear</h3>
            <br>
            <label class="" for="">NOMBRE:</label>
            <br>
            <input type="text" class="rounded-sm border-gray-200 border-2 w-full" bind:value={loteData.lote}>
            <br>
            <br>
            <button class="bg-white border-rose-900 border-2 uppercase text-rose-900 rounded-sm p-2 hover:bg-rose-900 hover:text-white" on:click|preventDefault={createLote}>Crear</button>
        </div>
    </div>
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50">
            <label class="text-lg uppercase" for="">Lista lotes</label>
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
                {#each lotes as lote}
                    <tr class="border-b-2">
                        <td class="py-1 text-center justify-center">{lote.id}</td>
                        <td class="py-1 text-center justify-center">{lote.lote}</td>
                        <td class="py-1 text-center justify-center">{lote.created_at.split('T', 1)}</td>
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

<style></style>