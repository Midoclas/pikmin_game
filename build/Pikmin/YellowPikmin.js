import Pikmin from "./Pikmin.js";
import BluePikmin from "./BluePikmin.js";
export default class YellowPikmin extends Pikmin {
    constructor() {
        super("pikmin_yellow");
        this.nextUnlock = new BluePikmin();
    }
}
