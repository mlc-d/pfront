<script>
    import { username } from "../stores/session.js";
    import { authenticated } from "../stores/auth.js"
</script>

<div class="bg-slate-900 grid grid-cols-2 sticky text-gray-50 footer w-full py-0">
    <div><p></p></div>
    <!--{#if authenticated} 🔴 -->
    {#if $authenticated}
        <div class="text-right">
            <small class="px-3"> 🟢 connected as: <strong>{$username}</strong></small>
        </div>
        {:else}
        <div class="text-right">
            <small class="px-3">🔴 disconnected</small>
        </div>
    {/if}
    <!--{/if}-->
</div>

<style>
    .footer {
        position:fixed;
        bottom: 0;
    }
</style>