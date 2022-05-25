<script>
  import {collections} from "../stores/collections.js";

  let products = [];
  let productData = {
    id: null,
    name: "",
    ref: "",
    description: "",
    collection: "",
    collection_id: null,
    created_at: "",
  };
  let showProducts = () => {
    fetch("http://localhost:1323/api/v1/products")
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData !== "{ message: 'Not Found' }" && responseData !== null) {
          products = responseData;
          productData = {
            id: null,
            name: "",
            ref: "",
            description: "",
            collection_id: null,
            created_at: "",
          };
        }
      });
  };
  let createProduct = () => {
    const newProduct = {
      name: productData.name,
      ref: productData.ref,
      description: productData.description,
      collection_id: productData.collection_id,
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://localhost:1323/api/v1/products", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.text())
      .then((responseData) => {
        if (responseData === "duplicate") {
          alert("duplicate entry!");
        }
        showProducts();
      });
  };
  showProducts();
</script>

<div class="container" style="padding: 1%;">
  <div class="row">
    <div class="col-8">
      <div class="card">
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Referencia</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Colección</th>
              </tr>
            </thead>
            <tbody>
              {#if products.length === 0}
                <tr>
                  <td>nothing</td>
                  <td>nothing</td>
                  <td>nothing</td>
                  <td>nothing</td>
                  <td>nothing</td>
                </tr>
              {:else}
                {#each products as product}
                  <tr>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.ref}</td>
                    <td>{product.description}</td>
                    <td>{product.collection}</td>
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Crear producto</h3>
          <div class="mb-3">
            <label for="" class="form-label">Nombre</label>
            <input
              type="text"
              class="form-control"
              name=""
              id=""
              aria-describedby="helpId"
              placeholder=""
              bind:value={productData.name}
            />
            <label for="" class="form-label">Referencia</label>
            <input
              type="text"
              class="form-control"
              name=""
              id=""
              aria-describedby="helpId"
              placeholder=""
              bind:value={productData.ref}
            />
            <label for="" class="form-label">Descripción</label>
            <input
              type="text"
              class="form-control"
              name=""
              id=""
              aria-describedby="helpId"
              placeholder=""
              bind:value={productData.description}
            />
            <div class="mb-3">
              <label for="" class="form-label">Colección</label>
              <select
                class="form-control"
                name=""
                id=""
                bind:value={productData.collection_id}
              >
                {#if $collections === null}
                  <option>nada por aquí...</option>
                  {:else}
                  {#each $collections as collection}
                    <option value={collection.id}>{collection.name}</option>
                  {/each}
                {/if}
              </select>
            </div>
            {#if $collections === null}
            <button
              type="button"
              class="btn btn-light"
              disabled
            >Crear</button
            >
              {:else}
              <button
                      type="button"
                      class="btn btn-success"
                      on:click|preventDefault={createProduct}
              >Crear</button
              >
              {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
</style>
