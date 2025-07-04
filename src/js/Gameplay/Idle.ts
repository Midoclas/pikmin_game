import { objectHTMLElement } from "../Default.js";
import ProgressBar from "../ElementsType/ProgressBar.js"
import Onion from "../Onion/Onion.js";
import GameplayInterface from "./GameplayInterface.js";

export default class Idle implements GameplayInterface {

    onion: Onion|null;
    isHarvestable = false;
    gameplayContainer: null|HTMLElement;
    progressBar: ProgressBar;
    btn: null|HTMLElement;

    constructor() {
        this.progressBar = new ProgressBar(objectHTMLElement.idle_progress_bar, false);

        this.gameplayContainer = document.querySelector(objectHTMLElement.gameplay_container);
        this.btn = null;
        this.onion = null;
        this.init();
    }

    async init()  {
        await this.render();
        this.progressBar.initElementType();
        await Onion.initOnion();
        this.initEventListener();
        this.repaint(); 
    }

    async destructor(): Promise<void> {
        if (this.onion?.pikmin.id) {
            localStorage.setItem("idle_pikmin_instance", this.onion?.pikmin.id)
        };
        this.progressBar.firstIteration = true;
    }

    initEventListener() {
        this.btn?.addEventListener("click", () => {
            if (this.onion !== null) {
                this.harvest();
            }
        })

        this.progressBar.objectElement?.addEventListener("animationend", () => {
            if (this.onion !== null) {
                this.isHarvestable = true;
                this.repaint();
            }
        })

        this.progressBar.initEventListener();
    }

    setOnion(onion: Onion) {
        this.resetIdle();

        this.onion = onion;
        if (localStorage.getItem("idle_pikmin_instance") !== this.onion.pikmin.id) {
            this.progressBar.restoreInitialState();
        }
        this.progressBar.setTimeProgressBar(onion.pikmin.growTime);
        this.plant();
        document.querySelector(objectHTMLElement.idle_pikmin_animation)?.classList.add('plant', this.onion?.pikmin.id+"_plant_animation", "mx-auto");
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
        this.repaint() 
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
            
            if (parseHtml.body) {
                this.gameplayContainer.append(...Array.from(parseHtml.body.children))
                if (this.gameplayContainer !== null) {
                    this.btn = this.gameplayContainer.querySelector(objectHTMLElement.idle_harvest_btn);
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