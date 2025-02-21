import ProgressBar from "../ElementsType/ProgressBar.js"
import Onion from "../Onion/Onion.js";
import GameplayInterface from "./GameplayInterface.js";

export default class Idle extends ProgressBar implements GameplayInterface {

    static #instance : Idle;
    onion: Onion|null;
    timeoutId = 0;
    isHarvestable = false;
    btn = document.getElementById("harvest");

    constructor(onion: Onion|null) {
        let query = "idleProgressBar";
        super(query, false);

        this.onion = onion;
        this.initEventListener();
        if (this.onion !== null) {
            this.init();
        } else {
            this.repaint();
        }
        
    }

    public static get instance(): Idle {
        if (!Idle.#instance) {
            Idle.#instance = new Idle(null);
        }

        return Idle.#instance;
    }

    initEventListener() {
        super.initEventListener();

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
            if (this.onion?.pikmin.id) {
                localStorage.setItem("idle-pikmin-instance", this.onion?.pikmin.id)
            }
            this.destructor();
        })
    }

    init() {
        this.plant();
        document.getElementById('idle-animation')?.classList.add('plant', this.onion?.pikmin.id+"_plant_animation", "mx-auto");
    }

    setOnion(onion: Onion) {
        this.onion = onion;
        if (localStorage.getItem("idle_pikmin_instance") !== this.onion.pikmin.id) {
            this.progression = "";
        }
        localStorage.setItem("idle_pikmin_instance", this.onion.pikmin.id);
        this.setTimeProgressBar(onion.pikmin.growTime);
        this.init();
    }

    resetIdle() {
        this.onion = null;
        this.isHarvestable = false;
        this.timeoutId = 0;
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

    repaint() {
        if (this.isHarvestable) {
            this.btn?.removeAttribute("disabled");
        } else {
            this.btn?.setAttribute("disabled", "");
        }
    }
}