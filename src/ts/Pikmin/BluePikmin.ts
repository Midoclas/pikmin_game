import Pikmin from "./Pikmin";
import PurplePikmin from "./PurplePikmin";

export default class BluePikmin extends Pikmin {

    nextUnlock = new PurplePikmin();

    constructor() {
        super("BluePikmin");
    }
}