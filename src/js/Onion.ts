import Pikmin from "./Pikmin/Pikmin.js";
import Idle from "./Idle.js";

export default class Onion {
    
    capacity: number;
    nbPikmin = 0;
    pikmin: Pikmin;
    position: number;
    id: string;
    selectOnionBtn : HTMLElement|null;
    container = document.getElementById("onion");
    selfContainer : HTMLElement|null;
    idle = Idle.instance;

    constructor(pikmin: Pikmin, position: number) {
        this.position = position;
        this.capacity = 0;
        this.selectOnionBtn = null;
        this.selfContainer = null;
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
        var storedValue = localStorage.getItem(this.pikmin.id);
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
        this.selfContainer?.querySelector(".attack_upgrade")?.addEventListener("click", () => {
            this.pikmin.upgradeAttack();
            this.repaint();
        })
        this.selfContainer?.querySelector(".defense_upgrade")?.addEventListener("click", () => {
            this.pikmin.upgradeDefense();
            this.repaint();
        })
        this.selfContainer?.querySelector(".life_point_upgrade")?.addEventListener("click", () => {
            this.pikmin.upgradeLifePoint();
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

            const response = await fetch("./src/views/onion.html");
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        
            var html = await response.text();
            html = html.replaceAll('{onion_id}', this.id)
                .replaceAll('{pikmin_id}', this.pikmin.id)
                .replaceAll('{pikmin_upgrade}', this.pikmin.id_upgrade)
                .replaceAll('{nb_pikmin}', this.nbPikmin.toString())
                .replaceAll('{position}', this.position.toString())
                .replaceAll('{attack}', this.pikmin.attack.toString())
                .replaceAll('{life_point}', this.pikmin.lifePoint.toString())
                .replaceAll('{defense}', this.pikmin.defense.toString());
            const parseHtml = new DOMParser().parseFromString(html, "text/html")
            if (parseHtml.body.firstChild) {
                this.container.appendChild(parseHtml.body.firstChild);
                this.selfContainer = document.getElementById(this.id);
                this.selectOnionBtn = document.querySelector("#"+this.id+" .selectOnion");
                this.container.offsetHeight;
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