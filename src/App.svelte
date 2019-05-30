<div class="container">
    <Header nameVacancy={nameVacancy}/>
</div>
    <hr>
<div class="container">
    <div id="survey">
        <QuestionaryComponent survey={surveyConfig}/>
    </div>
</div>

<script>
    import { onMount, afterUpdate } from 'svelte';

    import Header from './Header.svelte';
    import QuestionaryComponent from './Questionary.svelte';
	import { Questionary } from './QuestionatyModel.js'
	
    let surveyConfig = null;
    let nameVacancy = '';

    onMount(() => {
        const typeVacancy = window.location.hash.slice(1);
        
        switch (typeVacancy) {
            case 'prorab' : 
                nameVacancy = "прораба";
                break;
            default: return;
        }

        fetch(`/${typeVacancy}.json`)
            .then(data => data.json())
            .then(response => {
                surveyConfig = new Questionary(response);

                if (window.localStorage.savedPages) {
                    surveyConfig.config.pages = JSON.parse(window.localStorage.getItem('savedPages'));
                    console.log(surveyConfig.config);
                }
        });
    });

</script>


<style>
    :global(body) {
        font-family: 'Roboto', sans-serif;
        font-size: 21px;
        line-height: 1.6;
        padding: 0;
        overflow-x: hidden;
    }

    :global(#app) {
        padding-bottom: 80px;
    }
    
    :global(.container) {
        width: 1150px;
        margin-left: auto;
        margin-right: auto;
    }

    @media only screen and (max-width: 1150px) {
        :global(.container) {
            width: 768px;
        }
    }

    :global(.welcome__description-title) {
        text-align: center;
        font-size: 32px;
        line-height: 43px;
        text-transform: uppercase;
        padding: 0px 6px;
    }

    :global(.first-page__title) {
        font-size: 45px;
        line-height: 65px;
        margin: 0;
        margin-bottom: 26px;
        text-align: center;
        text-transform: uppercase;
    }

    :global(.confidentiality) {
        text-align: center;
    }



    hr {
        background-color: black;
        height: 1px;
        border: none;
        margin: 0;
    }

    #survey {
        width: 100%;
        max-width: 768px;
        margin: 0 auto;
        padding-top: 25px;
    }

</style>