var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { objectHTMLElement, objectRarityRate, objectTreasure } from "../../Default.js";
import ProgressBar from "../../ElementsType/ProgressBar.js";
import VerticalTouchspin from "../../ElementsType/VerticalTouchspin.js";
export default class TreasureHunting {
    constructor() {
        this.query = "#treasure";
        this.finish = false;
        this.searchingTreasure = null;
        this.searchTreasureBtn = null;
        this.container = document.querySelector(objectHTMLElement.treasure_container);
        this.verticalTouchspin = new VerticalTouchspin("#tmp");
        this.progressBar = new ProgressBar("#test", false);
        this.initStorage();
    }
    save(id, value) {
        localStorage.setItem(id, value);
    }
    initVerticalTouchspin() {
        return __awaiter(this, void 0, void 0, function* () {
            this.verticalTouchspin.initElementType();
            yield this.verticalTouchspin.render();
            this.verticalTouchspin.initEventListener();
        });
    }
    initProgressBar() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.progressBar.initElementType();
            (_a = this.progressBar.objectElement) === null || _a === void 0 ? void 0 : _a.addEventListener("animationend", () => {
                var _a;
                (_a = this.searchTreasureBtn) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
                this.finish = true;
            });
            this.progressBar.initEventListener();
        });
    }
    initElementType() {
        this.container = document.querySelector(this.query);
    }
    initEventListener() {
        var _a;
        (_a = this.searchTreasureBtn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            var _a;
            (_a = this.searchTreasureBtn) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "true");
            this.search();
        });
    }
    initStorage() {
        let searchingTreasureStoredValue = localStorage.getItem("searching_treasure");
        if (searchingTreasureStoredValue !== null) {
            let treasure = Object.values(objectTreasure).filter(treasure => treasure.name === searchingTreasureStoredValue)[0];
            this.setTreasure(treasure);
        }
    }
    setTreasure(treasure) {
        this.searchingTreasure = treasure;
        this.save("searching_treasure", treasure.name);
    }
    getTreasure() {
        return this.searchingTreasure;
    }
    isFinish() {
        return false; // TMP
    }
    search() {
        if (this.searchingTreasure === null) {
            let treasure = this.getRandomTreasure();
            this.setTreasure(treasure);
        }
        if (this.searchingTreasure) {
            this.progressBar.setTimeProgressBar(this.searchingTreasure.search_time);
            this.progressBar.resetProgressBar();
        }
    }
    getRandomTreasure() {
        let random = Math.random() * (100 - 0);
        console.log(random);
        let rarity = 1;
        Object.keys(objectRarityRate).map((key) => {
            console.log(key, random, objectRarityRate[key]);
            if (random > objectRarityRate[key]) {
                rarity = parseInt(key) + 1;
                console.log(rarity);
            }
        });
        let treasureList = Object.values(objectTreasure).filter(treasure => treasure.rarity === rarity);
        return treasureList[Math.floor(Math.random() * treasureList.length)];
    }
    destructor() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.progressBar.destructor();
        });
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.container) {
                    throw new Error(`Response status: element does not exist`);
                }
                this.container.innerHTML = "";
                var domParser = new DOMParser();
                const idleGameplayHtml = yield fetch("./src/views/gameplay/treasure/treasure_hunting.html");
                if (!idleGameplayHtml.ok) {
                    throw new Error(`Response status: ${idleGameplayHtml.status}`);
                }
                var html = yield idleGameplayHtml.text();
                const parseHtml = domParser.parseFromString(html, "text/html");
                if (parseHtml.body.firstChild) {
                    this.container.appendChild(parseHtml.body.firstChild);
                }
                if (this.isFinish()) {
                    this.initVerticalTouchspin();
                }
                else {
                    this.initProgressBar();
                }
                this.searchTreasureBtn = document.querySelector(objectHTMLElement.treasure_search_btn);
                this.initEventListener();
            }
            catch (error) {
                console.log();
            }
        });
    }
}
