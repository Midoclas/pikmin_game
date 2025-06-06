import { objectHTMLElement, objectRarityRate, objectTreasure } from "../../Default.js";
import ProgressBar from "../../ElementsType/ProgressBar.js";
import VerticalTouchspin from "../../ElementsType/VerticalTouchspin.js";
import { ObjectTreasureType, TreasureType } from "../../Typage.js";
import TreasureActionInterface from "./TreasureActionInterface.js";

export default class TreasureHunting implements TreasureActionInterface {
    query = "#treasure";
    finish = false;
    searchingTreasure: TreasureType|null = null;
    progressBar: ProgressBar;
    verticalTouchspin: VerticalTouchspin;
    searchTreasureBtn: HTMLElement|null = null;
    container = document.querySelector(objectHTMLElement.treasure_container);

    constructor() {
        this.verticalTouchspin = new VerticalTouchspin("#tmp");
        this.progressBar = new ProgressBar("#treasure_hunting_progress_bar", false);
        
        this.initStorage();
    }

    save(id: string, value: string) {
        localStorage.setItem(id, value);
    }

    async initVerticalTouchspin() {
        this.verticalTouchspin.initElementType();
        await this.verticalTouchspin.render();
        this.verticalTouchspin.initEventListener();
    }

    async initProgressBar() {
        this.progressBar.initElementType();

        this.progressBar.objectElement?.addEventListener("animationend", () => {
            this.searchTreasureBtn?.removeAttribute("disabled");
            this.finish = true;
        })

        this.progressBar.initEventListener();
    }

    initElementType() {
        this.container = document.querySelector(this.query);
    }

    initEventListener() {
        this.searchTreasureBtn?.addEventListener("click", () => {
            this.searchTreasureBtn?.setAttribute("disabled", "true");
            this.search()
        })
    }

    initStorage() {
        let searchingTreasureStoredValue = localStorage.getItem("searching_treasure");

        if (searchingTreasureStoredValue !== null) {
            let treasure = Object.values(objectTreasure).filter(treasure => treasure.name === searchingTreasureStoredValue)[0];
            this.setTreasure(treasure);
        }
    }

    setTreasure(treasure: TreasureType) {
        this.searchingTreasure = treasure;
        this.save("searching_treasure", treasure.name);
    }

    getTreasure(): TreasureType|null {
        return this.searchingTreasure;
    }

    isFinish() {
        return false; // TMP
    }

    search() {
        if (this.searchingTreasure === null) {
            let treasure = this.getRandomTreasure();
            this.setTreasure(treasure);
        }
        if (this.searchingTreasure) {
            this.progressBar.setTimeProgressBar(this.searchingTreasure.search_time);
            this.progressBar.resetProgressBar();
        }
    }

    getRandomTreasure() {
        let random = Math.random() * (100-0);
        console.log(random);
        let rarity = 1;
        Object.keys(objectRarityRate).map((key) => {
            console.log(key, random, objectRarityRate[(key as any)]);
            if (random > objectRarityRate[(key as any)]) {
                rarity =  parseInt(key)+1;
                console.log(rarity);
            }
        });
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
            this.searchTreasureBtn = document.querySelector(objectHTMLElement.treasure_search_btn);
            this.initEventListener();
        } catch (error) {
            console.log()
        }
    }
}