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
        });
    });

</script>


<style>
    :global(body) {
        font-family: 'Roboto', sans-serif;
        padding: 0;
    }

    #survey {
        width: 100%;
        max-width: 768px;
        margin: 0 auto;
    }

</style>

<Header nameVacancy={nameVacancy}/>
<div id="survey">
    <QuestionaryComponent survey={surveyConfig}/>
</div>