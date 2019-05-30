{#if survey }
    <button on:click={() => console.log(survey)}>click</button>
    <button on:click={getAnswers}>click</button>
    <button on:click={() => console.log(currentPage, currentPageNum)}>get current page</button>
    
    <select style="width: 100%" bind:value={currentPageNum} on:change={() => {survey.currentPageNum = currentPageNum; currentPage = survey.currentPage;  survey.surveyIsStarted = true; progress.set(survey.progress)}}>
        {#each survey.config.pages as page, index}
            <option value={index}>
                {page.title}
            </option>
        {/each}
    </select>

    {#if survey.surveyIsStarted}
        <Progressbar 
            amountPages={ survey.amountPages } 
            { currentPageNum } 
            { progress }
        />
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
                            <Button  className="survey__bottom-btn" onClick={onStartSurvey} text={ survey.config.startButtonText || 'Начать' } />           
                        
                        {:else}
                            {#if currentPageNum > 1}
                                <Button className="btn--gradient-left" onClick={onPrevPage} text="Назад" />           
                            {/if}

                            {#if currentPageNum !== survey.amountPages}
                                <Button onClick={onNextPage} text="Далее" />           
                            {/if}

                            {#if currentPageNum === survey.amountPages}
                                <Button onClick={onFinishSurvey} text={survey.config.completeButtonText || 'Закончить'} />           
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

    import Loader from './Loader';
    import Button from './components/Button';
    import Progressbar from './components/Progressbar.svelte';
    import Page from './Page';

    export let survey = null;
    let progress = tweened(0, {
		duration: 400,
		easing: cubicOut
    });

    let currentPage = null;
    let currentPageNum = null;
    let visible = false;
    let surveyIsFinished = false;

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
        /* font-size: 18px;
        line-height: 1.72; */
        box-sizing: border-box;
    }

    .survey * {
        box-sizing: border-box;
    }

    .survey__bottom {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
    
    
</style>