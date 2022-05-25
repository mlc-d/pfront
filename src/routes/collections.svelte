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
                    console.log(collections);
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
            //.catch(console.log());
    };
    getCollections();
</script>

<div class="container">
    <div class="row">
        <div class="col-6">
            <div class="card">
                <div class="card-header">Colecciones なぎさ</div>
                <div class="card-body">
                    {#if l === 0}
                        <div class="card border-primary">
                            <!-- <img class="card-img-top" src="holder.js/100px180/" alt=""> -->
                            <div class="card-body">
                                <strong>nada por aquí...</strong>
                                <br />
                                <small
                                    >Usa el formulario para crear la primer
                                    colección ---></small
                                >
                            </div>
                        </div>
                    {:else}
                        {#each collections as collection}
                            <div class="card border-primary">
                                <!-- <img class="card-img-top" src="holder.js/100px180/" alt=""> -->
                                <div class="card-body">
                                    <h4 class="card-title">
                                        {collection.name}
                                    </h4>
                                    <small class="card-text">
                                        <b>Creada en:</b>
                                        {collection.created_at}
                                    </small>
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card">
                <div class="card-header">Crear colección</div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="" class="form-label">Nombre</label>
                        <input
                            type="text"
                            class="form-control"
                            name=""
                            id=""
                            aria-describedby="helpId"
                            placeholder=""
                            bind:value={collectionData.name}
                        />
                        <br />
                        <button
                            type="button"
                            class="btn btn-success"
                            on:click|preventDefault={createCollection}
                            >Crear</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
</style>
