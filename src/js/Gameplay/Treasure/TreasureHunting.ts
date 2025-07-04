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
    startExpeditionBtn: HTMLElement|null = null;
    searchTreasureBtn: HTMLElement|null = null;
    container = document.querySelector(objectHTMLElement.treasure_container);

    constructor() {
        this.verticalTouchspin = new VerticalTouchspin("#treasure_hunting_vertical_touchspin");
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
            this.searchTreasureBtn?.classList.add("d-none");
            this.startExpeditionBtn?.classList.remove("d-none");
            this.finish = true;
            this.renderTreasureInformation();
            this.initVerticalTouchspin();
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

    renderTreasureInformation(): void {
        let treasure = this.getTreasure();
        if (treasure === null || treasure === undefined) {
            return;
        }

        document.querySelector(objectHTMLElement.treasure_information)?.classList.remove('d-none');
        let name = document.querySelector(objectHTMLElement.treasure_information_name);
        let get_time = document.querySelector(objectHTMLElement.treasure_information_get_time);
        let rarity = document.querySelector(objectHTMLElement.treasure_information_rarity);
        let reward = document.querySelector(objectHTMLElement.treasure_information_reward);
        let weight = document.querySelector(objectHTMLElement.treasure_information_weight);
        

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