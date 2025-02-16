export default class ProgressBar {
    constructor(query, timeProgressBarIndex, infinit) {
        this.timeProgressBar = 0;
        this.objectElement = document.getElementById(query);
        this.timeProgressBarIndex = timeProgressBarIndex;
        this.isInfinit = infinit;
        if (this.objectElement) {
            this.objectElement.style.width = "100%";
        }
        this.initStorage();
        this.setInfinit();
    }
    initStorage() {
        let storedValue = localStorage.getItem(this.timeProgressBarIndex);
        if (storedValue) {
            this.timeProgressBar = parseFloat(storedValue);
        }
    }
    setInfinit() {
        if (this.isInfinit && this.objectElement !== null) {
            this.objectElement.style.animationIterationCount = "infinite";
        }
    }
    setTimeProgressBar(timeProgressBar) {
        this.timeProgressBar = timeProgressBar;
        if (this.objectElement !== null) {
            this.objectElement.style.animationName = "progressBar";
            this.objectElement.style.animationDuration = this.timeProgressBar + "s";
        }
    }
    getTimeProgressBar() {
        return this.timeProgressBar;
    }
    resetProgressBar() {
        if (this.objectElement !== null) {
            this.objectElement.style.width = "";
            this.objectElement.style.animationDuration = this.timeProgressBar + "s";
            this.objectElement.style.animationName = "";
            this.objectElement.offsetHeight;
            this.objectElement.style.animationName = "progressBar";
        }
    }
}
