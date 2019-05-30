<div class="contact-group">
    <img src={ srcImg } alt={ alt } class="contact-group__img">
    <div class="contact-group__contact">{ contactText }</div>
</div>

<script>
    export let contactText = '';
    export let srcImg = '';
    export let alt = '';

</script>

<style>
    .contact-group {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

    }

    .contact-group__img {
        width: 28px;
        height: 28px;
        margin-right: 4px;
    }

    .contact-group__contact {
        font-size: 24px;
        line-height: 28px;
    }

</style>