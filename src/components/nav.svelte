<script>
    import { rol } from "../stores/session.js";
</script>

<nav class="flex border-rose-800 border-2 py-1 hover:shadow-md px-2">
    <div>
        <a class="mx-2 text-lg text-gray-800 uppercase font-extrabold" href="/">>_</a>
        {#if $rol <= 4}
        <div class="dropdown">
            <span class="uppercase">administración</span>
            <div class="dropdown-content bg-gray-50 border-rose-900 border-2 rounded-sm">
                <a class="mx-2 text-lg text-gray-800" href="/batches">Lotes</a>
                <a class="mx-2 text-lg text-gray-800" href="/products">Productos</a>
                <a class="mx-2 text-lg text-gray-800" href="/locations">Ubicaciones</a>
                <a class="mx-2 text-lg text-gray-800" href="/users">Usuarios</a>
                <a class="mx-2 text-lg text-gray-800" href="/skus">Skus</a>
            </div>
        </div>
        {/if}
        <div class="dropdown">
            <span class="uppercase">Operaciones</span>
            <div class="dropdown-content bg-gray-50 border-rose-900 border-2 rounded-sm">
                <a class="mx-2 text-lg text-gray-800" href="/operations/infoitem">Buscar UIC</a>
                <a class="mx-2 text-lg text-gray-800" href="/operations/createitem">Crear ítems</a>
                <a class="mx-2 text-lg text-gray-800" href="/operations/allocate">Movimientos</a>
            </div>
        </div>
        <a class="mx-2 uppercase text-right" href="/logout">Logout</a>
    </div>
</nav>

<style>
    .dropdown {
        position: relative;
        display: inline-block;
        padding-right: 1em;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        min-width: 160px;
        padding: 12px 16px;
        z-index: 1;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }
</style>