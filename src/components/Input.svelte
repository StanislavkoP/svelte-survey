<script>
    export let element;
    
</script>

<style>
    .question__group-input--text {
        padding: 12px 10px;
        margin: 0;
        width: 100%;
    }

    .question__group-input--text.hasError {
        border-color: rgba(245, 70, 52, 0.9);
    }

    .question__error {
        font-size: 14px;
        padding: 6px;
        color: white;
        background-color: rgba(245, 70, 52, 0.9);
    }
</style>


{#if element.isValid === false}
    <div class="question__error">
    <div class="question__error--text">{element.errorText}</div>
    </div>
{/if}
{#if element.type === 'date'}
    <input
        type="date"
        class="question__group-input--text"
        class:hasError={element.isValid === false}
        bind:value={element.value}
        name={element.valueName}
        placeholder={element.placeHolder} 
    />
{:else if element.type === 'email'}
    <input
        type="email"
        class="question__group-input--text"
        class:hasError={element.isValid === false}
        bind:value={element.value}
        name={element.valueName}
        placeholder={element.placeHolder} 
    />
{:else}
    <input
        class="question__group-input--text"
        class:hasError={element.isValid === false}
        bind:value={element.value}
        name={element.valueName}
        placeholder={element.placeHolder} 
    />
{/if}