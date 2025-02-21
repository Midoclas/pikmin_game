import Context from "./Context.js";
import GameplayInterface from "./Gameplay/GameplayInterface.js";

export default class Game {

    moneyElement = document.querySelectorAll(".money");

    context = Context.instance;

    constructor() {
        this.init();
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

    changeGameplay(gameplay: GameplayInterface) {
        console.log(gameplay);
    }

    repaint() {
        this.moneyElement.forEach((e) => {
            e.innerHTML = this.context.getMoney().toString();
        }) 
    }
}