import Context from "./Context.js";
export default class Game {
    constructor() {
        this.moneyElement = document.querySelectorAll(".money");
        this.context = Context.instance;
        this.init();
    }
    init() {
        this.repaint();
        this.initEventListener();
    }
    initEventListener() {
        document.addEventListener("moneyRefresh", () => {
            this.repaint();
        });
    }
    repaint() {
        this.moneyElement.forEach((e) => {
            e.innerHTML = this.context.getMoney().toString();
        });
    }
}
