import YellowPikmin from "./YellowPikmin.js";
import Pikmin from "./Pikmin.js";

export default class RedPikmin extends Pikmin {

    nextUnlock = new YellowPikmin();

    constructor() {
        super("RedPikmin");
    }
}