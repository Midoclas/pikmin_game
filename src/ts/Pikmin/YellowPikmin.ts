import Pikmin from "./Pikmin";
import BluePikmin from "./BluePikmin";

export default class YellowPikmin extends Pikmin {

    nextUnlock = new BluePikmin();
    constructor() {
        super("YellowPikmin");
    }
}