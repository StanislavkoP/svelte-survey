{#if element}
    <div class="input-group">
        <label>
            <div>{ element.title }</div>
                <ValidationError  isShowed={element.isValid === false} errorText={element.errorText}/>
            {#if element.type === 'date'}
                <input
                    type="date"
                    class="input-group__input--text"
                    class:hasError={element.isValid === false}
                    bind:value={element.value}
                    name={element.valueName}
                    placeholder={element.placeHolder} 
                    on:input={(e) => {element.isValid = true}}
                />
            {:else if element.type === 'email'}
                <input
                    type="email"
                    class="input-group__input--text"
                    class:hasError={element.isValid === false}
                    bind:value={element.value}
                    name={element.valueName}
                    placeholder={element.placeHolder} 
                    on:input={(e) => {element.isValid = true}}
                />
            {:else}
                <input
                    class="input-group__input--text"
                    class:hasError={element.isValid === false}
                    bind:value={element.value}
                    name={element.valueName}
                    placeholder={element.placeHolder} 
                    on:input={(e) => {element.isValid = true}}
                />
            {/if}

        </label>
    </div>
{/if}


<script>
    import ValidationError from './ValidationError.svelte';

    export let element = null;
    export let change;
    
</script>

<style>
    .input-group__input--text {
        padding: 12px 10px;
        margin: 0;
        width: 100%;
    }

    .input-group__input--text.hasError {
        border-color: rgba(245, 70, 52, 0.9);
    }

</style>
