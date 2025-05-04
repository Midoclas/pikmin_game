import { objectHTMLElement } from "../../Default.js";
import TreasureActionInterface from "./TreasureActionInterface.js";

export default class TreasureGetting implements TreasureActionInterface {

    id_treasure: string;
    container = document.querySelector(objectHTMLElement.treasure_container);

    constructor(id_treasure: string) {
        this.validateTreasure(id_treasure);
        this.id_treasure = id_treasure;

        this.render();
    }

    initElementType(): void {
        
    }

    getTreasure() {
        return this.id_treasure;
    }

    setTreasure(id_treasure: string) {
        this.id_treasure = id_treasure;
    }

    isFinish() {
        return true; // TMP
    }

    validateTreasure(id_treasure: string) {
        if (id_treasure.length === 0) {
            throw new Error(`TreasureGetting is call with an empty treasure id`);
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