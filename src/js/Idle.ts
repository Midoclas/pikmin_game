import { defaultTimeProgressBar } from "./Default.js";
import ProgressBar from "./ElementsType/ProgressBar/ProgressBar.js"
import Pikmin from "./Pikmin.js";

export default class Idle extends ProgressBar {

    pikmin: Pikmin;
    timeoutId = 0;
    isHarvestable = false;
    btn = document.getElementById("harvest");

    constructor(pikmin: Pikmin) {
        let query = "idleProgressBar";
        super(query, defaultTimeProgressBar);
        
        this.pikmin = pikmin;
        this.initEventListener();
        this.init();
    }

    initEventListener() {
        this.btn?.addEventListener("click", () => {
            this.harvest();
        })
    }

    init() {
        this.plant();
    }

    plant() {
        this.isHarvestable = false;
        this.resetProgressBar();
        this.repaint()
        this.timeoutId = setTimeout(() => {
            this.isHarvestable = true;
            this.repaint();
        }, this.timeProgressBar*1000);    
    }

    harvest() {
        if (this.isHarvestable) {
            this.pikmin.add(1);
            this.plant();
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