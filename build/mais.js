var _a;
import Idle from "./Gameplay/Idle.js";
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
(_a = document.getElementById("reset")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    localStorageManager.reset();
});
