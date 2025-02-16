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
        this.nbPikmin = 0;
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
    save(id, value) {
        localStorage.setItem(id, value);
    }
    getNbPikmin() {
        return this.nbPikmin;
    }
    setNbPikmin(nb) {
        this.nbPikmin = nb;
        this.save(this.pikmin.id, this.nbPikmin.toString());
    }
    add(nb) {
        this.nbPikmin += nb;
        this.save(this.pikmin.id, this.nbPikmin.toString());
    }
    remove(nb) {
        this.nbPikmin -= nb;
        this.save(this.pikmin.id, this.nbPikmin.toString());
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initStorage();
            yield this.initHtml();
            this.initEventListener();
            Onion.landing();
        });
    }
    initStorage() {
        var storedValue = localStorage.getItem(this.pikmin.id);
        if (storedValue !== null) {
            this.setNbPikmin(parseInt(storedValue));
        }
    }
    initEventListener() {
        var _a, _b, _c, _d, _e, _f, _g;
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
        (_c = (_b = this.selfContainer) === null || _b === void 0 ? void 0 : _b.querySelector(".attack_upgrade")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            this.pikmin.upgradeAttack();
            this.repaint();
        });
        (_e = (_d = this.selfContainer) === null || _d === void 0 ? void 0 : _d.querySelector(".defense_upgrade")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
            this.pikmin.upgradeDefense();
            this.repaint();
        });
        (_g = (_f = this.selfContainer) === null || _f === void 0 ? void 0 : _f.querySelector(".life_point_upgrade")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
            this.pikmin.upgradeLifePoint();
            this.repaint();
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
                    .replaceAll('{nb_pikmin}', this.nbPikmin.toString())
                    .replaceAll('{position}', this.position.toString())
                    .replaceAll('{attack}', this.pikmin.attack.toString())
                    .replaceAll('{life_point}', this.pikmin.lifePoint.toString())
                    .replaceAll('{defense}', this.pikmin.defense.toString());
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
            var attack = this.selfContainer.querySelector(".attack");
            var lifePoint = this.selfContainer.querySelector(".life_point");
            var defense = this.selfContainer.querySelector(".defense");
            if (nbPikmin) {
                nbPikmin.innerHTML = this.getNbPikmin().toString();
            }
            if (attack) {
                attack.innerHTML = this.pikmin.getAttack().toString();
            }
            if (lifePoint) {
                lifePoint.innerHTML = this.pikmin.getLifePoint().toString();
            }
            if (defense) {
                defense.innerHTML = this.pikmin.getDefense().toString();
            }
        }
    }
}
