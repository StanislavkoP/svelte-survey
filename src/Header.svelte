<header class="main-header">
    <a class="main-header__logo" href="http://petrishin.ru/">
        <img src="./images/logo.png" alt="петришин-строй"  class="main-header__logo-img">
    </a>

    <h1 class="main-header__title">{ `Анкета на вакансию ${nameVacancy}` }</h1>

    <div class="">
        <Contact srcImg='./images/icons/phone.svg' contactText="+7 499 350-59-62" />
        <Contact srcImg='./images/icons/email.svg' contactText="hr@petrishin.ru" />
    </div>
</header>

<script>
    import Contact from './components/Contact.svelte';

    export let nameVacancy = '';
</script>

<style>
    .main-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 0;
    }

    .main-header__logo {
        margin-top: 6px;
        width: 100%;
        max-width: 265px;
    }

    .main-header__logo-img {
        width: 100%;
    }

    .main-header__title {
        margin: 0;
        font-size: 22px;
        line-height: 26px;
        font-weight: 400;
    }

</style>