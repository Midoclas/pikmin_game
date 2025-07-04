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
import ProgressBar from "../ElementsType/ProgressBar.js";
import Onion from "../Onion/Onion.js";
export default class Idle {
    constructor() {
        this.isHarvestable = false;
        this.progressBar = new ProgressBar(objectHTMLElement.idle_progress_bar, false);
        this.gameplayContainer = document.querySelector(objectHTMLElement.gameplay_container);
        this.btn = null;
        this.onion = null;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.render();
            this.progressBar.initElementType();
            yield Onion.initOnion();
            this.initEventListener();
            this.repaint();
        });
    }
    destructor() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if ((_a = this.onion) === null || _a === void 0 ? void 0 : _a.pikmin.id) {
                localStorage.setItem("idle_pikmin_instance", (_b = this.onion) === null || _b === void 0 ? void 0 : _b.pikmin.id);
            }
            ;
            this.progressBar.firstIteration = true;
        });
    }
    initEventListener() {
        var _a, _b;
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            if (this.onion !== null) {
                this.harvest();
            }
        });
        (_b = this.progressBar.objectElement) === null || _b === void 0 ? void 0 : _b.addEventListener("animationend", () => {
            if (this.onion !== null) {
                this.isHarvestable = true;
                this.repaint();
            }
        });
        this.progressBar.initEventListener();
    }
    setOnion(onion) {
        var _a, _b;
        this.resetIdle();
        this.onion = onion;
        if (localStorage.getItem("idle_pikmin_instance") !== this.onion.pikmin.id) {
            this.progressBar.restoreInitialState();
        }
        this.progressBar.setTimeProgressBar(onion.pikmin.growTime);
        this.plant();
        (_a = document.querySelector(objectHTMLElement.idle_pikmin_animation)) === null || _a === void 0 ? void 0 : _a.classList.add('plant', ((_b = this.onion) === null || _b === void 0 ? void 0 : _b.pikmin.id) + "_plant_animation", "mx-auto");
    }
    resetIdle() {
        this.onion = null;
        this.isHarvestable = false;
        var idleAnimation = document.querySelector(objectHTMLElement.idle_pikmin_animation);
        if (idleAnimation !== null) {
            idleAnimation.className = "";
        }
        this.repaint();
    }
    plant() {
        this.isHarvestable = false;
        this.progressBar.resetProgressBar();
        this.repaint();
    }
    harvest() {
        if (this.isHarvestable && this.onion !== null) {
            this.onion.pikmin.add(1);
            this.progressBar.restoreInitialState();
            this.plant();
            this.onion.repaint();
        }
        return false;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.gameplayContainer) {
                    throw new Error(`Response status: element does not exist`);
                }
                this.gameplayContainer.innerHTML = "";
                var domParser = new DOMParser();
                const idleGameplayHtml = yield fetch("./src/views/gameplay/idle.html");
                if (!idleGameplayHtml.ok) {
                    throw new Error(`Response status: ${idleGameplayHtml.status}`);
                }
                var html = yield idleGameplayHtml.text();
                const parseHtml = domParser.parseFromString(html, "text/html");
                if (parseHtml.body) {
                    this.gameplayContainer.append(...Array.from(parseHtml.body.children));
                    if (this.gameplayContainer !== null) {
                        this.btn = this.gameplayContainer.querySelector(objectHTMLElement.idle_harvest_btn);
                    }
                }
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    repaint() {
        var _a, _b;
        if (this.isHarvestable) {
            (_a = this.btn) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
        }
        else {
            (_b = this.btn) === null || _b === void 0 ? void 0 : _b.setAttribute("disabled", "");
        }
    }
}
