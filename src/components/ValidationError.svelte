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
    .error {
        font-size: 16px;
        padding: 12px 12px;
        color: white;
        background-color: #eb4d4b;
    }

</style>