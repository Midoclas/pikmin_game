import YellowPikmin from "./YellowPikmin.js";
import Pikmin from "./Pikmin.js";
export default class RedPikmin extends Pikmin {
    constructor() {
        super("RedPikmin");
        this.nextUnlock = new YellowPikmin();
    }
}
