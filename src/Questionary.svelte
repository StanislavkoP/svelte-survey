{#if survey }
    <!-- <button on:click={() => console.log(survey)}>click</button>
    <button on:click={() => console.log(survey.userAnswersAdvancedOption)}>click</button>
    <button on:click={() => console.log(currentPage, currentPageNum)}>get current page</button>
    
    <select style="width: 100%" bind:value={survey.currentPageNum} on:change={onChangePage}>
        {#each survey.config.pages as page, index}
            <option value={index}>
                {page.title}
            </option>
        {/each}
    </select> -->

    {#if survey.surveyIsStarted}
        <Progressbar 
            amountPages={ survey.amountPages } 
            { currentPageNum } 
            { progress }
        />
    
    {/if}

    {#if visible}
        <div 
            class="survey"                 
            transition:fade={{duration: 350}}
            on:outroend={() => visible = true}
        >
            {#if survey}
                <Page page={currentPage} />

                <div class="survey__bottom">

                    {#if survey.config.firstPageIsStarted && currentPageNum === 0}
                        <Button  className="survey__bottom-btn" onClick={onStartSurvey} >{ survey.config.startButtonText || 'Начать' }</Button>           
                    
                    {:else}
                        {#if currentPageNum > 1}
                            <Button className="btn--gradient-left negative" onClick={onPrevPage}>Назад</Button>           
                        {/if}

                        {#if currentPageNum !== survey.amountPages}
                            <Button onClick={onNextPage} >Далее</Button>           
                        {/if}

                        {#if currentPageNum === survey.amountPages}
                            <Button onClick={onFinishSurvey} >{ survey.config.completeButtonText || 'Закончить' }</Button>          
                        {/if}
                
                    {/if}
                </div>

            <!-- {:else}
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
                </div> -->
            {/if}
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

    import Loader from './components/Loader';
    import Button from './components/Button';
    import Progressbar from './components/Progressbar.svelte';
    import Page from './Page';

    export let survey = null;
    export let callbackAfterChangePage; 
    export let callbackFinishSurvey; 

    let progress = tweened(0, {
		duration: 400,
		easing: cubicOut
    });

    let currentPage = null;
    let currentPageNum = null;
    let visible = false;
    let surveyIsFinished = false;

    onMount(() => {
        
        document.addEventListener('keydown', function (e)  {
            if ( (e.which == 13 || e.keyCode == 13) && e.target.type !== 'textarea'  && e.target.tagName !== 'LABEL' && e.target.tagName !== 'BUTTON' ) {
                onNextPage();
            }

            if ((e.which == 13 || e.keyCode == 13) && e.target.tagName === 'LABEL') {
                e.target.click()
            }
        
        });
    
    })

    afterUpdate(() => {
        
        if (survey !== null && currentPage === null) {
            currentPage = survey.currentPage;
            visible = true;
        }

        if (survey !== null) {
            currentPage = survey.currentPage;
            currentPageNum = survey.currentPageNum;
            progress.set(survey.progress);
        }
    });


    function onNextPage () {
        survey.onNextPage(
            (config) => {
                visible = false;
                callbackAfterChangePage(config);
                progress.set(survey.progress);

            }, 
            () => {
                setTimeout(() => {
                    
                    const inputWithError = document.querySelector('.hasError');
                    if (inputWithError) inputWithError.focus();
               
               }, 0)


            }
        );

        currentPage = survey.currentPage;
    }

    function onChangePage () {     
        currentPage = survey.currentPage; 
        survey.surveyIsStarted = true;
        progress.set(survey.progress)

    }

    function onPrevPage () {
        survey.onPrevPage(() => {
            visible = false;
        });
        currentPage = survey.currentPage;
        progress.set(survey.progress);
    }

    function onStartSurvey() {
        survey.onStartSurvey(() => {
            visible = false;
        });
        currentPage = survey.currentPage;
        progress.set(survey.progress);
    }

    function onFinishSurvey() {
        survey.onFinishSurvey(
            callbackFinishSurvey
        );
        
        surveyIsFinished = survey.surveyIsFinished;
        
        return;
    }

</script>

<style>
    .survey__bottom {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
    
    
</style>