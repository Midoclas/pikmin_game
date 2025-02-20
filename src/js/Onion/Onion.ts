import Pikmin from "../Pikmin/Pikmin.js";
import Idle from "../Idle.js";
import * as GlobalEvent from "../GlobalEvent.js";
import Context from "../Context.js";
import PikminMap from "../Pikmin/PikminMap.js";
import { moneyRefresh } from "../GlobalEvent.js";

export default class Onion {
    
    id: string;
    container = document.getElementById("onion");

    capacity = 0;
    position: number;
    nbPikmin = 0;
    pikmin: Pikmin;
    
    selfContainer : HTMLElement|null;
    selectOnionBtn : HTMLElement|null;
    upgradeAttackBtn: HTMLElement|null;
    upgradeDefenseBtn: HTMLElement|null;
    upgradeLifePointBtn: HTMLElement|null
    unlockBtn: HTMLElement|null;

    idle = Idle.instance;
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
        this.id = 'onion_'+this.pikmin.id;
        this.init();
    }

    save(id: string, value: string) {
        localStorage.setItem(id, value);
    }

    getNbPikmin() {
        return this.nbPikmin;
    }
    
    setNbPikmin(nb: number) {
        this.nbPikmin = nb;
        this.save(this.pikmin.id, this.nbPikmin.toString());
    }

    add(nb: number) {
        this.nbPikmin += nb;
        this.save(this.pikmin.id, this.nbPikmin.toString());
    }

    remove(nb: number) {
        this.nbPikmin -= nb;
        this.save(this.pikmin.id, this.nbPikmin.toString());
    }

    async init() {
        this.initStorage();
        await this.initHtml();
        this.initEventListener();
        Onion.landing();
    }

    initStorage() {
        let storedValue = localStorage.getItem(this.pikmin.id);
        if (storedValue !== null) {
            this.setNbPikmin(parseInt(storedValue));
        }
    }

    initEventListener() {
        this.selectOnionBtn?.addEventListener("click", () => {
            if (this.idle.onion == null || this.idle.onion.id !== this.id) {
                this.idle.resetIdle();
                this.idle.setOnion(this);
                document.querySelectorAll(".selectOnion").forEach((nodeElem) => {
                    nodeElem.removeAttribute("disabled");
                })
                this.selectOnionBtn?.setAttribute("disabled", "");
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
            if (this.pikmin.nextUnlock !== null && this.context.getMoney() >= this.pikmin.nextUnlock.unlockCost) {
                new Onion(this.pikmin.nextUnlock, this.pikmin.nextUnlock.position);
                this.pikmin.nextUnlock.unlock();
                this.context.addMoney(-this.pikmin.nextUnlock.unlockCost);
                document.dispatchEvent(GlobalEvent.moneyRefresh);
            }
        });
        document.addEventListener("moneyRefresh", () => {
            this.repaint();
        })
    }

    async initHtml() {

        try {
            if (!this.container) {
                return;
            }
            var existingElement = this.container.querySelector('#'+this.id)
            if (existingElement) {
                existingElement.remove();
            }

            var domParser = new DOMParser();
            
            const onionHtml = await fetch("./src/views/onion.html");
            if (!onionHtml.ok) {
                throw new Error(`Response status: ${onionHtml.status}`);
            }

            var html = await onionHtml.text();
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
                this.selfContainer = document.getElementById(this.id);
                if (this.selfContainer !== null) {
                    this.selectOnionBtn = this.selfContainer.querySelector(".selectOnion");
                    this.upgradeAttackBtn = this.selfContainer.querySelector(".attack_upgrade");
                    this.upgradeDefenseBtn = this.selfContainer.querySelector(".defense_upgrade");
                    this.upgradeLifePointBtn = this.selfContainer.querySelector(".life_point_upgrade");
                }
                
                this.container.offsetHeight;
            }
            document.querySelectorAll('#onion_unlock').forEach(e => e.remove());
            if (this.pikmin.nextUnlock !== null && this.pikmin.nextUnlock.lock) {
                const unlockHtml = await fetch("./src/views/onionUpgrade.html");
                if (!unlockHtml.ok) {
                    throw new Error(`Response status: ${unlockHtml.status}`);
                }
                
                var htmlUnlockText = await unlockHtml.text();
                htmlUnlockText = htmlUnlockText
                    .replaceAll('{cost_unlock}', this.pikmin.nextUnlock.unlockCost.toString())
                    .replaceAll('{next_unlock_id}', this.pikmin.nextUnlock.id);
                const parseHtmlUpgrade = domParser.parseFromString(htmlUnlockText, "text/html");

                if (parseHtmlUpgrade.body.firstChild) {
                    this.container.appendChild(parseHtmlUpgrade.body.firstChild);
                }
                this.unlockBtn = document.getElementById('onion_unlock_'+this.pikmin.nextUnlock.id);
                if (this.unlockBtn) {
                    if (this.context.getMoney() < this.pikmin.nextUnlock.unlockCost) {
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
        var onions = document.querySelectorAll('.onionContainer');
        onions.forEach((element) => {
            var positionAttr = element.getAttribute("data-position");
            if (positionAttr) {
                var position = parseInt(positionAttr);
                if (position > 1) {
                    document.querySelector('.onionContainer[data-position="'+(position-1)+'"]')?.after(element);
                }
            }
        });
    }

    static initOnion() {
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
        var onions = document.querySelectorAll('.onionContainer');
        onions.forEach((element) => {
            var positionAttr = element.getAttribute("data-position");
            var position = 1
            if (positionAttr) {
                position = parseInt(positionAttr);
            }
            setTimeout(() => {
                var onionImgContainer = element.querySelector(".onionImgContainer");
                onionImgContainer?.classList.add("landing");
                onionImgContainer?.addEventListener("animationend", () => {
                    onionImgContainer?.classList.add("top-0")
                });
            }, position*500)
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