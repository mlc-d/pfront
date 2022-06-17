<script>
    import { goto } from "$app/navigation";
    import { authenticated, token } from "../stores/auth.js";
    import { active_user_id, rol, username } from "../stores/session.js";
    import jwt_decode from 'jwt-decode';

    let formInfo = {
        name: "",
        password: "",
    };

    const logIn = async () => {
        let logInDetails = {
            name: formInfo.name,
            password: formInfo.password
        }
        try{
            let myHeaders = new Headers();
            myHeaders.append("Content-type", "application/json")
            const res = await fetch('http://localhost:1998/login', {
                method: 'POST',
                headers: myHeaders,
                credentials: 'include',
                body: JSON.stringify(logInDetails)
            });
            const data = await res.json();
            if ("accToken" in data) {
                token.set(data.accToken);
                username.set(jwt_decode($token)["sub"]);
                rol.set(jwt_decode($token)["rol"]);
                active_user_id.set(jwt_decode($token)["uid"]);
                authenticated.set(true);
                await goto('/');
            }
        }catch (error) {
            console.log("error: ", error)
        }
    }
</script>

<section class="h-full gradient-form bg-gray-200 md:h-screen">
    <div class="container py-12 h-full">
        <div class="flex justify-center items-center flex-wrap h-full text-gray-800">
            <div class="xl:w-8/12">
                <div class="block bg-white sm">
                    <div class="lg:flex lg:flex-wrap g-0 justify-center bg-gray-300">
                        <div class="lg:w-5/12 px-4 md:px-0">
                            <div class="md:p-12 md:mx-6 bg-slate-800 text-center text-white">
                                <form>
                                    <p class="mb-4 text-2xl">Iniciar sesión</p>
                                    <div class="mb-4">
                                        <input
                                                type="text"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="1"
                                                placeholder="nombre de usuario"
                                                maxlength="30"
                                                bind:value={formInfo.name}
                                        />
                                    </div>
                                    <div class="mb-4">
                                        <input
                                                type="password"
                                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="2"
                                                placeholder="contraseña"
                                                bind:value={formInfo.password}
                                        />
                                    </div>
                                    <div class="text-center pt-1 mb-12 pb-1">
                                        <button
                                                class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded-sm focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 border-white border-2 hover:bg-rose-700"
                                                type="button"
                                                data-mdb-ripple="true"
                                                data-mdb-ripple-color="light"
                                                on:click|preventDefault={logIn}
                                        >
                                            Log in
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style></style>