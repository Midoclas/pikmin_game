import Pikmin from "./Pikmin.js";
import PurplePikmin from "./PurplePikmin.js";
export default class BluePikmin extends Pikmin {
    constructor() {
        super("BluePikmin");
        this.nextUnlock = new PurplePikmin();
    }
}
