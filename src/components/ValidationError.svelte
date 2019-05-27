{#if isShowed}
    <div class="error">
        <div class="error-text">{ errorText }</div>
    </div>
{/if}


<script>
    export let isShowed = false;
    export let errorText = '';
</script>

<style>
    .error-text {
        padding: 12px 10px;
        width: 100%;
    }

    .error {
        font-size: 14px;
        padding: 6px;
        color: white;
        background-color: rgba(245, 70, 52, 0.9);
    }

</style>