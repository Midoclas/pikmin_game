export default class Pikmin {
    constructor(id) {
        this.id_upgrade = 'leaf';
        this.nbPikmin = 0;
        this.id = id;
        this.initStorage();
    }
    initStorage() {
        var storedValue = localStorage.getItem(this.id);
        if (storedValue !== null) {
            this.setNbPikmin(parseInt(storedValue));
        }
        storedValue = localStorage.getItem(this.id + '_upgrade');
        if (storedValue !== null) {
            this.setPikminUpgrade(storedValue);
        }
    }
    save(id, value) {
        localStorage.setItem(id, value);
    }
    getNbPikmin() {
        return this.nbPikmin;
    }
    setNbPikmin(nb) {
        this.nbPikmin = nb;
        this.save(this.id, this.nbPikmin.toString());
    }
    getPikminUpgrade() {
        return this.id_upgrade;
    }
    setPikminUpgrade(upgrade) {
        this.id_upgrade = upgrade;
        this.save(this.id + '_upgrade', this.id_upgrade);
    }
    add(nb) {
        this.nbPikmin += nb;
        this.save(this.id, this.nbPikmin.toString());
    }
    remove(nb) {
        this.nbPikmin -= nb;
        this.save(this.id, this.nbPikmin.toString());
    }
}
