import Pikmin from "./Pikmin.js";
import BluePikmin from "./BluePikmin.js";
export default class YellowPikmin extends Pikmin {
    constructor() {
        super("YellowPikmin");
        this.nextUnlock = new BluePikmin();
    }
}
