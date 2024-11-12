import Idle from "./Idle.js"; 
import Onion from "./Onion.js";
import RedPikmin from "./Pikmin/RedPikmin.js";
import YellowPikmin from "./Pikmin/YellowPikmin.js";
import BluePikmin from "./Pikmin/BluePikmin.js";
import PurplePikmin from "./Pikmin/PurplePikmin.js";
import WhitePikmin from "./Pikmin/WhitePikmin.js";



new Idle(null);
initOnion();

function initOnion() {
    new Onion(new RedPikmin(), 1);
    new Onion(new YellowPikmin(), 2);
    new Onion(new BluePikmin(), 3);
    new Onion(new PurplePikmin(), 4);
    new Onion(new WhitePikmin(), 5);
    setTimeout(() => {
        Onion.sort();
    }, 100);
}