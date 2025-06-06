var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Idle from "../Gameplay/Idle.js";
import Context from "../Context.js";
import PikminMap from "../Pikmin/PikminMap.js";
import { moneyRefresh } from "../GlobalEvent.js";
import Game from "../Game.js";
import { objectHTMLElement } from "../Default.js";
export default class Onion {
    constructor(pikmin, position) {
        this.container = document.querySelector(objectHTMLElement.onion);
        this.capacity = 0;
        this.nbPikmin = 0;
        this.pikminInstanceIdle = localStorage.getItem("idle_pikmin_instance");
        this.context = Context.instance;
        this.position = position;
        this.selfContainer = null;
        this.selectOnionBtn = null;
        this.upgradeAttackBtn = null;
        this.upgradeDefenseBtn = null;
        this.upgradeLifePointBtn = null;
        this.unlockBtn = null;
        this.pikmin = pikmin;
        this.id = 'onion_' + this.pikmin.id;
        this.init();
    }
    save(id, value) {
        localStorage.setItem(id, value);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield this.render();
            if (this.pikminInstanceIdle === this.pikmin.id) {
                if (Game.instance.gameplay instanceof Idle) {
                    Game.instance.gameplay.setOnion(this);
                }
                (_a = this.selectOnionBtn) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "");
            }
            this.initEventListener();
            Onion.landing();
        });
    }
    initEventListener() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            (_a = this.selectOnionBtn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                var _a;
                if (Game.instance.gameplay instanceof Idle) {
                    if (Game.instance.gameplay.onion == null || Game.instance.gameplay.onion.id !== this.id) {
                        Game.instance.gameplay.setOnion(this);
                        document.querySelectorAll(objectHTMLElement.onion_select_btn).forEach((nodeElem) => {
                            nodeElem.removeAttribute("disabled");
                        });
                        (_a = this.selectOnionBtn) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "");
                    }
                }
            });
            (_b = this.upgradeAttackBtn) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
                this.pikmin.upgradeAttack();
                document.dispatchEvent(moneyRefresh); //tmp
            });
            (_c = this.upgradeDefenseBtn) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
                this.pikmin.upgradeDefense();
                document.dispatchEvent(moneyRefresh); //tmp
            });
            (_d = this.upgradeLifePointBtn) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
                this.pikmin.upgradeLifePoint();
                document.dispatchEvent(moneyRefresh); //tmp
            });
            (_e = this.unlockBtn) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
                if (this.pikmin.nextUnlock !== null && this.context.getMoney() >= this.pikmin.nextUnlock.unlockCost) {
                    new Onion(this.pikmin.nextUnlock, this.pikmin.nextUnlock.position);
                    this.pikmin.nextUnlock.unlock();
                    this.context.addMoney(-this.pikmin.nextUnlock.unlockCost);
                    document.dispatchEvent(moneyRefresh);
                }
            });
            document.addEventListener("moneyRefresh", () => {
                this.repaint();
            });
        });
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.container) {
                    throw new Error(`Response status: element does not exist`);
                }
                var existingElement = this.container.querySelector('#' + this.id);
                if (existingElement) {
                    existingElement.remove();
                }
                var domParser = new DOMParser();
                const onionHtml = yield fetch("./src/views/onion/onion.html");
                if (!onionHtml.ok) {
                    throw new Error(`Response status: ${onionHtml.status}`);
                }
                var html = yield onionHtml.text();
                html = html
                    .replaceAll('{onion_id}', this.id)
                    .replaceAll('{pikmin_id}', this.pikmin.id)
                    .replaceAll('{pikmin_upgrade}', this.pikmin.id_upgrade)
                    .replaceAll('{nb_pikmin}', this.nbPikmin.toString())
                    .replaceAll('{position}', this.position.toString())
                    .replaceAll('{attack}', this.pikmin.attack.toString())
                    .replaceAll('{life_point}', this.pikmin.lifePoint.toString())
                    .replaceAll('{defense}', this.pikmin.defense.toString());
                const parseHtml = domParser.parseFromString(html, "text/html");
                if (parseHtml.body.firstChild) {
                    this.container.appendChild(parseHtml.body.firstChild);
                    this.selfContainer = document.querySelector('#' + this.id);
                    if (this.selfContainer !== null) {
                        this.selectOnionBtn = this.selfContainer.querySelector(objectHTMLElement.onion_select_btn);
                        this.upgradeAttackBtn = this.selfContainer.querySelector(objectHTMLElement.onion_attack_upgrade_btn);
                        this.upgradeDefenseBtn = this.selfContainer.querySelector(objectHTMLElement.onion_defense_upgrade_btn);
                        this.upgradeLifePointBtn = this.selfContainer.querySelector(objectHTMLElement.onion_life_point_upgrade_btn);
                    }
                }
                document.querySelectorAll(objectHTMLElement.onion_unlock).forEach(e => e.remove());
                if (this.pikmin.nextUnlock !== null && this.pikmin.nextUnlock.lock) {
                    const unlockHtml = yield fetch("./src/views/onion/onionUpgrade.html");
                    if (!unlockHtml.ok) {
                        throw new Error(`Response status: ${unlockHtml.status}`);
                    }
                    var htmlUnlockText = yield unlockHtml.text();
                    htmlUnlockText = htmlUnlockText
                        .replaceAll('{cost_unlock}', this.pikmin.nextUnlock.unlockCost.toString())
                        .replaceAll('{next_unlock_id}', this.pikmin.nextUnlock.id);
                    const parseHtmlUpgrade = domParser.parseFromString(htmlUnlockText, "text/html");
                    if (parseHtmlUpgrade.body.firstChild) {
                        this.container.appendChild(parseHtmlUpgrade.body.firstChild);
                    }
                    this.unlockBtn = document.querySelector('#onion_unlock_' + this.pikmin.nextUnlock.id);
                    if (this.unlockBtn) {
                        if (this.context.getMoney() < this.pikmin.nextUnlock.unlockCost) {
                            this.unlockBtn.classList.add('disabled');
                            this.unlockBtn.setAttribute("disabled", "true");
                        }
                    }
                }
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    static sort() {
        var onions = document.querySelectorAll(objectHTMLElement.onion_container);
        onions.forEach((element) => {
            var _a;
            var positionAttr = element.getAttribute("data-position");
            if (positionAttr) {
                var position = parseInt(positionAttr);
                if (position > 1) {
                    (_a = document.querySelector(objectHTMLElement.onion_container + '[data-position="' + (position - 1) + '"]')) === null || _a === void 0 ? void 0 : _a.after(element);
                }
            }
        });
    }
    static initOnion() {
        return __awaiter(this, void 0, void 0, function* () {
            let pikminMap = new PikminMap();
            for (const key in pikminMap.mapping) {
                if (pikminMap.mapping.hasOwnProperty(key)) {
                    new Onion(pikminMap.mapping[key], pikminMap.mapping[key].position);
                }
            }
            setTimeout(() => {
                this.sort();
            }, 100);
        });
    }
    static landing() {
        var onions = document.querySelectorAll(objectHTMLElement.onion_container);
        onions.forEach((element) => {
            var positionAttr = element.getAttribute("data-position");
            var position = 1;
            if (positionAttr) {
                position = parseInt(positionAttr);
            }
            setTimeout(() => {
                var onionImgContainer = element.querySelector(objectHTMLElement.onion_image_container);
                onionImgContainer === null || onionImgContainer === void 0 ? void 0 : onionImgContainer.classList.add("landing");
                onionImgContainer === null || onionImgContainer === void 0 ? void 0 : onionImgContainer.addEventListener("animationend", () => {
                    onionImgContainer === null || onionImgContainer === void 0 ? void 0 : onionImgContainer.classList.add("top-0");
                });
            }, 5000 / position);
        });
    }
    repaint() {
        if (this.selfContainer) {
            var nbPikmin = this.selfContainer.querySelector(objectHTMLElement.onion_nb_pikmin);
            var attack = this.selfContainer.querySelector(objectHTMLElement.onion_attack);
            var lifePoint = this.selfContainer.querySelector(objectHTMLElement.onion_life_point);
            var defense = this.selfContainer.querySelector(objectHTMLElement.onion_defense);
            if (nbPikmin) {
                nbPikmin.innerHTML = this.pikmin.getNbPikmin().toString();
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
