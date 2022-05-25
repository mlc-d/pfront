<script>
    let lotes = [];
    let loteData = {
        id: null,
        name: "",
        created_at: "",
    };
    let l = 0;
    let getLotes = () => {
        fetch("http://localhost:1323/api/v1/lotes")
        .then(response => response.json())
        .then((responseData) => {
            if (responseData !== null && responseData !== "{ message: 'Not Found' }") {
                lotes = responseData;
                loteData = {
                    id: null,
                    name: "",
                    created_at: "",
                };
                l = lotes.length;
            }
        })//.catch(console.log())
    }
    getLotes();
    let createLote = () => {
        const newLote = {
            name: loteData.name,
        };
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("http://localhost:1323/api/v1/lotes", {
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

<div class="container" style="padding: 1%;">
    <div class="row">
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Lotes</h3>
                    {#if l === 0}
                        <strong>nada por aquí...</strong>
                        {:else}
                        {#each lotes as lote}
                        <div class="list-group">
                            <p><b>{lote.name}</b></p>
                            <small>Creado en: {lote.created_at}</small>
                        </div>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Crear lote</h3>
                    <div class="mb-3">
                      <label for="" class="form-label">Nombre</label>
                      <input type="text"
                        class="form-control" name="" id="" aria-describedby="helpId" placeholder="" maxlength="10" bind:value={loteData.name}>
                      <br>
                      <button type="button" class="btn btn-success" on:click|preventDefault={createLote}>Crear</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style></style>