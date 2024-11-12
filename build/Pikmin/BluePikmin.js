import Pikmin from "./Pikmin.js";
import { defaultPikminBlueGrowTime } from "../Default.js";
export default class BluePikmin extends Pikmin {
    constructor() {
        super("pikmin_blue");
        this.initStorage();
    }
    initStorage() {
        var storedValue = localStorage.getItem(this.id + "_grow_time");
        if (storedValue !== null) {
            this.growTime = parseInt(storedValue);
        }
        else {
            this.setGrowTime(defaultPikminBlueGrowTime);
        }
    }
    setGrowTime(value) {
        this.growTime = value;
        this.save(this.id + "_grow_time", value.toString());
    }
}
