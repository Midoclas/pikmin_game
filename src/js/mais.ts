import Idle from "./Idle.js"; 
import Pikmin from "./Pikmin.js";
import Onion from "./Onion.js";



new Idle(null);
initOnion();

function initOnion() {
    new Onion(new Pikmin("pikmin_red"), 1);
    new Onion(new Pikmin("pikmin_yellow"), 2);
    new Onion(new Pikmin("pikmin_blue"), 3);
    new Onion(new Pikmin("pikmin_purple"), 4);
    new Onion(new Pikmin("pikmin_white"), 5);
    setTimeout(() => {
        Onion.sort();
    }, 100);
}