export default abstract class ProgressBar {

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
        if (localStorage.getItem("is_game_exist") !== null) {
            this.saveCurrentAnimation();
        }
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

        localStorage.setItem("element_progress_bar_progression", progression.toString());
    }

    initElementType() {
        this.objectElement = document.getElementById(this.query);
    }

    initStorage() {
        let storedValue = localStorage.getItem("element_progress_bar_time_progress_bar");
        if (storedValue) {
            this.timeProgressBar = parseFloat(storedValue);
        }
        let progressionStoredValue = localStorage.getItem("element_progress_bar_progression");
        console.log(progressionStoredValue);
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
                localStorage.removeItem("element_progress_bar_progression");
            } else {
                this.objectElement.style.animationDelay = '0ms';
            }
            this.objectElement.offsetHeight;
            this.objectElement.style.animationName = "progressBar";
        }
    }
}
