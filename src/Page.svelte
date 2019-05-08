<script>
    let page = null;

    export {
        page
    }
</script>



{#if page}
    <div class="page">
        <h2 class="page__title">{ page.title }</h2>
        {#each page.elements as element}
            {#if element.type === 'radiogroup'}
                
                {#each element.choices as choice}
                    <label class="question__group">
                        <span class="question__group-text">{choice.text}</span>
                        <input class="question__group-input" type="radio" name={element.name} value={choice.value} bind:group={element.value}>
                    </label>
                {/each}
            
            {:else}
                <label class="question__group">
                    <div class="question__group-text">{element.title}</div>
                    <input bind:value={element.value} name={element.valueName} placeholder={element.placeHolder}>
                </label>
            {/if}
        {/each}
    </div>
{/if}

