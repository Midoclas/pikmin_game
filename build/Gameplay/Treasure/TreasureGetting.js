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
    isFinish() {
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
                if (parseHtml.body.firstChild) {
                    this.container.appendChild(parseHtml.body.firstChild);
                }
            }
            catch (error) {
                console.log();
            }
        });
    }
}
