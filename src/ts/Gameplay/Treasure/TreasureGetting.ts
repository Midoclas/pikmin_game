import { objectHTMLElement } from "../../Default";
import ProgressBar from "../../ElementsType/ProgressBar";
import VerticalTouchspin from "../../ElementsType/VerticalTouchspin";
import PikminMap from "../../Pikmin/PikminMap";
import { TreasureType } from "../../Typage";
import TreasureActionInterface from "./TreasureActionInterface";
import Toast from "../../Utils/Toast";
import { expeditionFinish } from "../../GlobalEvent";

export default class TreasureGetting implements TreasureActionInterface {

    treasure: TreasureType|null = null;
    progressBar: ProgressBar;
    verticalTouchspin: VerticalTouchspin;
    container: HTMLElement|null = document.querySelector(objectHTMLElement.treasure_container);
    containerData: HTMLElement|null = document.querySelector(objectHTMLElement.treasure_data_container);
    startExpeditionBtn: HTMLElement|null = null;
    finish = false;

    constructor(treasure: TreasureType|null) {
        this.validateTreasure(treasure);
        this.treasure = treasure;

        this.verticalTouchspin = new VerticalTouchspin(objectHTMLElement.treasure_getting_vertical_touchspin);
        this.progressBar = new ProgressBar(objectHTMLElement.treasure_getting_progress_bar, false);        
    }

    initElementAfterRendering(): void {
        this.startExpeditionBtn = document.querySelector(objectHTMLElement.treasure_start_expedition_btn);
        this.initVerticalTouchspin();
    }

    initEventListener() {
        this.startExpeditionBtn?.addEventListener("click", () => {
            let isValid = this.validator();
            if (typeof isValid == "string") {
                new Toast("danger", isValid);
                return;
            }
            this.start();
        })
    }

    validator(): boolean|string{
        let data = this.verticalTouchspin.getData();
        let strength = 0;

        if (!this.treasure) {
            throw new Error(`TreasureGetting Validator is call with an empty treasure object`);
        }

        if (data) {
            let pikminMap = new PikminMap();
            for (const key in pikminMap.mapping) {
                if (pikminMap.mapping.hasOwnProperty(key)) {
                    let pikmin = pikminMap.mapping[key];
                    let dataValue = data.get(pikmin.id);
                    if (typeof dataValue === 'string') {
                        let intDataValue = parseInt(dataValue);

                        if (intDataValue < 0)  {
                            return "negative values are not allowed: " + pikmin.id;
                        }

                        if (intDataValue > pikmin.nbPikmin)  {
                            return "You don't have enough Pikmin:" + pikmin.id;
                        }

                        strength += (pikmin.getAttack() * intDataValue);
                    }
                }
            }

            if (strength < this.treasure.weight) {
                return "You don't have the strength to start expedition.";
            }
        }
        
        return true
    }

    async initVerticalTouchspin() {
        this.verticalTouchspin.initElementType();
        await this.verticalTouchspin.render();
        this.verticalTouchspin.initEventListener();
        this.validator();
    }

    async initProgressBar() {
        this.progressBar.initElementType();

        this.progressBar.objectElement?.addEventListener("animationend", () => {
            if (this.treasure !== null) {
                this.finish = true;
                document.dispatchEvent(expeditionFinish);
            } else {
                throw new Error(`No treasure found when progress bars end`);
            }
        })

        this.progressBar.initEventListener();
    }

    start() {
        if (this.treasure) {
            this.progressBar.setTimeProgressBar(this.treasure.search_time);
            this.progressBar.resetProgressBar();
        }
    }

    getTreasure(): TreasureType|null {
        return this.treasure;
    }

    setTreasure(treasure: TreasureType|null) {
        this.treasure = treasure;
    }

    isFinished() {
        return this.finish;
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
        localStorage.removeItem("treasure");
        this.progressBar.restoreInitialState();
    }

    async render() {
        try {
            if (!this.container || !this.containerData) {
                throw new Error(`Response status: element does not exist`);
            }
            this.container.innerHTML = "";
            this.containerData.innerHTML = "";

            var domParser = new DOMParser();
            
            const treasureGettingHtml = await fetch("./src/views/gameplay/treasure/treasure_getting.html");
            const treasureGettingDataHtml = await fetch("./src/views/gameplay/treasure/treasure_getting_data.html")
            
            if (!treasureGettingHtml.ok) {
                throw new Error(`Response status: ${treasureGettingHtml.status}`);
            }

            if (!treasureGettingDataHtml.ok) {
                throw new Error(`Response status: ${treasureGettingDataHtml.status}`);
            }

            var html = await treasureGettingHtml.text();
            var htmlData = await treasureGettingDataHtml.text();

            const parseHtml = domParser.parseFromString(html, "text/html");
            const parseHtmlData = domParser.parseFromString(htmlData, "text/html");
            
            if (parseHtml.body) {
                this.container.append(...Array.from(parseHtml.body.children));
            }
            if (parseHtmlData.body) {
                this.containerData.append(...Array.from(parseHtmlData.body.children));
                this.renderTreasureInformation();
            }
            this.initElementAfterRendering();
            this.initEventListener();
            this.initProgressBar();
        } catch (error: any) {
            console.log(error.message);
        }
    }

    renderTreasureInformation(): void {
        let treasure = this.getTreasure();
        if (treasure === null || treasure === undefined) {
            return;
        }

        let name = this.containerData?.querySelector(objectHTMLElement.treasure_information_name);
        let get_time = this.containerData?.querySelector(objectHTMLElement.treasure_information_get_time);
        let rarity = this.containerData?.querySelector(objectHTMLElement.treasure_information_rarity);
        let reward = this.containerData?.querySelector(objectHTMLElement.treasure_information_reward);
        let weight = this.containerData?.querySelector(objectHTMLElement.treasure_information_weight);
        

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