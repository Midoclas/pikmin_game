import { objectHTMLElement } from "../../Default.js";
import { TreasureType } from "../../Typage.js";
import TreasureActionInterface from "./TreasureActionInterface.js";

export default class TreasureGetting implements TreasureActionInterface {

    treasure: TreasureType|null = null;
    container = document.querySelector(objectHTMLElement.treasure_container);

    constructor(treasure: TreasureType|null) {
        this.validateTreasure(treasure);
        this.treasure = treasure;

        this.render();
    }

    initElementType(): void {
        
    }

    getTreasure(): TreasureType|null {
        return this.treasure;
    }

    setTreasure(treasure: TreasureType|null) {
        this.treasure = treasure;
    }

    isFinish() {
        return true; // TMP
    }

    validateTreasure(treasure: TreasureType|null) {
        if (treasure === null) {
            throw new Error(`TreasureGetting is call with a treasure set to null`);
        }

        for (const prop in treasure) {
            if (!Object.hasOwn(treasure, prop)) {
                throw new Error(`TreasureGetting is call with an empty treasure object`);
            }
        }
    }

    async destructor(): Promise<void> {
        
    }

    async render() {
        try {
            if (!this.container) {
                throw new Error(`Response status: element does not exist`);
            }
            this.container.innerHTML = "";

            var domParser = new DOMParser();
            
            const idleGameplayHtml = await fetch("./src/views/gameplay/treasure/treasure_getting.html");
            if (!idleGameplayHtml.ok) {
                throw new Error(`Response status: ${idleGameplayHtml.status}`);
            }

            var html = await idleGameplayHtml.text();

            const parseHtml = domParser.parseFromString(html, "text/html");
            
            if (parseHtml.body.firstChild) {
                this.container.appendChild(parseHtml.body.firstChild);
            }       
        } catch (error) {
            console.log()
        }
    }
}