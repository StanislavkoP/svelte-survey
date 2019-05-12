export class Questionary {
    constructor(config) {
        this.config = config;
        this.progress = 0;
        this.amountPages = config.pages.length || 0;
        this.currentPageNum = 1;
        this.currentPage = config.pages[this.currentPageNum - 1];
        this.addAdditionalFields();
    }
    
    addAdditionalFields() {
        const modifiedPages = this.config.pages.map((page, index) => {

            const modifiedElements = page.elements.map(element => ({
                ...element,
                value: '',
            }));
            
            return (
                Object.assign(page, {
                    elements: modifiedElements,
                    countPage : index + 1,
                })
            )
            
        });

        this.config.pages = modifiedPages;
    }

    setCurrentPage(indexPage) {
        this.currentPage = this.config.pages[indexPage - 1];
        
        return this.currentPage;
    }

    onPrevPage() {
        this.currentPageNum = this.currentPageNum - 1 <= 0 ? 1 : this.currentPageNum - 1;
        
        this.progress = this.recalculateProgress(this.currentPageNum, this.amountPages);
        
        return this.setCurrentPage(this.currentPageNum);
    }

    onNextPage() {
        this.checkValidation(this.currentPage);
       
        if (this.currentPage.isValid) {
            this.currentPageNum = this.currentPageNum + 1 > this.config.pages.length ? this.config.pages.length : this.currentPageNum + 1;
            
            this.progress = this.recalculateProgress(this.currentPageNum, this.amountPages);
            
            return this.setCurrentPage(this.currentPageNum);
        
        } else {
            return this.currentPage
        
        }
        
    }

    recalculateProgress(currentPage, amountPages) {
        return (100 / amountPages * (currentPage - 1));
    }

    checkValidation(page) {
        let pageIsValid = true;
        
        page.elements.forEach(element => {
            const elementValidRules = element.validators;
            const inputValue = element.value.trim();
            const inputValueLength = inputValue.length;
            let elementIsValid = true;
            let errorText = '';

            if (element.isRequired && inputValueLength <= 0) {
                elementIsValid = false;
                pageIsValid = false;
                errorText = element.requiredErrorText;
            
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