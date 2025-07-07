import Idle from "./Gameplay/Idle"; 
import LocalStorageManager from "./LocalStorageManager";
import Game from "./Game";
import Treasure from "./Gameplay/Treasure/Treasure";
import { objectHTMLElement } from "./Default";

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

