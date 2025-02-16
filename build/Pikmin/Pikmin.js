import { objectLocalStorage } from "../Default.js";
export default class Pikmin {
    constructor(id) {
        this.id_upgrade = "";
        this.growTime = 0;
        this.attack = 0;
        this.lifePoint = 0;
        this.defense = 0;
        this.id = id;
        this.initStorage();
    }
    initStorage() {
        var storedValue = localStorage.getItem(this.id + '_upgrade');
        var attackStoredValue = localStorage.getItem(this.id + '_attack');
        var lifePointStoredValue = localStorage.getItem(this.id + '_life_point');
        var defenseStoredValue = localStorage.getItem(this.id + '_defense');
        var growTimeStoredValue = localStorage.getItem(this.id + "_grow_time");
        if (growTimeStoredValue !== null) {
            this.growTime = parseInt(growTimeStoredValue);
        }
        else {
            this.setGrowTime(objectLocalStorage.pikmin[this.id].grow_time);
        }
        if (storedValue !== null) {
            this.setPikminUpgrade(storedValue);
        }
        if (attackStoredValue !== null) {
            this.setAttack(parseInt(attackStoredValue));
        }
        else {
            this.setAttack(objectLocalStorage.pikmin[this.id].attack);
        }
        if (lifePointStoredValue !== null) {
            this.setLifePoint(parseInt(lifePointStoredValue));
        }
        else {
            this.setLifePoint(objectLocalStorage.pikmin[this.id].life_point);
        }
        if (defenseStoredValue !== null) {
            this.setDefense(parseInt(defenseStoredValue));
        }
        else {
            this.setDefense(objectLocalStorage.pikmin[this.id].defense);
        }
    }
    save(id, value) {
        localStorage.setItem(id, value);
    }
    getPikminUpgrade() {
        return this.id_upgrade;
    }
    setPikminUpgrade(upgrade) {
        this.id_upgrade = upgrade;
        this.save(this.id + '_upgrade', this.id_upgrade);
    }
    getGrowTime() {
        return this.growTime;
    }
    setGrowTime(value) {
        this.growTime = value;
        this.save(this.id + "_grow_time", value.toString());
    }
    getAttack() {
        return this.attack;
    }
    setAttack(value) {
        this.attack = value;
        this.save(this.id + "_attack", value.toString());
    }
    upgradeAttack() {
        this.setAttack(this.getAttack() + 1);
    }
    getLifePoint() {
        return this.lifePoint;
    }
    setLifePoint(value) {
        this.lifePoint = value;
        this.save(this.id + "_life_point", value.toString());
    }
    upgradeLifePoint() {
        this.setLifePoint(this.getLifePoint() + 1);
    }
    getDefense() {
        return this.defense;
    }
    setDefense(value) {
        this.defense = value;
        this.save(this.id + "_defense", value.toString());
    }
    upgradeDefense() {
        this.setDefense(this.getDefense() + 1);
    }
}
