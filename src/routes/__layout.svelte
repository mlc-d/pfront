<script>
    import Nav from "../components/nav.svelte"
    import Foot from "../components/foot.svelte";
    import "../app.css";
</script>
<div class="bg-gray-50">
    <Nav />
    <div class="p-2">
        <slot></slot>
    </div>
</div>
<Foot />
