import Pikmin from "./Pikmin.js";
import { defaultPikminWhiteGrowTime } from "../Default.js";
export default class WhitePikmin extends Pikmin {
    constructor() {
        super("pikmin_white");
        this.initStorage();
    }
    initStorage() {
        var storedValue = localStorage.getItem(this.id + "_grow_time");
        if (storedValue !== null) {
            this.growTime = parseInt(storedValue);
        }
        else {
            this.setGrowTime(defaultPikminWhiteGrowTime);
        }
    }
    setGrowTime(value) {
        this.growTime = value;
        this.save(this.id + "_grow_time", value.toString());
    }
}
