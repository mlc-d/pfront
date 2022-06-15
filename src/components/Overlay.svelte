<script>

    import { fade } from "svelte/transition";
    import { isOverlayOpen } from "../stores/Overlay";

</script>


<div class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center" transition:fade>
    <div class="bg-slate-800 text-white py-10 px-8 rounded-sm relative max-w-lg shadow-lg shadow-black">
        <slot />
    </div>
</div>