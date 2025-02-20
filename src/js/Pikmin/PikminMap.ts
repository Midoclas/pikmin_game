import RedPikmin from "./RedPikmin.js";
import BluePikmin from "./BluePikmin.js";
import YellowPikmin from "./YellowPikmin.js";
import PurplePikmin from "./PurplePikmin.js";
import WhitePikmin from "./WhitePikmin.js";
import { mappingPikminType } from "../Typage.js";

export default class PikminMap {

    mapping: mappingPikminType = {};

    constructor() {
        this.init()
    }

    init() {
        var redPikmin = new RedPikmin();
        var bluePikmin = new BluePikmin();
        var yellowPikmin = new YellowPikmin();
        var purplePikmin = new PurplePikmin();
        var whitePikmin = new WhitePikmin();

        if (!redPikmin.lock) {
            this.mapping[redPikmin.id] = redPikmin;
        }
        if (!bluePikmin.lock) {
            this.mapping[bluePikmin.id] = bluePikmin;
        }
        if (!yellowPikmin.lock) {
            this.mapping[yellowPikmin.id] = yellowPikmin;
        }
        if (!purplePikmin.lock) {
            this.mapping[purplePikmin.id] = purplePikmin;
        }
        if (!whitePikmin.lock) {
            this.mapping[whitePikmin.id] = whitePikmin;
        }
    }
}