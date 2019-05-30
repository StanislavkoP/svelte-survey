<div class="progress">
    <div class="progress__steps">
        <span>Шаг</span>
        <span class="progress__current-page">{ currentPageNum }</span>
        <span>из</span>
        <span class="progress_amount-page">{ amountPages }</span>
    </div>

    <div class="progress__bar">
        <div class="progress__bar-line" style={`width: ${$progress}%`}></div>
    </div>
</div>

<script>
    export let currentPageNum = 0;
    export let amountPages = 0;
    export let progress;
</script>


<style>
    .progress {
        margin-bottom: 20px;
    }

    .progress__bar {
        height: 14px;
        background-color: rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .progress__bar-line {
        height : 100%;
        background-color: #4481eb;
    }

    .progress__steps {
        font-size: 24px;
        line-height: 28px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 12px;
    }
    

</style>