import { objectLocalStorage } from "../Default.js";
export default class Pikmin {
    constructor(id) {
        this.id_upgrade = "";
        this.growTime = 0;
        this.attack = 0;
        this.lifePoint = 0;
        this.defense = 0;
        this.lock = 1;
        this.id = id;
        this.nextUnlock = null;
        this.unlockCost = objectLocalStorage.pikmin[this.id].static.unlock_cost;
        this.position = objectLocalStorage.pikmin[this.id].static.position;
        this.initStorage();
    }
    initStorage() {
        let storedValue = localStorage.getItem('pikmin_' + this.id + '_upgrade');
        let attackStoredValue = localStorage.getItem('pikmin_' + this.id + '_attack');
        let lifePointStoredValue = localStorage.getItem('pikmin_' + this.id + '_life_point');
        let defenseStoredValue = localStorage.getItem('pikmin_' + this.id + '_defense');
        let growTimeStoredValue = localStorage.getItem('pikmin_' + this.id + "_grow_time");
        let lockStoredValue = localStorage.getItem('pikmin_' + this.id + '_lock');
        if (growTimeStoredValue !== null) {
            this.growTime = parseInt(growTimeStoredValue);
        }
        if (storedValue !== null) {
            this.setPikminUpgrade(storedValue);
        }
        if (attackStoredValue !== null) {
            this.setAttack(parseInt(attackStoredValue));
        }
        if (lifePointStoredValue !== null) {
            this.setLifePoint(parseInt(lifePointStoredValue));
        }
        if (defenseStoredValue !== null) {
            this.setDefense(parseInt(defenseStoredValue));
        }
        if (lockStoredValue === "0") {
            this.lock = 0;
        }
    }
    save(id, value) {
        localStorage.setItem(id, value);
    }
    unlock() {
        this.save('pikmin_' + this.id + '_lock', "0");
    }
    getPikminUpgrade() {
        return this.id_upgrade;
    }
    setPikminUpgrade(upgrade) {
        this.id_upgrade = upgrade;
        this.save('pikmin_' + this.id + '_upgrade', this.id_upgrade);
    }
    getGrowTime() {
        return this.growTime;
    }
    setGrowTime(value) {
        this.growTime = value;
        this.save('pikmin_' + this.id + "_grow_time", value.toString());
    }
    getAttack() {
        return this.attack;
    }
    setAttack(value) {
        this.attack = value;
        this.save('pikmin_' + this.id + "_attack", value.toString());
    }
    upgradeAttack() {
        this.setAttack(this.getAttack() + 1);
    }
    getLifePoint() {
        return this.lifePoint;
    }
    setLifePoint(value) {
        this.lifePoint = value;
        this.save('pikmin_' + this.id + "_life_point", value.toString());
    }
    upgradeLifePoint() {
        this.setLifePoint(this.getLifePoint() + 1);
    }
    getDefense() {
        return this.defense;
    }
    setDefense(value) {
        this.defense = value;
        this.save('pikmin_' + this.id + "_defense", value.toString());
    }
    upgradeDefense() {
        this.setDefense(this.getDefense() + 1);
    }
}
