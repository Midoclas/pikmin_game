import Pikmin from "./Pikmin";
import WhitePikmin from "./WhitePikmin";

export default class PurplePikmin extends Pikmin {

    nextUnlock = new WhitePikmin();

    constructor() {
        super("PurplePikmin");
    }
}