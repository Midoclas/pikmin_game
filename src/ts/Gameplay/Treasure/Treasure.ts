import { objectHTMLElement, objectLocalStorage, objectTreasure } from "../../Default";
import { TreasureType } from "../../Typage";
import GameplayInterface from "../GameplayInterface";
import TreasureActionInterface from "./TreasureActionInterface";
import TreasureGetting from "./TreasureGetting";
import TreasureHunting from "./TreasureHunting";

export default class Treasure implements GameplayInterface {

    gameplayContainer: HTMLElement | null;
    treasure: TreasureType|null = null;
    action: null|TreasureActionInterface;

    constructor() {        
        this.action = null;
        this.gameplayContainer = document.querySelector(objectHTMLElement.gameplay_container);
        this.init();
    }

    async init() {
        this.initStorage();

        await this.render();

        this.initAction();
        this.renderAction();

        this.initEventListener();
    }

    initStorage() {
        let treasureStoredValue = localStorage.getItem("treasure");

        if (treasureStoredValue !== null) {
            let treasure = Object.values(objectTreasure).filter(treasure => treasure.name === treasureStoredValue)[0];
            this.setTreasure(treasure);
        }

    }

    initAction() {
        if (this.treasure !== null) {
            this.action = new TreasureGetting(this.treasure);
        } else {
            this.action = new TreasureHunting();
        }
    }

    async renderAction() {
        if (this.action) {
            await this.action.render();
        }
    }

    async destructor() {
        if (this.treasure !== null) {
            localStorage.setItem("instance_treasure", this.treasure.name);
        } else {
            localStorage.removeItem("instance_treasure");
        }
        this.action?.destructor();
    }

    initEventListener(): void {
        document.addEventListener("treasureFound", () => {
            if (this.action instanceof TreasureHunting && this.action.isFinished()) {
                this.action.destructor();
                this.action = new TreasureGetting(this.action.getTreasure());
                this.renderAction();
            }
        })
        document.addEventListener("expeditionFinish", () => {
            if (this.action instanceof TreasureGetting && this.action.isFinished()) {
                this.action.destructor();
                this.action = new TreasureHunting();
                this.renderAction();
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
            
            if (parseHtml.body) {
                this.gameplayContainer.append(...Array.from(parseHtml.body.children));
            }       
        } catch (error: any) {
            console.log(error.message)
        }
    }

    repaint(): void {
    }

    setTreasure(treasure: TreasureType|null) {
        this.treasure = treasure;
    }

    getTreasure(): TreasureType|null {
        return this.treasure;
    }
}