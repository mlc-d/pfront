<script>
    import {token} from "../stores/auth";
    import {apiFetch} from "../interceptors/fetch.js"
    import {rol} from "../stores/session.js";

    let users = [];
    let roles = [];
    let userData = {
        id: null,
        name: "",
        password: "",
        role_id: null,
    };
    const getRoles = async () => {
        try {
            let {res, data} = await apiFetch('/api/v1/roles',{},$token);
            roles = data;
        } catch (error) {
            console.log(error)
        }
    }
    const getUsers = async () => {
        try {
            let {res, data} = await apiFetch('/api/v1/users',{},$token);
            users = data;
        } catch (error) {
            console.log(error)
        }
    }
    const createUser = async () => {
        try {
            userData.name.trim();
            userData.name = userData.name.toLowerCase();
            const newUser = {
                name: userData.name,
                password: userData.password,
                role_id: userData.role_id,
            };
            let {res, data} = await apiFetch('/api/v1/users', {
                method: 'POST',
                body: JSON.stringify(newUser)
            }, $token);
            if (data.error) {
                alert(data["error"]);
            }
            userData = {
                id: null,
                name: "",
                password: "",
                role_id: null,
            };
            await getUsers();
        } catch (error) {
            console.log(error)
        }
    };
    getRoles();
    getUsers();
</script>


<div class="container mx-auto py-6 grid grid-cols-2">
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm bg-slate-50 hover:shadow-lg">
            <h3 class="text-xl uppercase">Crear</h3>
            <br>
            <form method="post" on:submit|preventDefault={createUser}>
                NOMBRE:<input type="text" class="rounded-sm border-gray-200 border-2 w-full" bind:value={userData.name} maxlength="30">
                <br>
                CONTRASEÑA:<input type="password" class="rounded-sm border-gray-200 border-2 w-full" bind:value={userData.password}>
                <br>
                <label>ROL:</label>
                <br>
                {#await roles}
                    <p>Cargando roles...</p>
                {:then roles}
                    <select name="" class="bg-white border-2 border-gray-200" bind:value={userData.role_id}>
                        {#each roles as r}
                            {#if r.id > $rol}
                                <option value={r.id}>{r.role}</option>
                            {/if}
                        {/each}
                    </select>
                {/await}
                <hr class="py-1.5">
                <input type="submit" class="bg-white border-rose-900 border-2 uppercase text-rose-900 rounded-sm p-2 hover:bg-rose-900 hover:text-white" value="CREAR">
            </form>
        </div>
    </div>
    <div class="px-2">
        <div class="py-3 px-8 border-gray-400 border-2 rounded-sm hover:shadow-lg">
            <label class="text-lg uppercase" >Lista usuarios</label>
            <br>
            <br>
            <table class="w-full">
                <thead>
                    <tr class="text-center justify-center">
                        <th class="py-1 text-center justify-center">ID</th>
                        <th class="py-1 text-center justify-center">Nombre</th>
                        <th class="py-1 text-right justify-items-end">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                {#await users}
                    <tr class="border-b-2">
                        <td class="py-1 text-center justify-center">...</td>
                        <td class="py-1 text-center justify-center">...</td>
                        <td class="py-1 justify-end text-right">...</td>
                        <td class="justify-items-end text-left">
                        </td>
                    </tr>
                {:then users}
                    {#each users as user}
                        <tr class="border-b-2">
                            <td class="py-1 text-center justify-center">{user.id}</td>
                            <td class="py-1 text-center justify-center">{user.name}</td>
                            <td class="justify-items-end text-left">
                                {#if $rol < user.role_id}
                                    <div class="justify-items-end justify-end text-right">
                                        <button class="px-1 bg-white border-2 border-slate-800 text-black hover:bg-slate-800 hover:text-white"><small>EDITAR</small></button>
                                    </div>
                                    {:else}
                                    <p class="justify-items-end justify-end text-right">...</p>
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