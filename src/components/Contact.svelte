<div class="contact-group">
    <img src={ srcImg } alt={ alt } class="contact-group__img">
    <a href={href} class="contact-group__contact">{ contactText }</a>
</div>

<script>
    export let contactText = '';
    export let srcImg = '';
    export let alt = '';
    export let href = '#';

</script>

<style>
    .contact-group {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
    }

    .contact-group:last-child {
        margin-bottom: 0;
    }

    .contact-group__img {
        width: 28px;
        height: 28px;
        margin-right: 4px;
    }

    .contact-group__contact {
        color: inherit;
        font-size: 24px;
        text-decoration: none;
    }

    .contact-group__contact:active,
    .contact-group__contact:hover {
        color: #d19303;
    }

    .contact-group__contact:hover {
        text-decoration: underline;
    }



    @media only screen and (max-width: 1150px) {
        .contact-group {
            margin-bottom: 4px;
        }
        .contact-group__contact {
            font-size: 20px;
        }
    }

</style>