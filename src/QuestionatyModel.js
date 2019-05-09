export class Questionary {
    constructor(config) {
        this.config = config;
        this.progress = 0;
        this.amountPages = config.pages.length || 0;
        this.currentPageNum = 1;
        this.currentPage = config.pages[this.currentPageNum - 1];
        this.addAdditionalFields()
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
                    countPage : index + 1
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
        this.currentPageNum = this.currentPageNum + 1 > this.config.pages.length ? this.config.pages.length : this.currentPageNum + 1;
        
        this.progress = this.recalculateProgress(this.currentPageNum, this.amountPages);
        
        return this.setCurrentPage(this.currentPageNum);
    }

    recalculateProgress(currentPage, amountPages) {
        return (100 / amountPages * (currentPage - 1));
    }
}