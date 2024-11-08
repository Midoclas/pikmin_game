import Idle from "./Idle.js"; 
import Pikmin from "./Pikmin.js";
import Onion from "./Onion.js";

var idle = new Idle(null);
var redOnion = new Onion(new Pikmin("pikmin_red"));
var yellowOnion = new Onion(new Pikmin("pikmin_yellow"));
var blueOnion = new Onion(new Pikmin("pikmin_blue"));