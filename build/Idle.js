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
var _a, _Idle_instance;
import { objectLocalStorage } from "./Default.js";
import ProgressBar from "./ElementsType/ProgressBar.js";
class Idle extends ProgressBar {
    constructor(onion) {
        let query = "idleProgressBar";
        super(query, objectLocalStorage.elementType.progressBar.timeProgressBar, false);
        this.timeoutId = 0;
        this.isHarvestable = false;
        this.btn = document.getElementById("harvest");
        this.onion = onion;
        if (this.onion !== null) {
            this.initEventListener();
            this.init();
        }
        else {
            this.repaint();
        }
    }
    static get instance() {
        if (!__classPrivateFieldGet(_a, _a, "f", _Idle_instance)) {
            __classPrivateFieldSet(_a, _a, new _a(null), "f", _Idle_instance);
        }
        return __classPrivateFieldGet(_a, _a, "f", _Idle_instance);
    }
    initEventListener() {
        var _b;
        (_b = this.btn) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this.harvest();
        });
    }
    init() {
        var _b, _c;
        this.plant();
        (_b = document.getElementById('idle-animation')) === null || _b === void 0 ? void 0 : _b.classList.add('plant', ((_c = this.onion) === null || _c === void 0 ? void 0 : _c.pikmin.id) + "_plant_animation", "mx-auto");
    }
    setOnion(onion) {
        this.onion = onion;
        this.setTimeProgressBar(onion.pikmin.growTime);
        this.initEventListener();
        this.init();
    }
    resetIdle() {
        this.onion = null;
        this.isHarvestable = false;
        this.timeoutId = 0;
        var idleAnimation = document.getElementById('idle-animation');
        if (idleAnimation !== null) {
            idleAnimation.className = "";
        }
        this.repaint();
    }
    plant() {
        this.isHarvestable = false;
        this.resetProgressBar();
        this.repaint();
        this.timeoutId = setTimeout(() => {
            this.isHarvestable = true;
            this.repaint();
        }, this.timeProgressBar * 1000);
    }
    harvest() {
        if (this.isHarvestable && this.onion !== null) {
            this.onion.add(1);
            this.plant();
            this.onion.repaint();
        }
        return false;
    }
    repaint() {
        var _b, _c;
        if (this.isHarvestable) {
            (_b = this.btn) === null || _b === void 0 ? void 0 : _b.removeAttribute("disabled");
        }
        else {
            (_c = this.btn) === null || _c === void 0 ? void 0 : _c.setAttribute("disabled", "");
        }
    }
}
_a = Idle;
_Idle_instance = { value: void 0 };
export default Idle;
