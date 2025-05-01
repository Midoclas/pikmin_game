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
import VerticalTouchspin from "../../ElementsType/VerticalTouchspin.js";
import TreasureGetting from "./TreasureGetting.js";
import TreasureHunting from "./TreasureHunting.js";
export default class Treasure extends VerticalTouchspin {
    constructor() {
        let query = objectHTMLElement.treasure_container;
        super(query);
        this.treasure = "";
        this.treasureFound = "";
        this.action = null;
        this.gameplayContainer = document.querySelector(objectHTMLElement.gameplay_container);
        this.init();
    }
    init() {
        const _super = Object.create(null, {
            render: { get: () => super.render },
            initEventListener: { get: () => super.initEventListener }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.initStorage();
            yield this.render();
            this.initElementType();
            yield _super.render.call(this);
            _super.initEventListener.call(this);
            this.initAction();
            this.initEventListener();
        });
    }
    initStorage() {
        let instanceTreasureStoredValue = localStorage.getItem("instance_treasure");
        let treasureFoundStoredValue = localStorage.getItem("treasure_found");
        if (instanceTreasureStoredValue !== null) {
            this.setTreasure(instanceTreasureStoredValue);
        }
        if (treasureFoundStoredValue !== null) {
            this.setTreasureFound(treasureFoundStoredValue);
        }
    }
    initAction() {
        if (this.treasure.length > 0) {
            this.action = new TreasureGetting(this.treasure);
        }
        else {
            this.action = new TreasureHunting();
        }
    }
    destructor() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.setTreasure.length > 0) {
                localStorage.setItem("instance_treasure", this.treasure);
            }
            else {
                localStorage.removeItem("instance_treasure");
            }
        });
    }
    initEventListener() {
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
