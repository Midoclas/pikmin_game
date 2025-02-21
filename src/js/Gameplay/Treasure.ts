import { objectLocalStorage } from "../Default.js";
import ProgressBar from "../ElementsType/ProgressBar.js"
import VerticalTouchspin from "../ElementsType/VerticalTouchspin.js";
import Onion from "../Onion/Onion.js";
import GameplayInterface from "./GameplayInterface.js";

export default class Treasure extends VerticalTouchspin implements GameplayInterface {


    constructor() {
        let query = "idleProgressBar";
        super(query);
        this.init();
    }

    initEventListener() {
    }

    init() {
    }

    repaint() {
    }
}