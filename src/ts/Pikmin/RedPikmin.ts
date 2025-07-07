import YellowPikmin from "./YellowPikmin";
import Pikmin from "./Pikmin";

export default class RedPikmin extends Pikmin {

    nextUnlock = new YellowPikmin();

    constructor() {
        super("RedPikmin");
    }
}