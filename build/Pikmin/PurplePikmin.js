import Pikmin from "./Pikmin.js";
import WhitePikmin from "./WhitePikmin.js";
export default class PurplePikmin extends Pikmin {
    constructor() {
        super("PurplePikmin");
        this.nextUnlock = new WhitePikmin();
    }
}
