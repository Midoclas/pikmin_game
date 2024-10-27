

class Pikmin {

    objectElement: string;
    id: Int32Array;

    constructor(objectElement: string, id: Int32Array) {
        this.objectElement = objectElement;
        this.id = id
    }

    initStorage() {
        var storedValue = localStorage.getItem("pikmin"+this.id);
        if (storedValue === null) {
            localStorage.setItem("pikmin"+this.id, "0");
        }
    }
    
    getNbPikmin() {
        return localStorage.getItem("pikmin"+this.id);
    }
    
    setNbPikmin(nb: Int32Array) {
        localStorage.setItem("pikmin"+this.id, nb.toString());
    }
}