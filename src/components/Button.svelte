<button class={`btn survey__bottom-btn ${ className }`} on:click={onClick}> <slot/> </button>

<script>
    export let className = '';
    export let onClick;
</script>

<style>
    .btn {
        width: 230px;
        margin: 0;
        margin-right: 16px;
        padding: 16px 12px;
        color: #fff;
        border: none;
        cursor: pointer;
        background-size: 300% 100%;
        background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
        box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
        transition: background-image .4s , transform .4s, background-position .4s ease;
    }



    .btn:last-child {
        margin-right: 0;
    }

    .btn:hover {
        background-position: 100% 0;
        transform: scale(1.05)
    }

    .btn--gradient-left {
        background-image: linear-gradient(to left, #25aae1, #4481eb, #04befe, #3f86ed);
    }

    .negative {
        background-image: linear-gradient(to right, #D31027 0%, #EA384D 51%, #D31027 100%)
        
    }

    .negative:hover { 
        background-position: right center; 
    }

    @media only screen and (max-width: 480px) {
		.btn {
            width: 215px;
            padding: 14px 12px;
        }
    }


</style>