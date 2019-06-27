export class Questionary {
	constructor(config) {
		this.config = config;
		this.currentPageNum = this.config.firstPageIsStarted ? 0 : 1;
		this.surveyIsStarted = this.config.firstPageIsStarted ? false : true;
		this.surveyIsFinished = false;
		this.addAdditionalFields();
	}

	get userAnswersShortOption () {
		const answers = {};

		this.config.pages.map((page) => {
			
			page.elements.map(element => {
				
				if ( element.type !== 'html') {
					
					answers[element.valueName] = element.value;

					if (element.otherIsSelected) {
						if(element.type === 'checkbox') {
							answers[element.valueName] = Array.isArray(answers[element.valueName]) ? answers[element.valueName].concat(element.otherValue) : element.otherValue;
							
						
						} else {
							answers[element.valueName] = element.otherValue;
						
						}

					}
					
				}
				
			});

		});

		return answers;
	}

	get userAnswersAdvancedOption () {
		return this.config.pages.reduce((currentPage, nextPage) => {
			const question = {};
			const titlePage = nextPage.title;
			const namePage = nextPage.name;
			const questionAnswers = nextPage.elements.map(element => {
				
				if ( element.type !== 'html') {
					let userAnswer = element.value;
									
					if (element.otherIsSelected) {
						if(element.type === 'checkbox') {
							userAnswer = Array.isArray(userAnswer) ? userAnswer.concat(element.otherValue) : userAnswer;
							
						} else {
							userAnswer = element.otherValue;
						
						}
					}

					return {
						valueName : element.valueName,
						value : userAnswer,
					}
					
				}
				
			}).filter(element => element ? true : false);

			question.title = titlePage;
			question.answers = questionAnswers;
			question.namePage = namePage;

			currentPage.push(question)
			
			return currentPage;

		}, []).filter(page => page.answers.length > 0);
	};

	get amountPages() {
		return this.config.firstPageIsStarted ? this.config.pages.length - 1 : this.config.pages.length
	}

	get currentPage() {

		if (parseInt(this.currentPageNum) - 1 <  0) return this.config.pages[0]

		return this.config.firstPageIsStarted ? this.config.pages[this.currentPageNum] : this.config.pages[this.currentPageNum - 1];
 
	}

	get pages() {
		return this.config.pages;
	}

	get progress() {
		return (100 / this.amountPages * (this.currentPageNum));
	}
	
	addAdditionalFields() {
		function uuidv4() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			  return v.toString(16);
			});
		  }

		
		const modifiedPages = this.config.pages.map((page, index) => {

			if(page.elements) {
				const modifiedElements = page.elements.map(element => {
				
					if (element.hasOther) {
						return {
							...element,
							value: '',
							otherIsSelected: false,
							otherValue: '',
							id: uuidv4()
						}
					}
	
					return {
						...element,
						value: '',
						id: uuidv4()
					}
				});
				
				return (
					Object.assign(page, {
						elements: modifiedElements,
						countPage : index + 1,
					})
				)
			}

			
		});

		this.config.pages = modifiedPages;
	}


	onPrevPage(callback) {
		this.currentPageNum = this.currentPageNum - 1 <= 0 ? 1 : this.currentPageNum - 1;
		callback();
		return this.currentPage;
	}

	onNextPage(successCallback, failedCallback) {
		this.checkValidationCurrentPage();
	 
		if (this.currentPage.isValid) {
			this.currentPageNum = this.currentPageNum + 1 > this.config.pages.length ? this.config.pages.length : this.currentPageNum + 1;
			successCallback(this);
		
		} else {
			failedCallback(this);
		
		}
		
	}

	onStartSurvey(callback) {
		this.onNextPage(callback);
		this.surveyIsStarted = true;
	}

	onFinishSurvey(callback) {
		this.surveyIsFinished = true;
		callback(this);
	}

	checkValidationCurrentPage() {
		let pageIsValid = true;
		
		this.currentPage.elements.forEach(element => {
			const elementValidRules = element.validators;
			const inputValue = Array.isArray(element.value) ? element.value.join(',') : element.value.trim();
			const inputValueLength = inputValue.length;

			let elementIsValid = true;
			let errorText = '';

			// If input value has characters and validation rules then check input value
			if ( inputValueLength > 0 && elementValidRules && elementValidRules.length > 0) {
				elementValidRules.forEach(validRule => {
					elementIsValid = true;
					pageIsValid = pageIsValid && true;

					if (validRule.type === 'text') {

						if (inputValue < validRule.minLength || inputValue > validRule.maxLength) {
							elementIsValid = false;
							pageIsValid = false;
							errorText = validRule.text;
							return;
						}

						if (!validRule.allowDigits) {
							
							const isValid = new RegExp("^[^0-9]{1,}$").test(inputValue);
							if (!isValid) {
								elementIsValid = false;
								pageIsValid = false;
								errorText = validRule.text;
								return;
							}

						}
					}

					if (validRule.type === 'email') {
						
						const isValid = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i).test(inputValue);
						if (!isValid) {
							elementIsValid = false;
							pageIsValid = false;
							errorText = validRule.text;
							return;
						}

					}
					
					if (validRule.type === 'numeric') {
						const minLength = validRule.minLength || 0;
						const maxLength = validRule.maxLength || 100;

						const containsLetters = new RegExp(/^\D/).test(inputValue);
						const isValid = new RegExp(`^\\d{${ minLength },${ maxLength }}$`).test(inputValue);
						
						if (containsLetters) {
							elementIsValid = false;
							pageIsValid = false;
							errorText = validRule.text || 'Поле должно вмещать только цифры';
							return;
						}

						if (!isValid) {
							elementIsValid = false;
							pageIsValid = false;
							errorText = validRule.text || `Поле должно быть не меньше ${ minLength } не больше ${ maxLength }`;
							return;
						}

					}

					if (validRule.type === 'regex') {
						
						const isValid = new RegExp(validRule.regex).test(inputValue);
						if (!isValid) {
							elementIsValid = false;
							pageIsValid = false;
							errorText = validRule.text;
						}

					}
				})
			}

			if (element.hasOther) {
				const otherValue = element.otherValue.trim();
				const otherValueLength = otherValue.length;

				elementIsValid = elementIsValid && true;
				pageIsValid = pageIsValid && true;

				if (element.otherIsSelected && element.isRequired && otherValueLength <= 0) {
					elementIsValid = false;
					pageIsValid = false;
					errorText = element.requiredErrorText || 'Пожалуйста, ответьте на вопрос';
				
				}
	
			}

			if (element.isRequired && inputValueLength <= 0) {
				if (element.otherIsSelected && element.otherValue.trim().length > 0) {
					return;
				}

				elementIsValid = false;
				pageIsValid = false;
				errorText = element.requiredErrorText || 'Пожалуйста, ответьте на вопрос';
			
			}

			element.isValid = elementIsValid;
			element.errorText = errorText;
		});

		this.currentPage.isValid = pageIsValid;
	}
}