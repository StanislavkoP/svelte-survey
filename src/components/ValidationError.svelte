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

    @media only screen and (max-width: 480px) {
         .error {
            font-size: 15px;
            padding: 6px 10px;
        }
    }





</style>