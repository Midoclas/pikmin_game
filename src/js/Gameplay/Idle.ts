import ProgressBar from "../ElementsType/ProgressBar.js"
import Onion from "../Onion/Onion.js";
import GameplayInterface from "./GameplayInterface.js";

export default class Idle extends ProgressBar implements GameplayInterface {

    onion: Onion|null;
    isHarvestable = false;
    gameplayContainer: null|HTMLElement;
    btn: null|HTMLElement;

    constructor() {
        let query = "idleProgressBar";
        super(query, false);

        this.gameplayContainer = document.getElementById("gameplay_content");
        this.btn = null;
        this.onion = null;
        this.init();
    }

    async init()  {
        await this.render();
        this.initElementType();
        await Onion.initOnion();
        this.initEventListener();
        this.repaint(); 
    }

    async destructor(): Promise<void> {
        if (this.onion?.pikmin.id) {
            localStorage.setItem("idle-pikmin-instance", this.onion?.pikmin.id)
        };
        await super.destructor();
        this.firstIteration = true;
    }

    initEventListener() {
        this.btn?.addEventListener("click", () => {
            if (this.onion !== null) {
                this.harvest();
            }
        })

        this.objectElement?.addEventListener("animationend", () => {
            if (this.onion !== null) {
                this.isHarvestable = true;
                this.repaint();
            }
        })

        window.addEventListener("beforeunload", () => {
            this.destructor();
        })

        super.initEventListener();
    }

    start() {
        this.plant();
        document.getElementById('idle-animation')?.classList.add('plant', this.onion?.pikmin.id+"_plant_animation", "mx-auto");
    }

    setOnion(onion: Onion) {
        this.resetIdle();
        this.onion = onion;
        if (localStorage.getItem("idle_pikmin_instance") !== this.onion.pikmin.id) {
            this.progression = "";
        }
        this.setTimeProgressBar(onion.pikmin.growTime);
        this.start();
    }

    resetIdle() {
        this.onion = null;
        this.isHarvestable = false;
        var idleAnimation = document.getElementById('idle-animation');
        if (idleAnimation !== null) {
            idleAnimation.className = "";
        }
        this.repaint();
    }

    plant() {
        this.isHarvestable = false;
        this.resetProgressBar();
        this.repaint() 
    }

    harvest() {
        if (this.isHarvestable && this.onion !== null) {
            this.onion.add(1);
            this.plant();
            this.progression = "";
            this.onion.repaint();
        }
        return false;
    }

    async render() {
        try {
            if (!this.gameplayContainer) {
                throw new Error(`Response status: element does not exist`);
            }
            this.gameplayContainer.innerHTML = "";

            var domParser = new DOMParser();
            
            const idleGameplayHtml = await fetch("./src/views/gameplay/idle.html");
            if (!idleGameplayHtml.ok) {
                throw new Error(`Response status: ${idleGameplayHtml.status}`);
            }

            var html = await idleGameplayHtml.text();

            const parseHtml = domParser.parseFromString(html, "text/html");
            
            if (parseHtml.body.firstChild) {
                this.gameplayContainer.appendChild(parseHtml.body.firstChild);
                if (this.gameplayContainer !== null) {
                    this.btn = this.gameplayContainer.querySelector("#harvest");
                }
            }       
        } catch (error: any) {
            console.error(error.message);
        }
    }

    repaint() {
        if (this.isHarvestable) {
            this.btn?.removeAttribute("disabled");
        } else {
            this.btn?.setAttribute("disabled", "");
        }
    }
}