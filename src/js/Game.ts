import Context from "./Context.js";
import GameplayInterface from "./Gameplay/GameplayInterface.js";
import Idle from "./Gameplay/Idle.js";

export default class Game {

    static #instance: Game;
    moneyElement = document.querySelectorAll(".money");
    gameplay: null|GameplayInterface;

    context = Context.instance;

    constructor(gameplay: GameplayInterface) {
        this.init();
        this.gameplay = null;
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