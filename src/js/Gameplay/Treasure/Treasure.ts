import { objectHTMLElement, objectLocalStorage } from "../../Default.js";
import GameplayInterface from "../GameplayInterface.js";
import TreasureActionInterface from "./TreasureActionInterface.js";
import TreasureGetting from "./TreasureGetting.js";
import TreasureHunting from "./TreasureHunting.js";

export default class Treasure implements GameplayInterface {

    gameplayContainer: HTMLElement | null;
    treasure = "";
    treasureFound = "";
    action: null|TreasureActionInterface;

    constructor() {
        let query = objectHTMLElement.treasure_container;
        
        this.action = null;
        this.gameplayContainer = document.querySelector(objectHTMLElement.gameplay_container);
        this.init();
    }

    async init() {
        this.initStorage();

        await this.render();

        this.initAction();
        if (this.action) {
            this.action.render();
            this.action.initElementType();
        }

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
        if (this.treasure.length > 0) {
            localStorage.setItem("instance_treasure", this.treasure);
        } else {
            localStorage.removeItem("instance_treasure");
        }
        this.action?.destructor();
    }

    initEventListener(): void {
        document.querySelector('#start_treasure_expedition')?.addEventListener("click", () => {
            if (this.action instanceof TreasureHunting && this.action.isFinish()) {
                this.action = new TreasureGetting(this.action.getTreasure());
            }
        })
    }

    async render() {
        try {
            if (!this.gameplayContainer) {
                throw new Error(`Response status: element does not exist`);
            }
            this.gameplayContainer.innerHTML = "";

            var domParser = new DOMParser();
            
            const idleGameplayHtml = await fetch("./src/views/gameplay/treasure/treasure.html");
            if (!idleGameplayHtml.ok) {
                throw new Error(`Response status: ${idleGameplayHtml.status}`);
            }

            var html = await idleGameplayHtml.text();

            const parseHtml = domParser.parseFromString(html, "text/html");
            
            if (parseHtml.body.firstChild) {
                this.gameplayContainer.appendChild(parseHtml.body.firstChild);
            }       
        } catch (error: any) {
            console.log(error.message)
        }
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