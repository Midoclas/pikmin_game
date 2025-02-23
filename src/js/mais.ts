import Idle from "./Gameplay/Idle.js"; 
import LocalStorageManager from "./LocalStorageManager.js";
import Game from "./Game.js";
import Treasure from "./Gameplay/Treasure.js";
import { objectHTMLElement } from "./Default.js";

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
    document.querySelector(objectHTMLElement.global_reset_btn)?.addEventListener("click", () => {
        localStorageManager.reset();
    })
      
    document.querySelector(objectHTMLElement.idle_init_btn)?.addEventListener("click", async () => {
        await game.destroyGameplay();
        game.startGameplay(new Idle());
    })

    document.querySelector(objectHTMLElement.treasure_init_btn)?.addEventListener("click", async () => {
        await game.destroyGameplay();
        game.startGameplay(new Treasure);
    })
}

