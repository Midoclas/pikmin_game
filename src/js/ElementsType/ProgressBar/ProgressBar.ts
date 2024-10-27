export default abstract class ProgressBar {

    timeProgressBar: number;
    objectElement: HTMLElement | null;

    constructor(query: string , defaultStoredValue: any) {
        this.objectElement = document.getElementById(query);

        var storedValue = localStorage.getItem(defaultStoredValue);
        if (storedValue === null) {
            this.timeProgressBar = parseFloat(defaultStoredValue);
        } else {
            this.timeProgressBar = parseFloat(storedValue);
        }
    }

    setTimeProgressBar(timeProgressBar: number) {
        this.timeProgressBar = timeProgressBar;
        if (this.objectElement !== null) {
            this.objectElement.style.animationDuration = this.timeProgressBar+"s"
        }
        
        this.repaint();
    }

    getTimeProgressBar() {
        return this.timeProgressBar;
    }

    setProgressBar() {
        if (this.objectElement !== null) {
            this.objectElement.style.animationDuration = this.timeProgressBar+"s"
            this.objectElement.style.animationName = "progressBar"
        }
        this.repaint();
    }

    repaint() {
        // if (this.objectElement !== null) {
        //     this.objectElement.innerHTML = this.timeProgressBar.toString();
        // }
    }
}
