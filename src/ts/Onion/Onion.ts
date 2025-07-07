import Pikmin from "../Pikmin/Pikmin";
import Idle from "../Gameplay/Idle";
import Context from "../Context";
import PikminMap from "../Pikmin/PikminMap";
import { moneyRefresh } from "../GlobalEvent";
import Game from "../Game";
import { objectHTMLElement } from "../Default";

export default class Onion {
    
    id: string;
    container = document.querySelector(objectHTMLElement.onion);

    capacity = 0;
    position: number;
    pikmin: Pikmin;
    
    selfContainer : HTMLElement|null;
    selectOnionBtn : HTMLElement|null;
    upgradeAttackBtn: HTMLElement|null;
    upgradeDefenseBtn: HTMLElement|null;
    upgradeLifePointBtn: HTMLElement|null
    unlockBtn: HTMLElement|null;

    pikminInstanceIdle= localStorage.getItem("idle_pikmin_instance");
    context = Context.instance;

    constructor(pikmin: Pikmin, position: number) {
        this.position = position;
        this.selfContainer = null;
        this.selectOnionBtn = null;
        this.upgradeAttackBtn = null;
        this.upgradeDefenseBtn = null;
        this.upgradeLifePointBtn = null;
        this.unlockBtn = null;
        this.pikmin = pikmin;
        this.id = 'onion_'+this.pikmin.getId();
        this.init();
    }

    save(id: string, value: string) {
        localStorage.setItem(id, value);
    }

    async init() {
        await this.render();
        if (this.pikminInstanceIdle === this.pikmin.getId()) {
            if (Game.instance.gameplay instanceof Idle) {
                Game.instance.gameplay.setOnion(this);
            }
            
            this.selectOnionBtn?.setAttribute("disabled", "");
        }
        this.initEventListener();
        
        Onion.landing();    
    }

    async initEventListener() {
        this.selectOnionBtn?.addEventListener("click", () => {
            if (Game.instance.gameplay instanceof Idle) {
                if (Game.instance.gameplay.onion == null || Game.instance.gameplay.onion.id !== this.id) {
                    Game.instance.gameplay.setOnion(this);
                    document.querySelectorAll(objectHTMLElement.onion_select_btn).forEach((nodeElem) => {
                        nodeElem.removeAttribute("disabled");
                    })
                    this.selectOnionBtn?.setAttribute("disabled", "");
                }
            }
        })
        this.upgradeAttackBtn?.addEventListener("click", () => {
            this.pikmin.upgradeAttack();
            document.dispatchEvent(moneyRefresh); //tmp
        })
        this.upgradeDefenseBtn?.addEventListener("click", () => {
            this.pikmin.upgradeDefense();
            document.dispatchEvent(moneyRefresh); //tmp
        })
        this.upgradeLifePointBtn?.addEventListener("click", () => {
            this.pikmin.upgradeLifePoint();
            document.dispatchEvent(moneyRefresh); //tmp
        })
        this.unlockBtn?.addEventListener("click", () => {
            let nextUnlock = this.pikmin.getNextUnlock();
            if (nextUnlock !== null && this.context.getMoney() >= nextUnlock.unlockCost) {
                new Onion(nextUnlock, nextUnlock.position);
                nextUnlock.unlock();
                this.context.addMoney(-nextUnlock.unlockCost);
                document.dispatchEvent(moneyRefresh);
            }
        });

        document.addEventListener("moneyRefresh", () => {
            this.repaint();
        })
    }

    async render() {

        try {
            if (!this.container) {
                throw new Error(`Response status: element does not exist`);
            }
            var existingElement = this.container.querySelector('#'+this.id);
            if (existingElement) {
                existingElement.remove();
            }

            var domParser = new DOMParser();

            const onionHtml = await fetch("./src/views/onion/onion.html");
            if (!onionHtml.ok) {
                throw new Error(`Response status: ${onionHtml.status}`);
            }

            var html = await onionHtml.text();
            html = html
                .replaceAll('{onion_id}', this.id)
                .replaceAll('{pikmin_id}', this.pikmin.getId())
                .replaceAll('{pikmin_upgrade}', this.pikmin.id_upgrade)
                .replaceAll('{nb_pikmin}', this.pikmin.getNbPikmin().toString())
                .replaceAll('{position}', this.position.toString())
                .replaceAll('{attack}', this.pikmin.getAttack().toString())
                .replaceAll('{life_point}', this.pikmin.getLifePoint().toString())
                .replaceAll('{defense}', this.pikmin.getDefense().toString());
            const parseHtml = domParser.parseFromString(html, "text/html");

            if (parseHtml.body) {
                this.container.append(...Array.from(parseHtml.body.children))
                this.selfContainer = document.querySelector('#'+this.id);
                if (this.selfContainer !== null) {
                    this.selectOnionBtn = this.selfContainer.querySelector(objectHTMLElement.onion_select_btn);
                    this.upgradeAttackBtn = this.selfContainer.querySelector(objectHTMLElement.onion_attack_upgrade_btn);
                    this.upgradeDefenseBtn = this.selfContainer.querySelector(objectHTMLElement.onion_defense_upgrade_btn);
                    this.upgradeLifePointBtn = this.selfContainer.querySelector(objectHTMLElement.onion_life_point_upgrade_btn);
                }                
            }
            document.querySelectorAll(objectHTMLElement.onion_unlock).forEach(e => e.remove());
            let nextUnlock = this.pikmin.getNextUnlock();
            if (nextUnlock !== null && nextUnlock.lock) {
                const unlockHtml = await fetch("./src/views/onion/onionUpgrade.html");
                if (!unlockHtml.ok) {
                    throw new Error(`Response status: ${unlockHtml.status}`);
                }
                
                var htmlUnlockText = await unlockHtml.text();
                htmlUnlockText = htmlUnlockText
                    .replaceAll('{cost_unlock}', nextUnlock.getUnlockCost().toString())
                    .replaceAll('{next_unlock_id}', nextUnlock.id);
                const parseHtmlUpgrade = domParser.parseFromString(htmlUnlockText, "text/html");

                if (parseHtmlUpgrade.body.firstChild) {
                    this.container.appendChild(parseHtmlUpgrade.body.firstChild);
                }
                this.unlockBtn = document.querySelector('#onion_unlock_'+nextUnlock.id);
                if (this.unlockBtn) {
                    if (this.context.getMoney() < nextUnlock.getUnlockCost()) {
                        this.unlockBtn.classList.add('disabled');
                        this.unlockBtn.setAttribute("disabled", "true");
                    }
                }
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    static sort() {
        var onions = document.querySelectorAll(objectHTMLElement.onion_container);
        onions.forEach((element) => {
            var positionAttr = element.getAttribute("data-position");
            if (positionAttr) {
                var position = parseInt(positionAttr);
                if (position > 1) {
                    document.querySelector(objectHTMLElement.onion_container+'[data-position="'+(position-1)+'"]')?.after(element);
                }
            }
        });
    }

    static async initOnion() {
        let pikminMap = new PikminMap();
        for (const key in pikminMap.mapping) {
            if (pikminMap.mapping.hasOwnProperty(key)) {
                new Onion(pikminMap.mapping[key], pikminMap.mapping[key].position);
            }
        }
        setTimeout(() => {
            this.sort();
        }, 100);
    }

    static landing() {
        var onions = document.querySelectorAll(objectHTMLElement.onion_container);
        onions.forEach((element) => {
            var positionAttr = element.getAttribute("data-position");
            var position = 1
            if (positionAttr) {
                position = parseInt(positionAttr);
            }
            setTimeout(() => {
                var onionImgContainer = element.querySelector(objectHTMLElement.onion_image_container);
                onionImgContainer?.classList.add("landing");
                onionImgContainer?.addEventListener("animationend", () => {
                    onionImgContainer?.classList.add("top-0")
                });
            }, position*500)
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