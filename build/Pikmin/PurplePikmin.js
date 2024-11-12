import Pikmin from "./Pikmin.js";
import { defaultPikminPurpleGrowTime } from "../Default.js";
export default class PurplePikmin extends Pikmin {
    constructor() {
        super("pikmin_purple");
        this.initStorage();
    }
    initStorage() {
        var storedValue = localStorage.getItem(this.id + "_grow_time");
        if (storedValue !== null) {
            this.growTime = parseInt(storedValue);
        }
        else {
            this.setGrowTime(defaultPikminPurpleGrowTime);
        }
    }
    setGrowTime(value) {
        this.growTime = value;
        this.save(this.id + "_grow_time", value.toString());
    }
}
