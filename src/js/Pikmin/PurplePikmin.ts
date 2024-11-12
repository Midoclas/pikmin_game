import Pikmin from "./Pikmin.js";
import { defaultPikminPurpleGrowTime } from "../Default.js";

export default class PurplePikmin extends Pikmin {
    constructor() {
        super("pikmin_purple");
        this.initStorage();
    }

    initStorage(): void {
        var storedValue = localStorage.getItem(this.id+"_grow_time");
        if (storedValue !== null) {
            this.growTime = parseInt(storedValue);
        } else {
            this.setGrowTime(defaultPikminPurpleGrowTime);
        }
    }

    setGrowTime(value: number): void {
        this.growTime = value;
        this.save(this.id+"_grow_time", value.toString());
    }
}