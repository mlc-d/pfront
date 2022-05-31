<script>

  let products = [];
  let productData = {
    id: null,
    name: "",
    ref: "",
    description: "",
    created_at: "",
  };
  let showProducts = () => {
    fetch("http://localhost:1998/api/v1/products")
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData !== "{ message: 'Not Found' }" && responseData !== null) {
          products = responseData;
          productData = {
            id: null,
            name: "",
            ref: "",
            description: "",
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
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://localhost:1998/api/v1/products", {
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

<div class="container mx-auto py-6 grid sm:grid-cols-1 lg:grid-cols-2">
  <div class="px-2">
    <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50">
      <h3 class="text-xl uppercase">Crear</h3>
      <br>
      <label class="" for="">NOMBRE:</label>
      <br>
      <input type="text" class="rounded-sm border-gray-200 border-2 w-full" bind:value={productData.name}>
      <br>
      <label class="uppercase" for="">REFERENCIA:</label>
      <br>
      <input type="text" class="rounded-sm border-gray-200 border-2 w-full" bind:value={productData.ref}>
      <br>
      <label class="uppercase" for="">DESCRIPCIÓN:</label>
      <br>
      <input type="text" class="rounded-sm border-gray-200 border-2 w-full" bind:value={productData.description}>
      <br>
      <br>
      <button class="bg-white border-rose-900 border-2 uppercase text-rose-900 rounded-sm p-2 hover:bg-rose-900 hover:text-white" on:click|preventDefault={createProduct}>Crear</button>
    </div>
  </div>
  <div class="px-2">
    <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50">
      <label class="text-lg uppercase" for="">Lista Productos</label>
      <br>
      <br>
      {#if products.length === 0}
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
