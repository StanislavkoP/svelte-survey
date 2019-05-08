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


<QuestionaryComponent survey={surveyConfig}/>