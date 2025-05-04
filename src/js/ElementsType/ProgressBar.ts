import { objectLocalStorage } from "../Default.js";

export default class ProgressBar {

    timeProgressBar = 0;
    timeProgressBarIndex: any
    isInfinit: boolean;
    objectElement: HTMLElement | null;
    startTime = 0;
    progression = "";
    firstIteration = true;
    query: string;

    constructor(query: string, infinit: boolean) {
        this.query = query;
        this.objectElement = null;
        this.isInfinit = infinit;
        this.initStorage();
        this.initEventListener();
    }

    async destructor() {
        this.saveCurrentAnimation();
    }

    saveCurrentAnimation() {
        let curTime = (new Date()).getTime();
        if (this.progression.length > 0) {
            curTime += parseInt(this.progression)
        }
        let timePassed = curTime - this.startTime;
        console.log(this.progression);
        console.log(timePassed, timePassed+parseInt(this.progression));
        let progression = 0;

        if (timePassed > this.timeProgressBar) {
            progression = this.timeProgressBar-1;
        } else {
            progression = timePassed;
        }

        localStorage.setItem(this.query+"_progression", progression.toString());
    }

    initElementType() {
        this.objectElement = document.querySelector(this.query);
    }

    initStorage() {
        this.timeProgressBar = objectLocalStorage.global.default_time_progress_bar;
        let progressionStoredValue = localStorage.getItem(this.query+"_progression");
        this.progression = progressionStoredValue ? progressionStoredValue : "";
    }

    initEventListener() {
        this.objectElement?.addEventListener("animationstart", () => {
            this.startTime = (new Date()).getTime();
        });
    }

    setInfinit() {
        if (this.isInfinit && this.objectElement !== null) {
            this.objectElement.style.animationIterationCount = "infinite";
        }
    }

    setTimeProgressBar(timeProgressBar: number) {
        this.timeProgressBar = timeProgressBar;
    }

    getTimeProgressBar() {
        return this.timeProgressBar;
    }


    resetProgressBar() {
        if (this.objectElement !== null) {
            this.objectElement.style.width = "";
            this.objectElement.style.animationName = "";
            this.objectElement.style.animationDuration = this.timeProgressBar.toString()+'ms';
            if (this.firstIteration && this.progression.length > 0) {
                this.firstIteration = false;
                this.objectElement.style.animationDelay = -parseInt(this.progression)+'ms';
                localStorage.removeItem(this.query+"_progression");
            } else {
                this.objectElement.style.animationDelay = '0ms';
            }
            this.objectElement.offsetHeight;
            this.objectElement.style.animationName = "progressBar";
        }
    }
}
