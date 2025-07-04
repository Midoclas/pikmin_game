var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { objectHTMLElement } from "../../Default.js";
export default class TreasureGetting {
    constructor(treasure) {
        this.treasure = null;
        this.container = document.querySelector(objectHTMLElement.treasure_container);
        this.validateTreasure(treasure);
        this.treasure = treasure;
        this.render();
    }
    initElementType() {
    }
    getTreasure() {
        return this.treasure;
    }
    setTreasure(treasure) {
        this.treasure = treasure;
    }
    isFinished() {
        return true; // TMP
    }
    validateTreasure(treasure) {
        if (treasure === null) {
            throw new Error(`TreasureGetting is call with a treasure set to null`);
        }
        for (const prop in treasure) {
            if (!Object.hasOwn(treasure, prop)) {
                throw new Error(`TreasureGetting is call with an empty treasure object`);
            }
        }
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
                const idleGameplayHtml = yield fetch("./src/views/gameplay/treasure/treasure_getting.html");
                if (!idleGameplayHtml.ok) {
                    throw new Error(`Response status: ${idleGameplayHtml.status}`);
                }
                var html = yield idleGameplayHtml.text();
                const parseHtml = domParser.parseFromString(html, "text/html");
                if (parseHtml.body) {
                    this.container.append(...Array.from(parseHtml.body.children));
                }
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    renderTreasureInformation() {
        var _a, _b, _c, _d, _e;
        let treasure = this.getTreasure();
        if (treasure === null || treasure === undefined) {
            return;
        }
        let name = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector(objectHTMLElement.treasure_information_name);
        let get_time = (_b = this.container) === null || _b === void 0 ? void 0 : _b.querySelector(objectHTMLElement.treasure_information_get_time);
        let rarity = (_c = this.container) === null || _c === void 0 ? void 0 : _c.querySelector(objectHTMLElement.treasure_information_rarity);
        let reward = (_d = this.container) === null || _d === void 0 ? void 0 : _d.querySelector(objectHTMLElement.treasure_information_reward);
        let weight = (_e = this.container) === null || _e === void 0 ? void 0 : _e.querySelector(objectHTMLElement.treasure_information_weight);
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
