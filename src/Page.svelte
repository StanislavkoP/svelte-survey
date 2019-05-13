<script>
  import flatpickr from "flatpickr";
  import { onMount, afterUpdate } from "svelte";

  import Input from "./components/Input";


  export let page = null;

  afterUpdate(() => {
    if (document.querySelector('#survey input[type="date"]')) {
      flatpickr("input[type='date']", {
        dateFormat: "d.m.Y",
        maxDate: "today"
      });
    }
  });

    //TODO Add id for each element in page.elements
  function onChange(e, element, indexElement) {
    if (e.target.value === 'other') {

      page.elements[indexElement].otherIsSelected = true;
    }

    if (element.otherIsSelected && e.target.value !== 'other') {
      page.elements[indexElement].otherIsSelected = false;
	}
	
	console.log(element)
  }
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
    border: 1px solid #4570ff;
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
    background-color: #4570ff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .question__group-input[type="radio"]:checked
    ~ .question__group-label
    .question__group-fake-input::after {
    opacity: 1;
  }

	.question__group-textarea {
		resize: none;
		width: 100%;
		animation:  swing-in-top-out 0.7s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
	}

	.question__group-textarea.active {
		animation: swing-in-top-in 0.7s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
	}

	@keyframes swing-in-top-in {
		0% {
			transform: rotateX(-90deg);
			transform-origin: top;
		}
		100% {
			transform: rotateX(0deg);
			transform-origin: top;
			height: 150px;
		}
	}
	@keyframes swing-in-top-out {
		0% {
			transform: rotateX(0);
			transform-origin: top;
			opacity: 1;
		}
		90% {
			opacity: 0;
		}
		100% {
			transform: rotateX(-90deg);
			transform-origin: top;
			height: 0;
		}
	}


</style>

{#if page && Object.keys(page).length > 0}
  <div class="page">
    <h2 class="page__title">{page.title}</h2>

    {#each page.elements as element, elementIndex}
      <div class="page__question">
        {#if element.type === 'radiogroup'}
          {#each element.choices as choice, choiceIndex}
            <div class="question__group question__group--radio">
              <input
                id={`page-${page.countPage}-input${choiceIndex}`}
                class="question__group-input"
                type="radio"
                value={choice.value || choice}
                bind:group={element.value}
                on:change={e => onChange(e, element, elementIndex)} />
              <label
                for={`page-${page.countPage}-input${choiceIndex}`}
                class="question__group-label">
                <span class="question__group-fake-input" />
                <span class="question__group-text">
                   {choice.text || choice}
                </span>
              </label>

            </div>
          {/each}

          {#if element.hasOther}
            <div class="question__group question__group--radio">
              <input
                id={`page-${page.countPage}-input-other`}
                class="question__group-input"
                type="radio"
                name={element.name}
                value="other"
                bind:group={element.value}
                on:change={e => onChange(e, element, elementIndex)} />
              <label
                for={`page-${page.countPage}-input-other`}
                class="question__group-label">
                <span class="question__group-fake-input" />
                <span class="question__group-text">
                   {element.otherText || 'Другое'}
                </span>
              </label>
            </div>
          {/if}


            <textarea
				class:active={element.otherIsSelected}
				class="question__group-textarea"
				bind:value={element.otherValue}
				name={element.name}
			/>

		{:else if element.type === 'html'}
			{@html element.html}

        {:else}
          <label class="question__group">
            <div class="question__group-text">{element.title}</div>
				<Input {element}/>
          </label>
        {/if}
      </div>
    {/each}
  </div>
{/if}
