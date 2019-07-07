<div class="container">
    <Header nameVacancy={nameVacancy}/>
</div>
    <hr>
<div class="container">
    <div id="survey">

        {#if loadingRequest}
            <div in:fade>
                <Loader/>
            
            </div>

       
        { :else }
            {#if failedRequest === false}
                <div out:fade>
                    <QuestionaryComponent 
                        survey={ surveyConfig }
                        callbackAfterChangePage={ saveToLocalStorage } 
                        callbackFinishSurvey={ onFinishSurvey }
                    />
            
                </div>
            
            {:else}

                <div class="error-request">
                    <p>
                        Произошла ошибка при отправке данных на сервер.
                    </p>
                    <p>
                        Попробуйте отправить повторно или отправьте позже.
                    </p>

                    <Button onClick={doRequestAgain}>Отправить еще раз</Button>


                </div>


            {/if}


        {/if}
    </div>
</div>

<Modal isShowed={ showModal } showCloseIcon={false}>
    <div class="modal__content">
        <div class="modal__content-text">
            <p class="modal__content-text-head">
               У вас осталась не заполненая анкета на вакансию { savedNameVacancy }.
            </p>
            <p>
                Хотите продолжить?
            </p>                      
            <p>
                Или начать заного?
            </p>
        </div>

        <div class="modal__content-btns">
            <Button onClick={ startOverSurvey } className="modal__content-btn  negative">Начать заново</Button>
            <Button onClick={ continueSurvey } className="modal__content-btn">Продолжить</Button>
        </div>
    </div>
</Modal>

<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    import Header from './Header';
    import Modal from './components/Modal';
    import Loader from './components/Loader';
    import Button from './components/Button';
    import QuestionaryComponent from './Questionary';
	import { Questionary } from './QuestionatyModel.js'
	
    let surveyConfig = null;
    let nameVacancy = '';
    let fullNameVacancy = '';
    let savedNameVacancy = '';
    let showModal = false;
    let savedResponse = null;
    let loadingRequest = false;
    let failedRequest = false;
    let surveyResults = null;

    onMount(() => {
        
        const typeVacancy = window.location.hash.slice(1);
        
        switch (typeVacancy) {
            case 'prorab' : 
                nameVacancy = "прораба";
                fullNameVacancy = "Прораб";
                break;
            
            case 'malyar' : 
                nameVacancy = "маляра";
                fullNameVacancy = "Маляр";
                break;
            
            case 'plitochnik' : 
                nameVacancy = "плиточника";
                fullNameVacancy = "Плиточник";
                break;
            
            case 'shtukatur' : 
                nameVacancy = "штукатура";
                fullNameVacancy = "Штукатур";
                break;
            
            case 'universal' : 
                nameVacancy = "мастера-универсала";
                fullNameVacancy = "Мастер-универсал";
                break;
            
            case 'elektromon' : 
                nameVacancy = "электромонтажника";
                fullNameVacancy = "Электромонтажник";
                break;
            
            case 'santehnik' : 
                nameVacancy = "сантехника";
                fullNameVacancy = "Сантехник";
                break;
            
            case 'operator' : 
                nameVacancy = "оператора на телефоне";
                fullNameVacancy = "Оператор на телефоне";
                break;
            
            case 'smetchik' : 
                nameVacancy = "сметчика";
                fullNameVacancy = "Сметчик";
                break;
            
            case 'hr' : 
                nameVacancy = "специалиста по подбору персонала";
                fullNameVacancy = "HR-менеджер";
                break;
           
            case 'universal-gkl' : 
                nameVacancy = "специалиста по ГКЛ/Гипсокартонщика/Отделочника/Мастера универсала";
                fullNameVacancy = "Специалист по ГКЛ/Гипсокартонщик/Отделочник/Мастер-универсал";
                break;
           
            case 'sales' : 
                nameVacancy = "менеджера по продажам";
                fullNameVacancy = "Менеджер по продажам";
                break;
           
           default: return;
        };

        document.title = document.title + ' ' + nameVacancy;

        const twoGeneralPages = [
            {
                "name": "Персональнные данные",
                "title": "Введите свои персональные данные",
                "elements": [
                    {
                        "type": "text",
                        "name": "Фамилия",
                        "title": "Ваша фамилия:",
                        "valueName": "Фамилия",
                        "autocomplete": "family-name",
                        "isRequired": true,
                        "requiredErrorText": "Пожалуйста, введите вашу фамилию",
                        "validators": [
                            {
                                "type": "text",
                                "minLength": 4,
                                "maxLength": 25
                            }
                        ]
                    },
                    {
                        "type": "text",
                        "name": "Имя",
                        "title": "Ваше имя:",
                        "valueName": "Имя",
                        "autocomplete": "given-name",
                        "isRequired": true,
                        "requiredErrorText": "Пожалуйста, введите ваше имя",
                        "validators": [
                            {
                                "type": "text",
                                "minLength": 4,
                                "maxLength": 25
                            }
                        ]
                    },
                    {
                        "type": "text",
                        "name": "Отчество",
                        "title": "Ваше отчество:",
                        "valueName": "Отчество",
                        "autocomplete": "additional-name",
                        "isRequired": true,
                        "requiredErrorText": "Пожалуйста, введите ваше отчество",
                        "validators": [
                            {
                                "type": "text",
                                "minLength": 4,
                                "maxLength": 25
                            }
                        ]
                    },
                    {
                        "type": "date",
                        "name": "Дата рождения",
                        "title": "Дата рождения:",
                        "valueName": "Дата рождения",
                        "autocomplete": "date",
                        "isRequired": true,
                        "requiredErrorText": "Пожалуйста, введите вашу дату рождения"

                    },
                    {
                        "type": "tel",
                        "name": "Телефон",
                        "autocomplete": "tel",
                        "title": "Ваш телефон:",
                        "valueName": "Телефон",
                        "requiredErrorText": "Пожалуйста, введите ваш номер телефона",
                        "isRequired": true,
                        "validators": [
                            {
                                "type": "numeric",
                                "minLength": 4,
                                "maxLength": 16
                            }
                        ]
                    },
                    {
                        "type": "email",
                        "name": "Почта",
                        "title": "Электронная почта:",
                        "autocomplete": "email",
                        "requiredErrorText": "Пожалуйста, введите вашу электронную почту",
                        "valueName": "Почта",
                        "isRequired": true,
                        "validators": [
                            {
                                "type": "email"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Источник",
                "title": "Из какого источника Вы узнали о вакансии?",
                "elements": [
                    {
                        "type": "radiogroup",
                        "name": "Источник",
                        "valueName": "Источник",
                        "isRequired": true,
                        "choices": [
                            {   
                                name: "HeadHunter hh.ru",
                                value: "HR hh.ru"
                            },
                            {   
                                name: "Авито Москва",
                                value: "HR Авито Москва"
                            },
                            {  
                                name: "SuperJob.ru",
                                value: "HR SuperJob.ru"
                            },
                            {  
                                name: "Instagram",
                                value: "HR Instagram"
                            },
                            {  
                                name: "YouTube",
                                value: "HR YouTube"
                            },
                            {  
                                name: "Petrishin.ru",
                                value: "HR Petrishin.ru"
                            },
                            {  
                                name: "Рекомендации",
                                value: "HR Рекомендация"
                            },
                            {  
                                name: "Другое",
                                value: "HR Отдел кадров"
                            },
                        ],
                        "requiredErrorText" : "Пожалуйста, ответьте на вопрос"
                    }
                ]
            }
        ]


        fetch(`./${typeVacancy}.json`)
            .then(data => data.json())
            .then(response => { 
                savedResponse = response;

                for (let i = 0; i < twoGeneralPages.length; i++) {
                    savedResponse.pages.splice(1 + i, 0, twoGeneralPages[i]);
                }

                surveyConfig = new Questionary(savedResponse);

                if (window.localStorage.petrishinSurvey) {
                    const savedSurvey = JSON.parse(window.localStorage.getItem('petrishinSurvey'));
                    
                    savedNameVacancy = savedSurvey.nameVacancy;
                    surveyConfig.config = savedSurvey.config;
                    surveyConfig.currentPageNum = savedSurvey.currentPageNum;
                    surveyConfig.surveyIsFinished = savedSurvey.surveyIsFinished;
                    surveyConfig.surveyIsStarted = savedSurvey.surveyIsStarted;

                    showModal = true;
                }
            })
            .catch((error) => console.log(error));
    });

    function saveToLocalStorage(survey) {
        const configuration = {
            nameVacancy: nameVacancy,
            config: survey.config,
            currentPageNum: survey.currentPageNum,
            surveyIsFinished: survey.surveyIsFinished,
            surveyIsStarted: survey.surveyIsStarted,
        };

        localStorage.setItem('petrishinSurvey' , JSON.stringify(configuration));
    };

    function startOverSurvey() {
        surveyConfig.config = savedResponse;
        surveyConfig.currentPageNum = savedResponse.firstPageIsStarted ? 0 : 1;
        surveyConfig.surveyIsStarted = savedResponse.firstPageIsStarted ? false : true;
        surveyConfig.surveyIsFinished = false;

        surveyConfig.addAdditionalFields();

        localStorage.removeItem('petrishinSurvey');
        
        showModal = false;
    };
    
    function continueSurvey() {
        nameVacancy = savedNameVacancy;
        showModal = false;
    };

    function requestWithResults (data) {
        fetch("form/vacancy.php", {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            localStorage.removeItem('petrishinSurvey');
            window.location.href = "http://petrishin.ru/v-thankyou.html";
        })
        .catch(error => {
            loadingRequest = false;
            failedRequest = true;
        });
    }


    function onFinishSurvey (survey) {

        loadingRequest = true;
        failedRequest = false;

        surveyResults = survey.userAnswersAdvancedOption;
        surveyResults.forEach(page => {
            
            const modifiedAnswers = page.answers.reduce((currentAnswer, nextAnswer) => ( Object.assign(currentAnswer, { [nextAnswer.valueName]: nextAnswer.value }) ), {});

            page.answers =  modifiedAnswers;
        });

        requestWithResults({
            nameVacancy: nameVacancy,
            fullNameVacancy: fullNameVacancy,
            candidateAnswers: surveyResults
        });
    };

    function doRequestAgain () {
        loadingRequest = true;
        failedRequest = false;

        requestWithResults({
            nameVacancy: nameVacancy,
            fullNameVacancy: fullNameVacancy,
            candidateAnswers: surveyResults
        });
    }

</script>


<style>
    :global(body) {
        font-family: 'Roboto', sans-serif;
        font-size: 21px;
        line-height: 1.6;
        padding: 0;
        overflow-x: hidden;
        box-sizing: border-box;
    }

    :global(body *) {
        box-sizing: border-box;
    }

    :global(body *:focus) {
        box-sizing: border-box;
        outline: 3px solid #FDB302;
    }

    :global(#app) {
        padding-bottom: 80px;
    }
    
    :global(.container) {
        width: 1150px;
        margin-left: auto;
        margin-right: auto;
    }

    :global(.welcome__description-title) {
        text-align: center;
        font-size: 32px;
        text-transform: uppercase;
        padding: 0px 6px;
    }

    :global(.first-page__title) {
        font-size: 45px;
        font-weight: 800;
        margin: 0;
        margin-bottom: 26px;
        text-align: center;
        text-transform: uppercase;
    }

    :global(.confidentiality) {
        text-align: center;
    }

    hr {
        background-color: black;
        height: 1px;
        border: none;
        margin: 0;
    }

    #survey {
        width: 100%;
        max-width: 768px;
        margin: 0 auto;
        padding-top: 25px;
    }

    .modal__content-text {
        text-align: center;
    }

    .modal__content-text p {
        margin-top: 0;
    }

    .modal__content-text p:not(.modal__content-text-head) {
        margin-bottom: 4px;
    }

    .modal__content-btns {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 528px;
        margin: 0 auto;
        margin-top: 24px;
    }

    .modal__content-text-head {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: 800;
    }

    :global(.modal__content-btns .btn) {
        font-size: 18px;

    }

    .error-request {
        text-align: center;
    }

    @media only screen and (max-width: 1150px) {
        #survey {
            width: 100%;
        }

        :global(.container) {
            width: 768px;
        }
        
    }

    @media only screen and (max-width: 810px) {
        :global(.first-page__title) {
            font-size: 33px;
            margin-bottom: 20px;

        }
        :global(.container) {
            width: 480px;
        }
        :global(.welcome__description-title) {
            font-size: 24px;
            padding: 0 22px;
        }
        :global(.modal__content-btns .btn) {
            width: 185px;
    
        }

        #survey {
            padding-top: 0;
        }
    }

    @media only screen and (max-width: 480px) {
        :global(body) {
            font-size: 20px;
        }

        :global(.container) {
            width: 320px;
        }

        :global(.first-page__title) {
            font-size: 23px;
        }

        :global(.welcome__description-title) {
            font-size: 15px;
            padding: 0;
        }

        .modal__content-text-head {
            font-size: 20px;
        }

        .modal__content-text p:not(.modal__content-text-head) {
            font-size: 16px;
        }


    }

    @media only screen and (max-width: 400px) {
        :global(.modal__content-btns .btn) {
            width: 132px;
            font-size: 15px;
        }
    }

    @media only screen and (max-width: 370px) {
        :global(.container) {
            width: 100%;
            padding: 12px;
            box-sizing: border-box;
        }
    }

</style>