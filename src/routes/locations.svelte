<script>
import { get } from "svelte/store";


    let locations = [];
    let locationData = {
        name: "",
        created_at: "",
    };
    let l = 0;
    let getLocations = () => {
        fetch("http://localhost:1998/api/v1/locations")
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData !== "{ message: 'Not Found' }" && responseData !== null) {
                    locations = responseData;
                    locationData = {
                        name: "",
                        created_at: "",
                    };
                    l = responseData.length;
                }
            })
            //.catch(console.log());
    };
    let createLocation = () => {
        const newLocation = {
            name: locationData.name
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        fetch("http://localhost:1998/api/v1/locations", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(newLocation)
        })
        .then((response) => response.text())
        .then((responseData) => {
            if (responseData === "duplicate") {
                alert("duplicate!");
            }
            getLocations();
        })
    }
    getLocations();
</script>

<div class="container" style="padding: 1%;">
    <div class="row">
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Ubicaciones</h3>
                    {#if l === 0}
                        <strong>nada por aquí...</strong>
                        {:else}
                        {#each locations as location}
                        <div class="list-group">
                            <p>{location.name}</p>
                        </div>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Crear ubicación</h3>
                    <div class="mb-3">
                      <label for="" class="form-label">Nombre</label>
                      <input type="text"
                        class="form-control" name="" id="" aria-describedby="helpId" placeholder="" maxlength="10" bind:value={locationData.name}>
                      <br>
                      <button type="button" class="btn btn-success" on:click|preventDefault={createLocation}>Crear</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style></style>
