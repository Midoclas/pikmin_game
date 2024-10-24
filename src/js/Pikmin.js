

class Pikmin {

    objectElement;

    constructor(objectElement, id) {
        this.objectElement = objectElement;
        this.id = id
    }

    initStorage() {
        var storedValue = localStorage.getItem("pikmin"+this.id);
        if (storedValue === null) {
            localStorage.setItem("pikmin"+this.id, 0);
        }
    }
    
    getNbPikmin() {
        return localStorage.getItem("pikmin"+this.id);
    }
    
    setNbPikmin(nb) {
        localStorage.setItem("pikmin"+this.id, nb);
    }

    
}