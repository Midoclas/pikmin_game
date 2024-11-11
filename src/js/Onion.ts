import Pikmin from "./Pikmin.js";
import Idle from "./Idle.js";

export default class Onion {
    
    capacity: number;
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

    async init() {
        await this.initHtml();
        this.initEventListener();
        Onion.landing();
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
                .replaceAll('{nb_pikmin}', this.pikmin.nbPikmin.toString())
                .replaceAll('{position}', this.position.toString());
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
            if (nbPikmin) {
                nbPikmin.innerHTML = this.pikmin.getNbPikmin().toString();
            }
        }
    }
}   