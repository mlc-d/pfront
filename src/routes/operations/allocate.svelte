<script>
    import { authenticated, token } from "../../stores/auth.js";
    import { apiFetch } from "../../interceptors/fetch";
    import { active_user_id, checkAuth } from "../../stores/session.js";

    let items = [];
    let input = "";
    let location = {};
    let l = "";
    $: validLocation = false;
    $: unfulfilledRequest = false;
    $: errors = [];

    const getLocation = async () => {
        try {
            l = l.trim();
            if (l === "") {
                return;
            }
            let { res, data } = await apiFetch(
                `/api/v1/location?l=${l}`,
                {},
                $token
            );
            if (data.error) {
                alert(data["error"]);
                return;
            }
            location = data;
            validLocation = true;
        } catch (error) {
            console.log(error);
        }
    };

    const allocateItem = async () => {
        try {
            switch (input) {
                case "":
                    break;
                case "##OK##":
                    let { res, data } = await apiFetch(
                        "/api/v1/allocate",
                        {
                            method: "PATCH",
                            body: JSON.stringify(items),
                        },
                        $token
                    );
                    input = "";
                    items = [];
                    if (data.error) {
                        unfulfilledRequest = true;
                        errors = data.error;
                        console.log(data);
                        break;
                    }
                    unfulfilledRequest = false;
                    break;
                case "ABORT!":
                    items = [];
                    input = "";
                    unfulfilledRequest = false;
                    break;
                default:
                    const newItem = {
                        uic: input,
                        location_id: location.id,
                        user_id: parseInt($active_user_id),
                    };
                    items.push(newItem);
                    console.log(items);
                    input = "";
                    unfulfilledRequest = false;
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

</script>

<!---->

<div class="flex justify-evenly justify-items-center text-center uppercase">
    <div class="border-2 border-rose-900 p-3">
        <h2 class="uppercase text-xs">ubicación</h2>
        <br />
        <form action="" method="">
            <input type="text" name="" id="" bind:value={l} maxlength="9" />
            <button
                class="border-2 border-slate-800 rounded-sm py-1 px-2"
                on:click|preventDefault={getLocation}>HEY</button
            >
        </form>
        <br />
        {#if validLocation}
            <p class="uppercase text-xs">Ingrese los UIC a reubicar</p>
            <form action="" on:submit|preventDefault={allocateItem}>
                <input
                    type="text"
                    bind:value={input}
                    class="border-2 border-slate-800 rounded-sm"
                    maxlength="6"
                />
            </form>
        {/if}
        {#if unfulfilledRequest}
            <p class="uppercase text-xs">errores:</p>
            <div
                class="p-4 border-2 border-rose-900 rounded-sm uppercase bg-rose-400"
            >
                {#each errors as error}
                    <p>{error}</p>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style></style>
