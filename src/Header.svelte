<header class="main-header">
    <a class="main-header__logo" href="http://petrishin.ru/">
        <img src="./images/logo.png" alt="петришин-строй"  class="main-header__logo-img">
    </a>

    <h1 class="main-header__title">{ `Анкета на вакансию ${nameVacancy}` }</h1>
</header>

<script>
    export let nameVacancy = '';
</script>

<style>
    .main-header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid black;
    }

    .main-header__logo {
        width: 100%;
        max-width: 360px;
    }

    .main-header__logo-img {
        width: 100%;
    }

</style>