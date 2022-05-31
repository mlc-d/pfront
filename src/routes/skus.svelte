<script>
    let skus = [];
    let products = [];
    let skuData = {
        id: null,
        name: "",
        details: "",
        product_id: "",
        product: "",
    };
    let l = 0;
    let showProducts = () => {
        fetch("http://localhost:1998/api/v1/products")
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.length !== 0) {
                    products = responseData;
                }
            });
    };
    showProducts();
    let showSkus = () => {
        fetch("http://localhost:1998/api/v1/skus")
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData !== "{ message: 'Not Found' }") {
                    skus = responseData;
                    skuData = {
                        id: null,
                        name: "",
                        details: "",
                        product_id: "",
                        product: "",
                    };
                    l = skus.length;
                }
            })
            //.catch(console.log());
    };
    let createSku = () => {
        const newSku = {
            name: skuData.name,
            details: skuData.details,
            product_id: skuData.product_id,
        };
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("http://localhost:1998/api/v1/skus", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(newSku),
        })
            .then((response => response.text()))
            .then((responseData) => {
                if ((responseData === "duplicate")) {
                    alert("duplicate");
                }
                showSkus();
            })
            //.catch(console.log());
    };
    showSkus();
</script>

<div class="container" style="padding: 1%;">
    <div class="row">
        <div class="col-5">
            <div class="card">
                <!--<img class="card-img-top" src="holder.js/100x180/" alt="">-->
                {#if l === 0}
                    <div class="card border-primary">
                        <!-- <img class="card-img-top" src="holder.js/100px180/" alt=""> -->
                        <div class="card-body">
                            <strong>nada por aquí...</strong>
                            <br />
                            <small
                                >Usa el formulario para crear la primer
                                referencia ---></small
                            >
                        </div>
                    </div>
                {:else}
                    {#each skus as sku}
                        <div class="card border-primary">
                            <!-- <img class="card-img-top" src="holder.js/100px180/" alt=""> -->
                            <div class="card-body">
                                <h4 class="card-title">
                                    {sku.name}
                                </h4>
                                <small class="card-text">
                                    <b>ID</b>
                                    {sku.id}
                                </small>
                                <br>
                                <small class="card-text">
                                    <b>Producto</b>
                                    {sku.product}
                                </small>
                                <br>
                                <small class="card-text">
                                    <b>Detalles:</b>
                                    {sku.details}
                                </small>
                            </div>
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
        <div class="col-7">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Crear SKU</h3>
                    <div class="mb-3">
                        <label for="" class="form-label">Nombre</label>
                        <input
                            type="text"
                            class="form-control"
                            name=""
                            id=""
                            aria-describedby="helpId"
                            placeholder=""
                            bind:value={skuData.name}
                            maxlength="10"
                        />
                        <div class="mb-3">
                            <label for="" class="form-label">Detalles</label>
                            <input
                                type="text"
                                class="form-control"
                                name=""
                                id=""
                                aria-describedby="helpId"
                                bind:value={skuData.details}
                                placeholder="opcional..."
                                maxlength="500"
                            />
                            <div class="mb-3">
                                <label for="" class="form-label">Producto</label
                                >
                                <select
                                    class="form-control"
                                    name=""
                                    id=""
                                    bind:value={skuData.product_id}
                                >
                                    {#each products as product}
                                        <option value={product.id}
                                            >{product.name}</option
                                        >
                                    {/each}
                                </select>
                            </div>
                            <button
                                type="button"
                                class="btn btn-success"
                                on:click|preventDefault={createSku}
                                >Crear</button
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style></style>
