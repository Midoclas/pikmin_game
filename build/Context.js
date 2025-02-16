"use strict";
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
var _a, _Context_instance;
class Context {
    constructor() {
        this.money = 0;
        this.initStorage();
    }
    static get instance() {
        if (!__classPrivateFieldGet(_a, _a, "f", _Context_instance)) {
            __classPrivateFieldSet(_a, _a, new _a(), "f", _Context_instance);
        }
        return __classPrivateFieldGet(_a, _a, "f", _Context_instance);
    }
    initStorage() {
        let moneyStoredValue = localStorage.get("money");
        if (moneyStoredValue !== null) {
            this.setMoney(parseInt(moneyStoredValue));
        }
    }
    save(id, value) {
        localStorage.setItem(id, value);
    }
    getMoney() {
        return this.money;
    }
    setMoney(value) {
        this.money = value;
        this.save("money", this.money.toString());
    }
    addMoney(value) {
        this.money += value;
        this.save("money", this.money.toString());
    }
}
_a = Context;
_Context_instance = { value: void 0 };
