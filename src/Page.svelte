{#if page && Object.keys(page).length > 0}
	<form on:submit|preventDefault class="page" >
		{#if !page.titleHidden}
			<h2 class="page__title">{page.title}</h2>
		{/if}
		<div class="page__questions">
			{#each page.elements as element, indexElement (element.id)}
				<div class="page__question">
					{#if element.type === 'radiogroup'}
						<ValidationError isShowed={element.isValid === false} errorText={element.errorText}/>
						{#each element.choices as choice, choiceIndex (choice.value || choice)}
							<div class="input-group">
								<input
									id={element.id + (choice.value || choice).split(' ').join('-')}
									class="input-group__input"
									type="radio"
									name={element.name}
									value={choice.value || choice}
									bind:group={element.value}
									on:change={(e) => (toggleSelectOther(e, element), hideError(element))}
								/>

								<label for={element.id + (choice.value || choice).split(' ').join('-')} class="input-group__label" tabindex="0">
									<span class="input-group__fake-input input-group__fake-input--radio" />
									<span class="input-group__text">{ choice.name || choice }</span>
								</label>
							</div>
						{/each}

						{#if element.hasOther}
							<div class="input-group">
								<input
									id={element.name + '-other'}
									class="input-group__input"
									type="radio"
									value={element.name + '-other'}
									name={element.name}
									bind:group={element.value}
									on:change={(e) => (toggleSelectOther(e, element), hideError(element))}
								/>

								<label for={element.name + '-other'} class="input-group__label" tabindex="0">
									<span class="input-group__fake-input input-group__fake-input--radio" />
									<span class="input-group__text">{ element.otherText || 'Другое' }</span>
								</label>

								<textarea
									class="input-group__textarea input-group__textarea--other"
									name={element.name + '-other'}
									bind:value={element.otherValue}
									tabindex={element.otherIsSelected ? "0" : "-1"}
								/>
							</div>

						{/if}
				
					{:else if element.type === 'checkbox'}
						<ValidationError isShowed={element.isValid === false} errorText={element.errorText}/>
						{#each element.choices as choice, choiceIndex (choice.value || choice)}
							<div class="input-group">
								<input
									id={element.id + (choice.value || choice).split(' ').join('-')}
									class="input-group__input"
									type="checkbox"
									value={choice.value || choice}
									name={element.name}
									bind:group={element.value}
									on:change={(e) => (toggleSelectOther(e, element), hideError(element))}
								/>

								<label for={element.id + (choice.value || choice).split(' ').join('-')} class="input-group__label" tabindex="0">
									<span class="input-group__fake-input input-group__fake-input--checkbox" />
									<span class="input-group__text">{ choice.name || choice }</span>
								</label>
							</div>
						{/each}

						{#if element.hasOther}
							<div class="input-group">
								<input
									id={element.name + '-other'}
									class="input-group__input"
									type="checkbox"
									value={element.name + '-other'}
									name={element.name}
									bind:checked={element.otherIsSelected}
									on:change={(e) => hideError(element)}
								/>

								<label for={element.name + '-other'} class="input-group__label" tabindex="0">
									<span class="input-group__fake-input input-group__fake-input--checkbox" />
									<span class="input-group__text">{ element.otherText || 'Другое' || ''}</span>
								</label>
								<textarea
									class="input-group__textarea input-group__textarea--other"
									name={element.name + '-other'}
									bind:value={element.otherValue}
									tabindex={element.otherIsSelected ? "0" : "-1"}
								/>
							</div>
						{/if}
				
					{:else if element.type === 'html'}
						{@html element.html}

					{:else if element.type === 'textarea'}
						<ValidationError isShowed={element.isValid === false} errorText={element.errorText}/>
						<textarea
							class="input-group__textarea"
							name={element.name}
							bind:value={element.value}
							tabindex="0"
						/>

					{:else}
						<Input element={element} />

					{/if}


				</div>
			{/each}
		</div>
	</form>
{/if}


<script>
	import flatpickr from "flatpickr/dist/flatpickr";
	import { onMount, afterUpdate } from "svelte";
	import { fade } from "svelte/transition";

	import Input from './components/Input.svelte';
	import ValidationError from './components/ValidationError';

	export let page = null;


	afterUpdate(() => {
		if (document.querySelector('#survey input[type="date"]')) {
			flatpickr("input[type='date']", {
			dateFormat: "d.m.Y",
			maxDate: "today",
			disableMobile: true,
			})
		}
	});

	function hideError (element) {
		element.isValid = true;
	}

	function toggleSelectOther (e, element) {
		if (e.target.value === element.name + '-other' && e.target.type === 'radio') {
			element.otherIsSelected = true;
			
		}

		if (e.target.value !== element.name + '-other' && e.target.type === 'radio') {
			element.otherIsSelected = false;
		
		}
	}
</script>

<style>
	.page {
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.page__questions {
		text-align: left;
	}

	.page__question {
		margin-top: 18px;
	}

	.page__title {
		margin: 0;
		line-height: 1.4;
		font-weight: 800;
	}

	.input-group__input {
		display: none;
  	}

	.input-group {
   		margin-bottom: 8px;
	}

	.input-group__label {
		display: flex;
		cursor: pointer;
	}

	.input-group__fake-input {
		position: relative;
		display: block;
		width: 20px;
		height: 20px;
		margin-right: 6px;
		border: 1px solid #4570ff;
		flex-shrink: 0;
		margin-top: 7px;
	}

	.input-group__fake-input--checkbox {
		border-radius: 2px;
	}

  .input-group__fake-input--checkbox::after,
  .input-group__fake-input--checkbox::before {
	content: "";
	display: block;
	position: absolute;
	top: 50%;
	left: 50%;
	height: 2px;
	border-radius: 0;
	background-color: #4570ff;
	opacity: 0;
	z-index: 1;
	transform: translate(-50%, -50%);
	transition: opacity 0.3s ease;
  }

  .input-group__fake-input--checkbox::before {
	transform: rotate(-50deg);
	width: 14px;
	margin-left: -4px;
	margin-top: -1px;
  }

  .input-group__fake-input--checkbox::after {
	margin-left: -8px;
	margin-top: 1px;
	width: 8px;
	transform: rotate(40deg);
  }

  .input-group__input:checked ~ .input-group__label .input-group__fake-input::after,
  .input-group__input:checked ~ .input-group__label .input-group__fake-input::before {
	 	opacity: 1;
  	}

	.input-group__fake-input--radio {
		border-radius: 50%;
	}

	.input-group__fake-input--radio::after {
		content: "";
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 12px;
		height: 12px;
		opacity: 0;
		border-radius: 50%;
		background-color: #4570ff;
		transform: translate(-50%, -50%);
		transition: opacity 0.3s ease;
	}

	.input-group__fake-input--radio:checked ~ .input-group__label .input-group__fake-input::after {
		opacity: 1;
	}

	.input-group__textarea {
		width: 100%;
		height: 150px;
		padding: 6px 10px;
		line-height: 1.55;
		resize: none;
		overflow: auto;
	}

	.input-group__textarea.input-group__textarea--other {
		width: 100%;
		height: 0;
		opacity: 0;
		margin-top: 4px;		
		resize: none;
		overflow: hidden;
		transform: scale(-1);
		will-change: transform, opacity, height;
		transition: transform 0.3s, opacity 0.3s, height 0.2s ease;
	}

	.input-group__input:checked ~ .input-group__textarea.input-group__textarea--other {
		height: 150px;
		opacity: 1;
		overflow: auto;
		transform: scale(1);
	}

	@media only screen and (max-width: 810px) {
		.page__title {
			font-size: 28px;
		}
	}
	
	@media only screen and (max-width: 480px) {
		.page__title {
			font-size: 20px;
		}

		.input-group {
			font-size: 17px;
		}

		.input-group__fake-input {
			margin-top: 5px;
		}
    }
</style>

