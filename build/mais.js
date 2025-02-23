var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Idle from "./Gameplay/Idle.js";
import LocalStorageManager from "./LocalStorageManager.js";
import Game from "./Game.js";
import Treasure from "./Gameplay/Treasure.js";
var game;
var isGameExist = localStorage.getItem("is_game_exist");
var localStorageManager = new LocalStorageManager();
init();
function init() {
    if (!isGameExist) {
        localStorageManager.initStorage();
    }
    game = Game.instance;
    initEventListener();
}
function initEventListener() {
    var _a, _b, _c;
    (_a = document.getElementById("reset")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        localStorageManager.reset();
    });
    (_b = document.getElementById("start_idle")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        yield game.destroyGameplay();
        game.startGameplay(new Idle());
    }));
    (_c = document.getElementById("start_treasure")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        yield game.destroyGameplay();
        game.startGameplay(new Treasure);
    }));
}
