
{#if isShowed}
    <div class='modal-background' transition:fade={{duration: 250}}>
        <div class='modal'>
            {#if showCloseIcon}
                <button class="close" on:click='{() => isShowed = false}'/>
            {/if}
            <slot/>
        </div>
    </div>

{/if}


<script>
    import { fade } from 'svelte/transition';
    import Button from './Button';

    export let isShowed = false;
    export let showCloseIcon = false;


</script>

<style>
	.modal-background {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        padding: 50px 0;
        background: rgba(0,0,0,0.6);
        overflow-y: auto;

	}

	.modal {
        position: relative;
        padding: 34px;
        padding-top: 52px;
        margin: auto 0;
		border-radius: 12px;
		background: white;
    }
    
    .close {
        position: absolute;
        top: 14px;
        right: 14px;
        width: 32px;
        height: 32px;
        cursor: pointer;
        border: none;
        background-color: transparent;
    }
    .close:hover::before,
    .close:hover::after {
        background-color: #1E78FF;
        transition: background-color 0.3s ease;
        
    }

    .close::before,
    .close::after {
        position: absolute;
        top: 0;
        left: 50%;
        content: '';
        height: 33px;
        width: 2px;
        background-color: #333;
        transition: background-color 0.3s ease;
    }

    .close::before {
        transform: rotate(45deg);
    }

    .close::after {
        transform: rotate(-45deg);
    }

    @media only screen and (max-width: 810px) {
        .modal {
            padding: 18px;
            padding-top: 43px;
        }
    }


    @media only screen and (max-width: 480px) {
        .modal-background {
            padding-left: 20px;
            padding-right: 20px;
        }
    }



</style>