<h1>Questionary</h1>
<button on:click={() => console.log(survey)}>click</button>
<button on:click={getAnswers}>click</button>
<button on:click={() => console.log(currentPage, currentPageNum)}>get current page</button>

{#if survey }
    
    <select bind:value={currentPageNum} on:change={() => {survey.currentPageNum = currentPageNum; currentPage = survey.currentPage}}>
        {#each survey.config.pages as page, index}
            <option value={index}>
                {page.title}
            </option>
        {/each}
    </select>

    {#if visible}
        <div class="survey">
            <div 
                transition:fade
                on:outroend={() => visible = true}
            >
                {#if survey.surveyIsStarted}
                    <div class="progress">
                        <div class="progress__steps">
                            <span class="progress__current-page">{ currentPageNum ? currentPageNum : 0 }</span>
                            <span>из</span>
                            <span class="progress_amount-page">{ survey.amountPages }</span>
                        </div>

                        <div class="progress__bar">
                            <div class="progress__bar-line" style={`width: ${$progress}%`}></div>
                        </div>
                    </div>
                {/if}
                
            
                
                
                
                {#if survey}
                    <Page page={currentPage} />

                    <div class="survey__bottom">

                        {#if survey.config.firstPageIsStarted && currentPageNum === 0}
                            <button class="btn survey__bottom-btn" on:click={onStartSurvey}>{ survey.config.startButtonText || 'Начать' }</button>

                        {:else}
                            {#if currentPageNum > 1}
                                <button class="btn survey__bottom-btn" on:click={onPrevPage}>Назад</button>
                            {/if}

                            {#if currentPageNum !== survey.amountPages}
                                <button class="btn survey__bottom-btn" on:click={onNextPage}>Далее</button>
                            {/if}

                            {#if currentPageNum === survey.amountPages}
                                <button class="btn survey__bottom-btn" on:click={onFinishSurvey}>{survey.config.completeButtonText || 'Закончить'}</button>
                            
                            {/if}
                    
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    {/if}

{:else}
    <Loader/>

{/if}


<script>
    import { onMount, afterUpdate } from 'svelte';
    import { fade } from 'svelte/transition';
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
    let currentPageNum = null;
    let visible = false;


    afterUpdate(() => {
        if (survey !== null && currentPage === null) {
            currentPage = survey.currentPage;
            visible = true;
        } 
        if (survey !== null && currentPageNum === null) {
            currentPageNum = survey.currentPageNum;
        }
    });

    function onNextPage () {
        survey.onNextPage(() => {
            visible = false;
        });
        currentPage = survey.currentPage;
        currentPageNum = survey.currentPageNum;
        progress.set(survey.progress);
    }

    function onPrevPage () {
        survey.onPrevPage(() => {
            visible = false;
        });
        currentPage = survey.currentPage;
        currentPageNum = survey.currentPageNum;
        progress.set(survey.progress);
    }

    function getAnswers () {
        console.log(survey.userAnswers )
    }

    function onStartSurvey() {
        survey.onStartSurvey(() => {
            visible = false;
        });
        currentPageNum = survey.currentPageNum;
        currentPage = survey.currentPage;
       
    }

    function onFinishSurvey() {
        survey.onFinishSurvey(() => console.log('finish'));
        currentPage = survey.currentPage;
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