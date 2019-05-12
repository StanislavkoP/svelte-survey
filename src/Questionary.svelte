<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
    import { Questionary } from './QuestionatyModel.js';
    import Loader from './Loader'
    import Page from './Page';

    let survey = null;
    let progress = tweened(0, {
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

    export {
        survey
    }
</script>

<style>
    .survey {
        font-size: 18px;
        line-height: 1.72;
    }

    .survey *{
        box-sizing: border-box;
    }

    .progress__bar {
        height : 10px;
        background-color: rgba(0, 0, 0, 0.1)
    }

    .progress__bar-line {
        height : 100%;
        background-color: #4570FF;
    }

    .survey__bottom {
        margin-top: 20px;
    }
    

    .btn {
        background-color: transparent;
        margin: 0;
        padding: 12px;
        border-color: #4570FF;
        color: #4570FF;
        cursor: pointer;
    }

    .btn:hover {
        background-color: #4570FF;
        color: white;
    }

    .survey__bottom {
        display: flex;
        justify-content: center;
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

        <Page  x={1} page={survey.currentPage} />
        <div class="survey__bottom">
            <button class="btn survey__bottom-btn" on:click={onPrevPage}>Назад</button>
            {#if survey.currentPageNum !== survey.amountPages}
                <button class="btn survey__bottom-btn" on:click={onNextPage}>Далее</button>
            {:else}
                <button class="btn survey__bottom-btn" on:click={() => alert('finished')}>Закончить</button>
            {/if}
        </div>
    </div>

{:else}
    <Loader/>
{/if}