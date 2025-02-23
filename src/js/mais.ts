import Idle from "./Gameplay/Idle.js"; 
import LocalStorageManager from "./LocalStorageManager.js";
import Game from "./Game.js";
import Treasure from "./Gameplay/Treasure.js";

var game: Game;
var isGameExist = localStorage.getItem("is_game_exist");
var localStorageManager = new LocalStorageManager();
init();

function init() {
    if (!isGameExist) {
        localStorageManager.initStorage();
    }
    game = Game.instance;
    initEventListener()
}

function initEventListener() {
    document.getElementById("reset")?.addEventListener("click", () => {
        localStorageManager.reset();
    })
      
    document.getElementById("start_idle")?.addEventListener("click", async () => {
        await game.destroyGameplay();
        game.startGameplay(new Idle());
    })

    document.getElementById("start_treasure")?.addEventListener("click", async () => {
        await game.destroyGameplay();
        game.startGameplay(new Treasure);
    })
}

