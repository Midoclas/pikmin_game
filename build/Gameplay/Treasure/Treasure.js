var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { objectHTMLElement, objectTreasure } from "../../Default.js";
import TreasureGetting from "./TreasureGetting.js";
import TreasureHunting from "./TreasureHunting.js";
export default class Treasure {
    constructor() {
        this.treasure = null;
        this.treasureFound = null;
        let query = objectHTMLElement.treasure_container;
        this.action = null;
        this.gameplayContainer = document.querySelector(objectHTMLElement.gameplay_container);
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initStorage();
            yield this.render();
            this.initAction();
            if (this.action) {
                this.action.render();
                this.action.initElementType();
            }
            this.initEventListener();
        });
    }
    initStorage() {
        let instanceTreasureStoredValue = localStorage.getItem("instance_treasure");
        let treasureFoundStoredValue = localStorage.getItem("treasure_found");
        if (instanceTreasureStoredValue !== null) {
            let treasure = Object.values(objectTreasure).filter(treasure => treasure.name === instanceTreasureStoredValue)[0];
            this.setTreasure(treasure);
        }
        if (treasureFoundStoredValue !== null) {
            let treasure = Object.values(objectTreasure).filter(treasure => treasure.name === treasureFoundStoredValue)[0];
            this.setTreasureFound(treasure);
        }
    }
    initAction() {
        if (this.treasure !== null) {
            this.action = new TreasureGetting(this.treasure);
        }
        else {
            this.action = new TreasureHunting();
        }
    }
    destructor() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.treasure !== null) {
                localStorage.setItem("instance_treasure", this.treasure.name);
            }
            else {
                localStorage.removeItem("instance_treasure");
            }
            (_a = this.action) === null || _a === void 0 ? void 0 : _a.destructor();
        });
    }
    initEventListener() {
        var _a;
        (_a = document.querySelector('#start_treasure_expedition')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            if (this.action instanceof TreasureHunting && this.action.isFinish()) {
                this.action = new TreasureGetting(this.action.getTreasure());
            }
        });
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.gameplayContainer) {
                    throw new Error(`Response status: element does not exist`);
                }
                this.gameplayContainer.innerHTML = "";
                var domParser = new DOMParser();
                const idleGameplayHtml = yield fetch("./src/views/gameplay/treasure/treasure.html");
                if (!idleGameplayHtml.ok) {
                    throw new Error(`Response status: ${idleGameplayHtml.status}`);
                }
                var html = yield idleGameplayHtml.text();
                const parseHtml = domParser.parseFromString(html, "text/html");
                if (parseHtml.body.firstChild) {
                    this.gameplayContainer.appendChild(parseHtml.body.firstChild);
                }
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    repaint() {
    }
    setTreasure(treasure) {
        this.treasure = treasure;
    }
    setTreasureFound(treasure) {
        this.treasureFound = treasure;
    }
}
