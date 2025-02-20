import Idle from "./Idle.js"; 
import Onion from "./Onion/Onion.js";
import LocalStorageManager from "./LocalStorageManager.js";
import Game from "./Game.js";

var idle;
var game;
var isGameExist = localStorage.getItem("is_game_exist");
var localStorageManager = new LocalStorageManager();
init();

function init() {
    if (!isGameExist) {
        localStorageManager.initStorage();
    }
    
    game = new Game();
    idle = Idle.instance;
    Onion.initOnion();
}

document.getElementById("reset")?.addEventListener("click", () => {
  localStorageManager.reset();
})