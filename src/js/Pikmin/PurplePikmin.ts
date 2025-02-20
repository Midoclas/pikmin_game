import Pikmin from "./Pikmin.js";
import WhitePikmin from "./WhitePikmin.js";

export default class PurplePikmin extends Pikmin {

    nextUnlock = new WhitePikmin();

    constructor() {
        super("pikmin_purple");
    }
}