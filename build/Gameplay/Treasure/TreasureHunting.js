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
        this.startExpeditionBtn = null;
        this.searchTreasureBtn = null;
        this.container = document.querySelector(objectHTMLElement.treasure_container);
        this.verticalTouchspin = new VerticalTouchspin("#treasure_hunting_vertical_touchspin");
        this.progressBar = new ProgressBar("#treasure_hunting_progress_bar", false);
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
                var _a, _b;
                (_a = this.searchTreasureBtn) === null || _a === void 0 ? void 0 : _a.classList.add("d-none");
                (_b = this.startExpeditionBtn) === null || _b === void 0 ? void 0 : _b.classList.remove("d-none");
                this.finish = true;
                this.renderTreasureInformation();
                this.initVerticalTouchspin();
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
    isFinished() {
        return this.finish;
    }
    getRandomTreasure() {
        let random = Math.random() * (100 - 0);
        let rarity = 1;
        Object.keys(objectRarityRate).map((key) => {
            if (random > objectRarityRate[key]) {
                rarity = parseInt(key) + 1;
            }
        });
        let treasureList = Object.values(objectTreasure).filter(treasure => treasure.rarity === rarity);
        return treasureList[Math.floor(Math.random() * treasureList.length)];
    }
    destructor() {
        return __awaiter(this, void 0, void 0, function* () {
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
                if (parseHtml.body) {
                    this.container.append(...Array.from(parseHtml.body.children));
                }
                this.initProgressBar();
                if (this.searchingTreasure !== null) {
                    this.search();
                }
                this.searchTreasureBtn = document.querySelector(objectHTMLElement.treasure_search_btn);
                this.startExpeditionBtn = document.querySelector(objectHTMLElement.treasure_start_expedition_btn);
                this.initEventListener();
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    renderTreasureInformation() {
        var _a;
        let treasure = this.getTreasure();
        if (treasure === null || treasure === undefined) {
            return;
        }
        (_a = document.querySelector(objectHTMLElement.treasure_information)) === null || _a === void 0 ? void 0 : _a.classList.remove('d-none');
        let name = document.querySelector(objectHTMLElement.treasure_information_name);
        let get_time = document.querySelector(objectHTMLElement.treasure_information_get_time);
        let rarity = document.querySelector(objectHTMLElement.treasure_information_rarity);
        let reward = document.querySelector(objectHTMLElement.treasure_information_reward);
        let weight = document.querySelector(objectHTMLElement.treasure_information_weight);
        if (name) {
            name.innerHTML = treasure.name;
        }
        if (get_time) {
            get_time.innerHTML = treasure.get_time.toString();
        }
        if (rarity) {
            rarity.innerHTML = treasure.rarity.toString();
        }
        if (reward) {
            reward.innerHTML = treasure.reward.toString();
        }
        if (weight) {
            weight.innerHTML = treasure.weight.toString();
        }
    }
}
