<script>
    import { onMount } from 'svelte';
    let page = null;

    export {
        page
	}
	
	
	onMount(() => {
        flatpickr('input[type="date"]')
	});
	

</script>

<style>
    .page {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .page__question {
        margin-top: 6px;
        width: 100%;
        max-width: 400px;
    }

    .page__title {
        margin: 0;
    }

    .question__group:not(:first-child) {
        margin-top: 8px;
    }

    .question__group--radio:not(:first-child) {
        margin-top: 0;
    }

    
    .question__group-label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .question__group-input {
        display: none;
    }

    .question__group-fake-input {
        position: relative;
        display: block;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        border: 1px solid #4570FF;
        border-radius: 50%;
    }

    .question__group-fake-input::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 10px;
        height: 10px;
        background-color: #4570FF;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .question__group-input[type='radio']:checked ~ .question__group-label .question__group-fake-input::after{
        opacity: 1;
    }

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

{#if page}
    <div class="page">
        <h2 class="page__title">{ page.title }</h2>
        {#each page.elements as element}
            <div class="page__question">
                {#if element.type === 'radiogroup'}
                    {#each element.choices as choice, i}
                        <div class="question__group question__group--radio">
                            <input id={`page-${page.countPage}-input${i}`} class="question__group-input" type="radio" name={element.name} value={choice.value} bind:group={element.value}>
                            <label for={`page-${page.countPage}-input${i}`} class="question__group-label">
                                <span class="question__group-fake-input"></span>
                                <span class="question__group-text">{choice.text}</span>
                            </label>
                        </div>

                    {/each}
                
                {:else}
                    <label class="question__group">
                        <div class="question__group-text">{element.title}</div>
							{#if element.isValid === false}
                                <div class="question__error">
                                    <div class="question__error--text">{element.requiredErrorText}</div>
                                </div>
                            {/if}

							{#if element.type === 'date'}

                        		<input type="date" class:hasError={element.isValid === false} class="question__group-input--text" bind:value={element.value} name={element.valueName} placeholder={element.placeHolder}>

							{:else}
                        		<input class:hasError={element.isValid === false} class="question__group-input--text" bind:value={element.value} name={element.valueName} placeholder={element.placeHolder}>

							{/if}
                    </label>
                {/if}
            </div> 
        {/each}
    </div>
{/if}

