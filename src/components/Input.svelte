{#if element}
    <div class="input-group">
        <label>
            <div class="input-group__title">{ element.title }</div>
                <ValidationError  isShowed={element.isValid === false} errorText={element.errorText}/>
            
            {#if element.type === 'date'}
                <input
                    type="date"
                    class="input-group__input--text"
                    autocomplete={element.autocomplete || ''}
                    class:hasError={element.isValid === false}
                    bind:value={element.value}
                    name={element.valueName}
                    placeholder={element.placeHolder || ''} 
                    on:input={(e) => {element.isValid = true}}
                />
            
            {:else if element.type === 'email'}
                <input
                    type="email"
                    class="input-group__input--text"
                    autocomplete={element.autocomplete || ''}
                    class:hasError={element.isValid === false}
                    bind:value={element.value}
                    name={element.valueName}
                    placeholder={element.placeHolder || ''} 
                    on:input={(e) => {element.isValid = true}}

                />

            {:else if element.type === 'tel'}
                <input
                    type="tel"
                    class="input-group__input--text"
                    autocomplete={element.autocomplete || ''}
                    class:hasError={element.isValid === false}
                    bind:value={element.value}
                    name={element.valueName}
                    placeholder={element.placeHolder || ''} 
                    on:input={(e) => {element.isValid = true}}
                />
            
            {:else}
                <input
                    type="text"
                    class="input-group__input--text"
                    autocomplete={element.autocomplete || ''}
                    class:hasError={element.isValid === false}
                    bind:value={element.value}
                    name={element.valueName}
                    placeholder={element.placeHolder || ''} 
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
    export let tabindex;
    
</script>

<style>
    .input-group__input--text {
        padding: 12px 10px;
        margin: 0;
        width: 100%;
        background-color: transparent;
        border: 1px solid black;
        border-radius: 0;
    }

    .input-group__input--text.hasError {
        border-color: #eb4d4b;
    }

    @media only screen and (max-width: 480px) {

        .input-group__title {
            font-size: 18px;
        }


    }


</style>
