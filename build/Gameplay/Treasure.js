var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { objectHTMLElement } from "../Default.js";
import VerticalTouchspin from "../ElementsType/VerticalTouchspin.js";
export default class Treasure extends VerticalTouchspin {
    constructor() {
        let query = "idleProgressBar";
        super(query);
        this.gameplayContainer = document.querySelector(objectHTMLElement.gameplay_container);
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.render();
            this.initElementType();
            this.initEventListener();
        });
    }
    destructor() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    initEventListener() {
    }
    render() {
        const _super = Object.create(null, {
            render: { get: () => super.render }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.gameplayContainer) {
                    throw new Error(`Response status: element does not exist`);
                }
                this.gameplayContainer.innerHTML = "";
                var domParser = new DOMParser();
                const idleGameplayHtml = yield fetch("./src/views/gameplay/treasure.html");
                if (!idleGameplayHtml.ok) {
                    throw new Error(`Response status: ${idleGameplayHtml.status}`);
                }
                var html = yield idleGameplayHtml.text();
                const parseHtml = domParser.parseFromString(html, "text/html");
                if (parseHtml.body.firstChild) {
                    this.gameplayContainer.appendChild(parseHtml.body.firstChild);
                    // if (this.gameplayContainer !== null) {
                    //     this.btn = this.gameplayContainer.querySelector(objectHTMLElement.idle_harvest_btn);
                    // }
                }
            }
            catch (error) {
                console.log();
            }
            _super.render.call(this);
        });
    }
    repaint() {
    }
}
