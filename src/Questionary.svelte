<h1>Questionary</h1>



{#if survey }

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

    {#if visible}
        <div class="survey">
            <div 
                transition:fade
                on:outroend={() => visible = true}
            >
                {#if survey && surveyIsFinished === false}
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

                    {:else}
                        <div>
                            {#each survey.userAnswersAdvancedOption as question (question.title)}
                                <ul>
                                    <li>{ question.title }</li>
                                    <ul>
                                        {#each question.answers as answer (answer.valueName)}
                                            {#if question.title.includes('Введите свои персональные данные')}
                                                <li>{answer.valueName} : {answer.value}</li>

                                            {:else}
                                                 <li>{answer.value}</li>
                                            {/if}
                                            
                                        {/each}
                                    </ul>
                                </ul>
                            {/each}
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
    let surveyIsFinished = false;

    export {
        survey
    }


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
        console.log(survey.userAnswersAdvancedOption )
    }

    function onStartSurvey() {
        survey.onStartSurvey(() => {
            visible = false;
        });
        currentPageNum = survey.currentPageNum;
        currentPage = survey.currentPage;
       progress.set(survey.progress);
    }

    function onFinishSurvey() {
        survey.onFinishSurvey(() => console.log('finish'));
        surveyIsFinished = survey.surveyIsFinished;
        return;
    }

</script>

<style>
    .survey {
        font-size: 18px;
        line-height: 1.72;
        box-sizing: border-box;
    }

    .survey * {
        box-sizing: border-box;
    }

    .progress__bar {
        height : 10px;
        background-color: rgba(0, 0, 0, 0.1);
        overflow: hidden;
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