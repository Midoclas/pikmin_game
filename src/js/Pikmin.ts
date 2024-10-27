

export default class Pikmin {

    id: string;
    nbPikmin = 0;

    constructor(id: string) {
        this.id = id;
        this.initStorage();
    }

    initStorage() {
        var storedValue = localStorage.getItem(this.id);
        if (storedValue !== null) {
            this.setNbPikmin(parseInt(storedValue));
            this.nbPikmin = parseInt(storedValue);
        }
    }

    save() {
        localStorage.setItem(this.id, this.nbPikmin.toString());
    }
    
    getNbPikmin() {
        return this.nbPikmin;
    }
    
    setNbPikmin(nb: number) {
        this.nbPikmin = nb;
        this.save();
    }

    add(nb: number) {
        this.nbPikmin += nb;
        this.save();
    }

    remove(nb: number) {
        this.nbPikmin -= nb;
        this.save();
    }
}