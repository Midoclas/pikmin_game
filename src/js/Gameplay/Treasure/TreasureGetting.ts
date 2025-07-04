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

    isFinished() {
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
            
            if (parseHtml.body) {
                this.container.append(...Array.from(parseHtml.body.children))
            }       
        } catch (error: any) {
            console.log(error.message)
        }
    }

    renderTreasureInformation(): void {
        let treasure = this.getTreasure();
        if (treasure === null || treasure === undefined) {
            return;
        }

        let name = this.container?.querySelector(objectHTMLElement.treasure_information_name);
        let get_time = this.container?.querySelector(objectHTMLElement.treasure_information_get_time);
        let rarity = this.container?.querySelector(objectHTMLElement.treasure_information_rarity);
        let reward = this.container?.querySelector(objectHTMLElement.treasure_information_reward);
        let weight = this.container?.querySelector(objectHTMLElement.treasure_information_weight);
        

        if (name) {
            name.innerHTML = treasure.name;
        }
        if (get_time) {
            get_time.innerHTML = treasure.get_time.toString();
        }
        if (rarity) {
            rarity.innerHTML = treasure.rarity.toString();
        }
        if (reward) {
            reward.innerHTML = treasure.reward.toString();
        }
        if (weight) {
            weight.innerHTML = treasure.weight.toString();
        }
        
    }
}