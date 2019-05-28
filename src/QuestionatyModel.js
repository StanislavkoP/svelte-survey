export class Questionary {
	constructor(config) {
		this.config = config;
		this.currentPageNum = this.config.firstPageIsStarted ? 0 : 1;
		this.surveyIsStarted = this.config.firstPageIsStarted ? false : true;
		this.addAdditionalFields();
	}

	get userAnswers () {
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
		return (100 / this.amountPages * (this.currentPageNum - 1));
	}
	
	addAdditionalFields() {
		const modifiedPages = this.config.pages.map((page, index) => {

			if(page.elements) {
				const modifiedElements = page.elements.map(element => {
				
					if (element.hasOther) {
						return {
							...element,
							value: '',
							otherIsSelected: false,
							otherValue: ''
						}
					}
	
					return {
						...element,
						value: '',
						id: `f${(~~(Math.random()*1e8)).toString(16)}`
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

	onNextPage(callback) {
		this.checkValidation(this.currentPage);
	 
		if (this.currentPage.isValid) {
		   
			this.currentPageNum = this.currentPageNum + 1 > this.config.pages.length ? this.config.pages.length : this.currentPageNum + 1;
			callback();
			return this.currentPage;
		
		} else {
			return this.currentPage;
		
		}
		
	}

	onStartSurvey(callback) {
		this.onNextPage(callback);
		this.surveyIsStarted = true;
	}

	onFinishSurvey(callback) {
		callback()
	}

	checkValidation(page) {
		let pageIsValid = true;
		
		page.elements.forEach(element => {
			const elementValidRules = element.validators;
			const inputValue = Array.isArray(element.value) ? element.value.join(',') : element.value.trim();
			const inputValueLength = inputValue.length;

			let elementIsValid = true;
			let errorText = '';


			if (element.isRequired && inputValueLength <= 0) {
				elementIsValid = false;
				pageIsValid = false;
				errorText = element.requiredErrorText || 'Пожалуйста, ответьте на вопрос';
			
			}

			if (element.hasOther) {
				const otherValue = element.otherValue.trim();
				const otherValueLength = otherValue.length;

				if (element.otherIsSelected && element.isRequired && otherValueLength <= 0) {
					elementIsValid = false;
					pageIsValid = false;
					errorText = element.requiredErrorText || 'Пожалуйста, ответьте на вопрос';
				
				}
	
			}


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
						}

						if (!validRule.allowDigits) {
							
							const isValid = new RegExp("^[^0-9]{1,}$").test(inputValue);
							if (!isValid) {
								elementIsValid = false;
								pageIsValid = false;
								errorText = validRule.text;
							}

						}
					}

					if (validRule.type === 'email') {
						
						const isValid = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i).test(inputValue);
						if (!isValid) {
							elementIsValid = false;
							pageIsValid = false;
							errorText = validRule.text;
						}

					}

					if (validRule.type === 'numeric') {
						
						const isValid = new RegExp(`^\\d{${validRule.minLength},${validRule.maxLength}}$`).test(inputValue);
						if (!isValid) {
							elementIsValid = false;
							pageIsValid = false;
							errorText = validRule.text;
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

			element.isValid = elementIsValid;
			element.errorText = errorText;
		});

		page.isValid = pageIsValid;
	}
}