<script>
    import {roles} from "../stores/roles.js";

    let users = [];
    let userData = {
        id: null,
        name: "",
        password: "",
        role_id: null,
    };
    let l = 0;
    let showUsers = () => {
        fetch("http://localhost:1323/api/v1/users")
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData !== "{ message: 'Not Found' }" && responseData !== null) {
                    users = responseData;
                    userData = {
                        id: null,
                        name: "",
                        role_id: null,
                    };
                    l = users.length;
                }
            })
    };
    let createUser = () => {
        userData.name.trim();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const newUser = {
            name: userData.name,
            password: userData.password,
            rol_id: userData.role_id,
        };
        fetch("http://localhost:1323/api/v1/users", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(newUser),
        })
            .then((response) => response.text())
            .then((responseData) => {
                if (responseData !== "ok") {
                    alert(responseData);
                }
                showUsers();
            })
    };
    showUsers();
</script>

<div class="container" style="padding: 2%">
    <div class="row">
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Create User</h3>
                    <div class="mb-3">
                        <label for="" class="form-label">Nombre</label>
                        <input
                            type="text"
                            class="form-control"
                            name=""
                            aria-describedby="helpId"
                            placeholder=""
                            bind:value={userData.name}
                        />
                        <label for="" class="form-label">Contraseña</label>
                        <input
                                type="password"
                                class="form-control"
                                name=""
                                aria-describedby="helpId"
                                placeholder=""
                                bind:value={userData.password}
                        />
                        <div class="mb-3">
                            <label for="" class="form-label">Rol</label>
                            <select
                                class="form-control"
                                name=""
                                id=""
                                bind:value={userData.role_id}
                            >
                                {#each $roles as rol}
                                    <option value={rol.id}>{rol.name}</option>
                                {/each}
                            </select>
                        </div>
                        <button
                            type="button"
                            class="btn btn-success"
                            on:click|preventDefault={createUser}>Crear</button
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card scroll">
                <div class="card-body">
                    <h3 class="card-title">Usuarios</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#if l === 0}
                                <tr>
                                    <td>0</td>
                                    <td>Nada por aquí...</td>
                                </tr>
                            {:else}
                                {#each users as user}
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                    </tr>
                                {/each}
                            {/if}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .scroll {
        max-height: 550pt;
        overflow-y: auto;
    }
</style>
