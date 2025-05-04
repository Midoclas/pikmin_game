import { objectHTMLElement, objectRarityRate, objectTreasure } from "../../Default.js";
import ProgressBar from "../../ElementsType/ProgressBar.js";
import VerticalTouchspin from "../../ElementsType/VerticalTouchspin.js";
import TreasureActionInterface from "./TreasureActionInterface.js";

export default class TreasureHunting implements TreasureActionInterface {
    query = "#treasure";
    searchingTreasure = "";
    progressBar: ProgressBar;
    verticalTouchspin: VerticalTouchspin;
    container = document.querySelector(objectHTMLElement.treasure_container);

    constructor() {
        this.verticalTouchspin = new VerticalTouchspin("#tmp");
        this.progressBar = new ProgressBar("#test", false);
        
        this.initStorage();
    }

    async initVerticalTouchspin() {
        this.verticalTouchspin.initElementType();
        await this.verticalTouchspin.render();
        this.verticalTouchspin.initEventListener();
    }

    async initProgressBar() {
        this.progressBar.initElementType();
        this.progressBar.resetProgressBar();

        this.progressBar.objectElement?.addEventListener("animationend", () => {
            this.getRandomTreasure();
        })

        this.progressBar.initEventListener();
    }

    initElementType() {
        this.container = document.querySelector(this.query);
    }

    initStorage() {
        let searchingTreasureStoredValue = localStorage.getItem("searching_treasure");

        if (searchingTreasureStoredValue !== null) {
            this.setTreasure(searchingTreasureStoredValue);
        }
    }

    setTreasure(treasure: string) {
        this.searchingTreasure = treasure;
    }

    getTreasure(): string {
        return this.searchingTreasure;
    }

    isFinish() {
        return false; // TMP
    }

    getRandomTreasure() {
        let random = Math.random() * (100-0);
        console.log(random);
        let rarity = 1;
        Object.keys(objectRarityRate).map((key) => {
            console.log(key, random, objectRarityRate[(key as any)]);
            if (random > objectRarityRate[(key as any)]) {
                rarity =  parseInt(key);
            }
        })
        let treasureList = Object.values(objectTreasure).filter(treasure => treasure.rarity === rarity);

        return treasureList[Math.floor(Math.random() * treasureList.length)];
    }

    async destructor(): Promise<void> {
        await this.progressBar.destructor();
    }

    async render() {
        try {
            if (!this.container) {
                throw new Error(`Response status: element does not exist`);
            }
            this.container.innerHTML = "";

            var domParser = new DOMParser();
            
            const idleGameplayHtml = await fetch("./src/views/gameplay/treasure/treasure_hunting.html");
            if (!idleGameplayHtml.ok) {
                throw new Error(`Response status: ${idleGameplayHtml.status}`);
            }

            var html = await idleGameplayHtml.text();

            const parseHtml = domParser.parseFromString(html, "text/html");
            
            if (parseHtml.body.firstChild) {
                this.container.appendChild(parseHtml.body.firstChild);
            }
            
            if (this.isFinish()) {
                this.initVerticalTouchspin();
            } else {
                this.initProgressBar();
            }
        } catch (error) {
            console.log()
        }
    }
}