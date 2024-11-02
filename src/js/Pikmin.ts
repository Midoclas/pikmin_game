

export default class Pikmin {

    id: string;
    id_upgrade = 'leaf';
    nbPikmin = 0;

    constructor(id: string) {
        this.id = id;
        this.initStorage();
    }

    initStorage() {
        var storedValue = localStorage.getItem(this.id);
        if (storedValue !== null) {
            this.setNbPikmin(parseInt(storedValue));
        }
        storedValue = localStorage.getItem(this.id+'_upgrade');
        if (storedValue !== null) {
            this.setPikminUpgrade(storedValue);
        }
    }

    save(id: string, value: string) {
        localStorage.setItem(id, value);
    }
    
    getNbPikmin() {
        return this.nbPikmin;
    }
    
    setNbPikmin(nb: number) {
        this.nbPikmin = nb;
        this.save(this.id, this.nbPikmin.toString());
    }

    getPikminUpgrade() {
        return this.id_upgrade;
    }

    setPikminUpgrade(upgrade: string) {
        this.id_upgrade = upgrade;
        this.save(this.id+'_upgrade', this.id_upgrade);
    }

    add(nb: number) {
        this.nbPikmin += nb;
        this.save(this.id, this.nbPikmin.toString());
    }

    remove(nb: number) {
        this.nbPikmin -= nb;
        this.save(this.id, this.nbPikmin.toString());
    }
}