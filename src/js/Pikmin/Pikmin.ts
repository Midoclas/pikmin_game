import { objectLocalStorage } from "../Default.js";

export default class Pikmin {

    id: string;
    id_upgrade = "";
    growTime = 0;
    attack = 0;
    lifePoint = 0;
    defense = 0;
    position: number;
    nextUnlock: Pikmin|null;
    unlockCost: number;
    lock = 1;

    constructor(id: string) {
        this.id = id;
        this.nextUnlock = null;
        this.unlockCost = objectLocalStorage.pikmin[this.id].static.unlock_cost;
        this.position = objectLocalStorage.pikmin[this.id].static.position;
        this.initStorage();
    }

    initStorage() {
        let storedValue = localStorage.getItem('pikmin_'+this.id+'_upgrade');
        let attackStoredValue = localStorage.getItem('pikmin_'+this.id+'_attack');
        let lifePointStoredValue = localStorage.getItem('pikmin_'+this.id+'_life_point');
        let defenseStoredValue = localStorage.getItem('pikmin_'+this.id+'_defense');
        let growTimeStoredValue = localStorage.getItem('pikmin_'+this.id+"_grow_time");
        let lockStoredValue = localStorage.getItem('pikmin_'+this.id+'_lock')

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

    save(id: string, value: string) {
        localStorage.setItem(id, value);
    }

    unlock() {
        this.save('pikmin_'+this.id+'_lock', "0");
    }

    getPikminUpgrade() {
        return this.id_upgrade;
    }

    setPikminUpgrade(upgrade: string) {
        this.id_upgrade = upgrade;
        this.save('pikmin_'+this.id+'_upgrade', this.id_upgrade);
    }

    getGrowTime(): number {
        return this.growTime;
    }

    setGrowTime(value: number): void {
        this.growTime = value;
        this.save('pikmin_'+this.id+"_grow_time", value.toString());
    }

    getAttack(): number {
        return this.attack;
    }

    setAttack(value: number): void {
        this.attack = value;
        this.save('pikmin_'+this.id+"_attack", value.toString());
    }

    upgradeAttack(): void {
        this.setAttack(this.getAttack() + 1);
    }

    getLifePoint(): number {
        return this.lifePoint;
    }

    setLifePoint(value: number): void {
        this.lifePoint = value;
        this.save('pikmin_'+this.id+"_life_point", value.toString());
    }

    upgradeLifePoint(): void {
        this.setLifePoint(this.getLifePoint() + 1);
    }

    getDefense(): number {
        return this.defense;
    }

    setDefense(value: number): void {
        this.defense = value;
        this.save('pikmin_'+this.id+"_defense", value.toString());
    }

    upgradeDefense(): void {
        this.setDefense(this.getDefense() + 1);
    }
}