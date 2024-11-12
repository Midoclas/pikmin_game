import Pikmin from "./Pikmin.js";
import { defaultPikminRedGrowTime } from "../Default.js";
export default class RedPikmin extends Pikmin {
    constructor() {
        super("pikmin_red");
        this.initStorage();
    }
    initStorage() {
        var storedValue = localStorage.getItem(this.id + "_grow_time");
        if (storedValue !== null) {
            this.growTime = parseInt(storedValue);
        }
        else {
            this.setGrowTime(defaultPikminRedGrowTime);
        }
    }
    setGrowTime(value) {
        this.growTime = value;
        this.save(this.id + "_grow_time", value.toString());
    }
}
