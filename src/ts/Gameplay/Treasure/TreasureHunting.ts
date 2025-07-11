import { objectHTMLElement, objectRarityRate, objectTreasure } from "../../Default";
import ProgressBar from "../../ElementsType/ProgressBar";
import VerticalTouchspin from "../../ElementsType/VerticalTouchspin";
import { TreasureType } from "../../Typage";
import TreasureActionInterface from "./TreasureActionInterface";
import { treasureFound } from "../../GlobalEvent";

export default class TreasureHunting implements TreasureActionInterface {
    query = "#treasure";
    finish = false;
    searchingTreasure: TreasureType|null = null;
    progressBar: ProgressBar;
    startExpeditionBtn: HTMLElement|null = null;
    searchTreasureBtn: HTMLElement|null = null;
    container: HTMLElement|null = document.querySelector(objectHTMLElement.treasure_container);
    containerData: HTMLElement|null = document.querySelector(objectHTMLElement.treasure_data_container);

    constructor() {
        this.progressBar = new ProgressBar(objectHTMLElement.treasure_hunting_progress_bar, false);
        this.initStorage();
    }

    save(id: string, value: string) {
        localStorage.setItem(id, value);
    }

    async initProgressBar() {
        this.progressBar.initElementType();

        this.progressBar.objectElement?.addEventListener("animationend", () => {
            if (this.searchingTreasure !== null) {
                this.save("treasure", this.searchingTreasure.name)
                this.finish = true;
                document.dispatchEvent(treasureFound);
            } else {
                throw new Error(`No treasure found when progress bars end`);
            }
        })

        this.progressBar.initEventListener();
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

    isFinished() {
        return this.finish;
    }

    getRandomTreasure() {
        let random = Math.random() * (100-0);
        let rarity = 1;
        Object.keys(objectRarityRate).map((key) => {
            if (random > objectRarityRate[(key as any)]) {
                rarity =  parseInt(key)+1;
            }
        });
        let treasureList = Object.values(objectTreasure).filter(treasure => treasure.rarity === rarity);
        return treasureList[Math.floor(Math.random() * treasureList.length)];
    }

    async destructor(): Promise<void> {
        this.progressBar.restoreInitialState();
        localStorage.removeItem("searching_treasure");
    }

    async render() {
        try {
            if (!this.container || !this.containerData) {
                throw new Error(`Response status: element does not exist`);
            }
            this.container.innerHTML = "";
            this.containerData.innerHTML = "";

            var domParser = new DOMParser();
            
            const idleGameplayHtml = await fetch("./src/views/gameplay/treasure/treasure_hunting.html");
            if (!idleGameplayHtml.ok) {
                throw new Error(`Response status: ${idleGameplayHtml.status}`);
            }

            var html = await idleGameplayHtml.text();

            const parseHtml = domParser.parseFromString(html, "text/html");
            
            if (parseHtml.body) {
                this.container.append(...Array.from(parseHtml.body.children))
            }
            
            this.initProgressBar();
            if (this.searchingTreasure !== null) {
                this.search()
            }
            this.searchTreasureBtn = document.querySelector(objectHTMLElement.treasure_search_btn);
            this.startExpeditionBtn = document.querySelector(objectHTMLElement.treasure_start_expedition_btn);

            this.initEventListener();
        } catch (error: any) {
            console.log(error.message)
        }
    }
}