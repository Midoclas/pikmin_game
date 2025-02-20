import Pikmin from "./Pikmin.js";
import BluePikmin from "./BluePikmin.js";

export default class YellowPikmin extends Pikmin {

    nextUnlock = new BluePikmin();
    constructor() {
        super("pikmin_yellow");
    }
}