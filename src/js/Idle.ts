import { defaultTimeProgressBar } from "./Default.js";
import ProgressBar from "./ElementsType/ProgressBar/ProgressBar.js"
import Onion from "./Onion.js";

export default class Idle extends ProgressBar {

    static #instance : Idle;
    onion: Onion|null;
    timeoutId = 0;
    isHarvestable = false;
    btn = document.getElementById("harvest");

    constructor(onion: Onion|null) {
        let query = "idleProgressBar";
        super(query, defaultTimeProgressBar);
        
        this.onion = onion;
        if (this.onion !== null) {
            this.initEventListener();
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
        this.btn?.addEventListener("click", () => {
            this.harvest();
        })
    }

    init() {
        this.plant();
    }

    setOnion(onion: Onion) {
        this.onion = onion;
        this.initEventListener();
        this.init();
    }

    resetIdle() {
        this.onion = null;
        this.isHarvestable = false;
        this.timeoutId = 0;
        this.repaint();
    }

    plant() {
        console.log("Je plant");
        this.isHarvestable = false;
        this.resetProgressBar();
        this.repaint()
        this.timeoutId = setTimeout(() => {
            this.isHarvestable = true;
            this.repaint();
        }, this.timeProgressBar*1000);    
    }

    harvest() {
        if (this.isHarvestable && this.onion !== null) {
            this.onion.pikmin.add(1);
            this.plant();
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