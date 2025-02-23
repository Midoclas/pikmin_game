import Context from "./Context.js";
import { objectHTMLElement } from "./Default.js";
import GameplayInterface from "./Gameplay/GameplayInterface.js";
import Idle from "./Gameplay/Idle.js";

export default class Game {

    static #instance: Game;
    moneyElement = document.querySelectorAll(objectHTMLElement.global_gold_view);
    gameplay: null|GameplayInterface;

    context = Context.instance;

    constructor(gameplay: GameplayInterface) {
        this.init();
        this.gameplay = gameplay;
    }

    public static get instance(): Game {
        if (!Game.#instance) {
            Game.#instance = new Game(new Idle);
        }

        return Game.#instance;
    }

    init() {
        this.repaint();
        this.initEventListener();
    }

    initEventListener() {
        document.addEventListener("moneyRefresh", () => {
            this.repaint();
        })

        window.addEventListener("beforeunload", () => {
            if (localStorage.getItem("is_game_exist") !== null) {
                this.gameplay?.destructor();
            }
        })
    }

    async destroyGameplay() {
        this.gameplay?.destructor();
    }

    async startGameplay(gameplay: GameplayInterface) {
        this.gameplay = gameplay;
    }

    repaint() {
        this.moneyElement.forEach((e) => {
            e.innerHTML = this.context.getMoney().toString();
        }) 
    }
}