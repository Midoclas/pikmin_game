export default class ProgressBar {
    constructor(query, defaultStoredValue) {
        this.objectElement = document.getElementById(query);
        if (this.objectElement) {
            this.objectElement.style.width = "100%";
        }
        var storedValue = localStorage.getItem(defaultStoredValue);
        if (storedValue === null) {
            this.timeProgressBar = parseFloat(defaultStoredValue);
        }
        else {
            this.timeProgressBar = parseFloat(storedValue);
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
