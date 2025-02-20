import Pikmin from "./Pikmin.js";
import PurplePikmin from "./PurplePikmin.js";

export default class BluePikmin extends Pikmin {

    nextUnlock = new PurplePikmin();

    constructor() {
        super("pikmin_blue");
    }
}