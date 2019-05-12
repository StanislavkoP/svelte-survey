<script>
    import { onMount, afterUpdate } from 'svelte';

    import QuestionaryComponent from './Questionary.svelte';
	import { Questionary } from './QuestionatyModel.js'
	
    let surveyConfig = null;

    onMount(() => {
        fetch('/page.json')
            .then(data => data.json())
            .then(response => {
                surveyConfig = new Questionary(response);
        });
    });

</script>


<style>
    :global(body) {
        font-family: 'Roboto', sans-serif;
    }
</style>

<div id="survey">
    <QuestionaryComponent survey={surveyConfig}/>
</div>