import { objectHTMLElement, objectLocalStorage } from "../../Default.js";
import VerticalTouchspin from "../../ElementsType/VerticalTouchspin.js";
import GameplayInterface from "../GameplayInterface.js";
import TreasureAction from "./TreasureAction.js";
import TreasureGetting from "./TreasureGetting.js";
import TreasureHunting from "./TreasureHunting.js";

export default class Treasure extends VerticalTouchspin implements GameplayInterface {

    gameplayContainer: HTMLElement | null;
    treasure = "";
    treasureFound = "";
    action: null|TreasureAction;

    constructor() {
        let query = "idleProgressBar";
        super(query);
        
        this.action = null;
        this.gameplayContainer = document.querySelector(objectHTMLElement.gameplay_container);
        this.init();
    }    

    async init() {
        this.initStorage();
        this.initAction();


        await this.render();
        this.initElementType();
        this.initEventListener();
    }

    initStorage() {
        let instanceTreasureStoredValue = localStorage.getItem("instance_treasure");
        let treasureFoundStoredValue = localStorage.getItem("treasure_found");

        if (instanceTreasureStoredValue !== null) {
            this.setTreasure(instanceTreasureStoredValue);
        }
        if (treasureFoundStoredValue !== null) {
            this.setTreasureFound(treasureFoundStoredValue);
        }
    }

    initAction() {
        if (this.treasure.length > 0) {
            this.action = new TreasureGetting(this.treasure);
        } else {
            this.action = new TreasureHunting();
        }
    }

    async destructor() {
        if (this.setTreasure.length > 0) {
            localStorage.setItem("instance_treasure", this.treasure);
        } else {
            localStorage.removeItem("instance_treasure");
        }
    }

    initEventListener(): void {
    }

    async render() {
        try {
            if (!this.gameplayContainer) {
                throw new Error(`Response status: element does not exist`);
            }
            this.gameplayContainer.innerHTML = "";

            var domParser = new DOMParser();
            
            const idleGameplayHtml = await fetch("./src/views/gameplay/treasure.html");
            if (!idleGameplayHtml.ok) {
                throw new Error(`Response status: ${idleGameplayHtml.status}`);
            }

            var html = await idleGameplayHtml.text();

            const parseHtml = domParser.parseFromString(html, "text/html");
            
            if (parseHtml.body.firstChild) {
                this.gameplayContainer.appendChild(parseHtml.body.firstChild);
                // if (this.gameplayContainer !== null) {
                //     this.btn = this.gameplayContainer.querySelector(objectHTMLElement.idle_harvest_btn);
                // }
            }       
        } catch (error) {
            console.log()
        }
        super.render();
    }

    repaint(): void {
    }

    setTreasure(treasure: string) {
        this.treasure = treasure;
    }

    setTreasureFound(treasure: string) {
        this.treasureFound = treasure;
    }
}