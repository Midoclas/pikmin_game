export default class Pikmin {
    constructor(id) {
        this.id_upgrade = "";
        this.growTime = 0;
        this.id = id;
        this.initStorage();
    }
    initStorage() {
        var storedValue = localStorage.getItem(this.id + '_upgrade');
        if (storedValue !== null) {
            this.setPikminUpgrade(storedValue);
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
}
