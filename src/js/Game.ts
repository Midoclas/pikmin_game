import Context from "./Context.js";
import { moneyRefresh } from "./GlobalEvent.js";

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

    repaint() {
        this.moneyElement.forEach((e) => {
            e.innerHTML = this.context.getMoney().toString();
        }) 
    }
}