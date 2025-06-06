var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { objectLocalStorage } from "../Default.js";
export default class ProgressBar {
    constructor(query, infinit) {
        this.timeProgressBar = 0;
        this.startTime = 0;
        this.progression = "";
        this.firstIteration = true;
        this.query = query;
        this.objectElement = null;
        this.isInfinit = infinit;
        this.initStorage();
    }
    destructor() {
        return __awaiter(this, void 0, void 0, function* () {
            this.saveCurrentAnimation();
        });
    }
    saveCurrentAnimation() {
        let curTime = (new Date()).getTime();
        if (this.progression.length > 0) {
            curTime += parseInt(this.progression);
        }
        let timePassed = curTime - this.startTime;
        let progression = 0;
        if (timePassed > this.timeProgressBar) {
            progression = this.timeProgressBar - 1;
        }
        else {
            progression = timePassed;
        }
        localStorage.setItem(this.query + "_progression", progression.toString());
    }
    initElementType() {
        this.objectElement = document.querySelector(this.query);
    }
    initStorage() {
        this.timeProgressBar = objectLocalStorage.global.default_time_progress_bar;
        let progressionStoredValue = localStorage.getItem(this.query + "_progression");
        this.progression = progressionStoredValue ? progressionStoredValue : "";
    }
    initEventListener() {
        var _a;
        (_a = this.objectElement) === null || _a === void 0 ? void 0 : _a.addEventListener("animationstart", () => {
            this.startTime = (new Date()).getTime();
        });
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
        if (this.objectElement !== null) {
            this.objectElement.style.width = "";
            this.objectElement.style.animationName = "";
            this.objectElement.style.animationDuration = this.timeProgressBar.toString() + 'ms';
            if (this.firstIteration && this.progression.length > 0) {
                this.firstIteration = false;
                this.objectElement.style.animationDelay = -parseInt(this.progression) + 'ms';
                localStorage.removeItem(this.query + "_progression");
            }
            else {
                this.objectElement.style.animationDelay = '0ms';
            }
            this.objectElement.offsetHeight;
            this.objectElement.style.animationName = "progressBar";
        }
    }
}
