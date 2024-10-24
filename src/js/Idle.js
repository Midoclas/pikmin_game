import { defaultTimeProgressBar } from "./Default.js";

export default class Idle {

    timeProgressBar;
    ObjectElement = document.getElementById("idle");
    progressBar = document.getElementById("progressBar");

    /**
     * 
     * @param {Float64Array} timeProgressBar 
     */
    constructor() {
        var storedValue = localStorage.getItem("timeProgressBar");
        if (storedValue === null) {
            this.timeProgressBar = defaultTimeProgressBar;
        } else {
            this.timeProgressBar = storedValue;
        }
        
        this.setProgressBar();
    }

    /**
     * @param {Float64Array} timeProgressBar
     */
    setTimeProgressBar(timeProgressBar) {
        this.timeProgressBar = timeProgressBar;
        this.progressBar.style.animationDuration = this.timeProgressBar+"s"
        this.repaint();
    }

    getTimeProgressBar() {
        return this.timeProgressBar;
    }

    setProgressBar() {
        this.progressBar.style.animationDuration = this.timeProgressBar+"s"
        this.progressBar.style.animationName = "progressBar"
        this.repaint();
    }

    repaint() {
        document.querySelectorAll('.timeProgressBar').forEach(element => {
            element.innerHTML = this.timeProgressBar;
        });
    }
}