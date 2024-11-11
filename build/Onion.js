var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Idle from "./Idle.js";
export default class Onion {
    constructor(pikmin, position) {
        this.container = document.getElementById("onion");
        this.idle = Idle.instance;
        this.position = position;
        this.capacity = 0;
        this.selectOnionBtn = null;
        this.selfContainer = null;
        this.pikmin = pikmin;
        this.id = 'onion_' + this.pikmin.id;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initHtml();
            this.initEventListener();
        });
    }
    initEventListener() {
        var _a;
        (_a = this.selectOnionBtn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            var _a;
            if (this.idle.onion == null || this.idle.onion.id !== this.id) {
                this.idle.resetIdle();
                this.idle.setOnion(this);
                document.querySelectorAll(".selectOnion").forEach((nodeElem) => {
                    nodeElem.removeAttribute("disabled");
                });
                (_a = this.selectOnionBtn) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "");
            }
        });
    }
    initHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.container) {
                    return;
                }
                var existingElement = this.container.querySelector('#' + this.id);
                if (existingElement) {
                    existingElement.remove();
                }
                const response = yield fetch("./src/views/onion.html");
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                var html = yield response.text();
                html = html.replaceAll('{onion_id}', this.id)
                    .replaceAll('{pikmin_id}', this.pikmin.id)
                    .replaceAll('{pikmin_upgrade}', this.pikmin.id_upgrade)
                    .replaceAll('{nb_pikmin}', this.pikmin.nbPikmin.toString())
                    .replaceAll('{position}', this.position.toString());
                const parseHtml = new DOMParser().parseFromString(html, "text/html");
                if (parseHtml.body.firstChild) {
                    this.container.appendChild(parseHtml.body.firstChild);
                    this.selfContainer = document.getElementById(this.id);
                    this.selectOnionBtn = document.querySelector("#" + this.id + " .selectOnion");
                    this.container.offsetHeight;
                }
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    static sort() {
        var onions = document.querySelectorAll('.onionContainer');
        onions.forEach((element) => {
            var _a;
            var positionAttr = element.getAttribute("data-position");
            if (positionAttr) {
                var position = parseInt(positionAttr);
                if (position > 1) {
                    (_a = document.querySelector('.onionContainer[data-position="' + (position - 1) + '"]')) === null || _a === void 0 ? void 0 : _a.after(element);
                }
            }
        });
    }
    static landing() {
        var onions = document.querySelectorAll('.onionContainer');
        onions.forEach((element) => {
            var positionAttr = element.getAttribute("data-position");
            var position = 1;
            if (positionAttr) {
                position = parseInt(positionAttr);
            }
            setTimeout(() => {
                var onionImgContainer = element.querySelector(".onionImgContainer");
                onionImgContainer === null || onionImgContainer === void 0 ? void 0 : onionImgContainer.classList.add("landing");
                onionImgContainer === null || onionImgContainer === void 0 ? void 0 : onionImgContainer.addEventListener("animationend", () => {
                    onionImgContainer === null || onionImgContainer === void 0 ? void 0 : onionImgContainer.classList.add("top-0");
                });
            }, position * 500);
        });
    }
    repaint() {
        if (this.selfContainer) {
            var nbPikmin = this.selfContainer.querySelector(".nbPikmin");
            if (nbPikmin) {
                nbPikmin.innerHTML = this.pikmin.getNbPikmin().toString();
            }
        }
    }
}
