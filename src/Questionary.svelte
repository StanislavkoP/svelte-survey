<script>
    import { afterUpdate } from 'svelte';
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

    let currentPage = null;

    afterUpdate(() => {
        console.log('update')
        if (survey !== null && currentPage === null) currentPage = survey.currentPage;
    });

    function onNextPage () {
        survey.onNextPage();
        currentPage = survey.currentPage;
        progress.set(survey.progress);
    }

    function onPrevPage () {
        survey.onPrevPage();
        currentPage = survey.currentPage;
        progress.set(survey.progress);
    }

    function getAnswers () {
        
        let answers = {};

        survey.config.pages.map((page, index) => {
            page.elements.map(element => ({...answers, [element.valueName]: element.value }));
        });

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
<button on:click={() => console.log(currentPage)}>get current page</button>


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

        {#if currentPage}
            <Page page={currentPage} />
        {/if}
        
        <div class="survey__bottom">
            {#if survey.config.firstPageIsStarted}
                <button class="btn survey__bottom-btn" on:click={() => alert('Начать')}>Начать</button>

            {:else}
                <button class="btn survey__bottom-btn" on:click={onPrevPage}>Назад</button>
                {#if survey.currentPageNum !== survey.amountPages}
                    <button class="btn survey__bottom-btn" on:click={onNextPage}>Далее</button>
                {:else}
                    <button class="btn survey__bottom-btn" on:click={() => alert('finished')}>Закончить</button>
                {/if}
           
            {/if}


        </div>
    </div>

{:else}
    <Loader/>
{/if}