import YellowPikmin from "./YellowPikmin.js";
import Pikmin from "./Pikmin.js";
export default class RedPikmin extends Pikmin {
    constructor() {
        super("pikmin_red");
        this.nextUnlock = new YellowPikmin();
    }
}
