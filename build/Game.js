var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _Game_instance;
import Context from "./Context.js";
import { objectHTMLElement } from "./Default.js";
import Treasure from "./Gameplay/Treasure.js";
class Game {
    constructor(gameplay) {
        this.moneyElement = document.querySelectorAll(objectHTMLElement.global_gold_view);
        this.context = Context.instance;
        this.init();
        this.gameplay = gameplay;
    }
    static get instance() {
        if (!__classPrivateFieldGet(_a, _a, "f", _Game_instance)) {
            __classPrivateFieldSet(_a, _a, new _a(new Treasure), "f", _Game_instance);
        }
        return __classPrivateFieldGet(_a, _a, "f", _Game_instance);
    }
    init() {
        this.repaint();
        this.initEventListener();
    }
    initEventListener() {
        document.addEventListener("moneyRefresh", () => {
            this.repaint();
        });
        window.addEventListener("beforeunload", () => {
            var _b;
            if (localStorage.getItem("is_game_exist") !== null) {
                (_b = this.gameplay) === null || _b === void 0 ? void 0 : _b.destructor();
            }
        });
    }
    destroyGameplay() {
        return __awaiter(this, void 0, void 0, function* () {
            var _b;
            (_b = this.gameplay) === null || _b === void 0 ? void 0 : _b.destructor();
        });
    }
    startGameplay(gameplay) {
        return __awaiter(this, void 0, void 0, function* () {
            this.gameplay = gameplay;
        });
    }
    repaint() {
        this.moneyElement.forEach((e) => {
            e.innerHTML = this.context.getMoney().toString();
        });
    }
}
_a = Game;
_Game_instance = { value: void 0 };
export default Game;
