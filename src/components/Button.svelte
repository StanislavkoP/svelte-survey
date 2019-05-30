<button class={`btn survey__bottom-btn ${ className }`} on:click={onClick}>{ text }</button>

<script>
    export let className = '';
    export let onClick;
    export let text = '';
</script>

<style>
    .btn {
        width: 200px;
        margin: 0;
        margin-right: 16px;
        padding: 12px;
        color: #fff;
        border: none;
        cursor: pointer;
        background-size: 300% 100%;
        background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
        box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
        transition: background-image .4s ,  background-position .4s ease;
    }

    .btn:hover {
        background-position: 100% 0;
    }

    .btn--gradient-left {
        background-image: linear-gradient(to left, #25aae1, #4481eb, #04befe, #3f86ed);
    }

</style>