export default abstract class ProgressBar {

    timeProgressBar = 0;
    objectElement: HTMLElement | null;

    constructor(query: string , timeProgressBarIndex: any) {
        this.objectElement = document.getElementById(query);
        if (this.objectElement) {
            this.objectElement.style.width = "100%";
        }
        var storedValue = localStorage.getItem(timeProgressBarIndex);
        if (storedValue) {
            this.timeProgressBar = parseFloat(storedValue);
        }
    }

    setTimeProgressBar(timeProgressBar: number) {
        this.timeProgressBar = timeProgressBar;
        if (this.objectElement !== null) {
            this.objectElement.style.animationName = "progressBar";
            this.objectElement.style.animationDuration = this.timeProgressBar+"s";
        }
    }

    getTimeProgressBar() {
        return this.timeProgressBar;
    }

    resetProgressBar() {
        if (this.objectElement !== null) {
            this.objectElement.style.width = "";
            this.objectElement.style.animationDuration = this.timeProgressBar+"s";
            this.objectElement.style.animationName = "";
            this.objectElement.offsetHeight;
            this.objectElement.style.animationName = "progressBar";
        }
    }
}
