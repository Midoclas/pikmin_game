import Pikmin from "./Pikmin.js";
import { defaultPikminYellowGrowTime } from "../Default.js";
export default class YellowPikmin extends Pikmin {
    constructor() {
        super("pikmin_yellow");
        this.initStorage();
    }
    initStorage() {
        var storedValue = localStorage.getItem(this.id + "_grow_time");
        if (storedValue !== null) {
            this.growTime = parseInt(storedValue);
        }
        else {
            this.setGrowTime(defaultPikminYellowGrowTime);
        }
    }
    setGrowTime(value) {
        this.growTime = value;
        this.save(this.id + "_grow_time", value.toString());
    }
}
