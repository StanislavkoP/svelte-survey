<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
    import { afterUpdate } from 'svelte';
    import { Questionary } from './QuestionatyModel.js';
    import Page from './Page.svelte';

    export let survey = null;
    let page = null;

    let initialized = false;
    let progress = tweened(1, {
		duration: 400,
		easing: cubicOut
    });

    function onNextPage () {
        survey.currentPage = survey.onNextPage();
        progress.set(survey.progress);
    }

    function onPrevPage () {
        survey.currentPage = survey.onPrevPage();
        progress.set(survey.progress);
    }

    function getAnswers () {
        
        let answers = {};

        survey.config.pages.map((page, index) => {
            page.elements.map(element => (Object.assign(answers, {[element.valueName]: element.value}) ));
        });

        console.log(answers)
    }
</script>

<style>
    .progress__bar {
        height : 10px;
        width: 300px;
    }

    .progress__bar-line {
        height : 100%;
        background-color: black;
    }
</style>


<h1>Questionary</h1>
<button on:click={() => console.log(survey)}>click</button>
<button on:click={getAnswers}>click</button>


{#if survey }
    <div class="survey">
        <div class="progress">
            <div class="progress__steps">
                <span class="progress__current-page">{ survey.currentPageNum }</span>
                <span>из</span>
                <span class="progress_amount-page">{ survey.amountPages }</span>
            </div>

            <div class="progress__bar">
                <div class="progress__bar-line" style={`width: ${$progress}%`}></div>
            </div>
        </div>

        <Page page={survey.currentPage} />
        <div class="survey__bottom">
            <button on:click={onPrevPage}>Prev page</button>
            <button on:click={onNextPage}>Next page</button>
        </div>
    </div>
{/if}