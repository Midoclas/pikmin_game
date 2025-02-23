import { objectLocalStorage } from "../Default.js";
import VerticalTouchspin from "../ElementsType/VerticalTouchspin.js";
import Onion from "../Onion/Onion.js";
import GameplayInterface from "./GameplayInterface.js";

export default class Treasure extends VerticalTouchspin implements GameplayInterface {

    gameplayContainer: HTMLElement | null;

    constructor() {
        let query = "idleProgressBar";
        super(query);

        this.gameplayContainer = document.getElementById("gameplay_content");
        this.init();
    }    

    async init() {
        await this.render();
        this.initEventListener();
    }

    async destructor() {
        
    }

    initEventListener(): void {
    }

    async render() {
        try {
            if (!this.gameplayContainer) {
                throw new Error(`Response status: element does not exist`);
            }
            this.gameplayContainer.innerHTML = "";
        } catch (error) {
            console.log()
        }
        super.render();
    }

    repaint(): void {
    }
}