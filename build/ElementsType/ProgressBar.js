import { objectLocalStorage } from "../Default.js";
export default class ProgressBar {
    constructor(query, infinit) {
        this.timeProgressBar = 0;
        this.progression = "";
        this.endTime = 0;
        this.firstIteration = true;
        this.query = query;
        this.objectElement = null;
        this.isInfinit = infinit;
        this.initStorage();
    }
    initElementType() {
        this.objectElement = document.querySelector(this.query);
    }
    initStorage() {
        this.timeProgressBar = objectLocalStorage.global.default_time_progress_bar;
        let progressBarEndStoredValue = localStorage.getItem(this.query + "_progress_bar_end");
        if (progressBarEndStoredValue !== null) {
            this.endTime = parseInt(progressBarEndStoredValue);
            ;
        }
    }
    restoreAnimation() {
        let curTime = (new Date()).getTime();
        if (this.endTime !== 0) {
            let progression = this.endTime - curTime;
            if (progression < 0) {
                this.progression = (this.timeProgressBar - 1).toString();
            }
            else {
                this.progression = (this.timeProgressBar - progression).toString();
            }
        }
        console.log(parseInt(this.progression) / 1000);
    }
    initEventListener() {
        var _a;
        (_a = this.objectElement) === null || _a === void 0 ? void 0 : _a.addEventListener("animationstart", () => {
            let startTime = (new Date()).getTime();
            if (localStorage.getItem(this.query + "_progress_bar_end") !== null) {
                return;
            }
            localStorage.setItem(this.query + "_progress_bar_end", (startTime + this.timeProgressBar).toString());
        });
    }
    restoreInitialState() {
        localStorage.removeItem(this.query + "_progress_bar_end");
    }
    setInfinit() {
        if (this.isInfinit && this.objectElement !== null) {
            this.objectElement.style.animationIterationCount = "infinite";
        }
    }
    setTimeProgressBar(timeProgressBar) {
        this.timeProgressBar = timeProgressBar;
    }
    getTimeProgressBar() {
        return this.timeProgressBar;
    }
    resetProgressBar() {
        var _a;
        if (this.objectElement !== null) {
            this.objectElement.style.width = "";
            this.objectElement.style.animationName = "";
            this.objectElement.style.animationDuration = this.timeProgressBar.toString() + 'ms';
            (_a = this.objectElement.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('init');
            if (this.firstIteration) {
                this.restoreAnimation();
                if (this.progression.length > 0) {
                    this.firstIteration = false;
                    this.objectElement.style.animationDelay = -parseInt(this.progression) + 'ms';
                }
            }
            else {
                this.objectElement.style.animationDelay = '0ms';
            }
            this.objectElement.offsetHeight;
            this.objectElement.style.animationName = "progressBar";
        }
    }
}
