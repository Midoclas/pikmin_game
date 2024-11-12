
export default class Pikmin {

    id: string;
    id_upgrade = "";
    growTime = 0;

    constructor(id: string) {
        this.id = id;
        this.initStorage();
    }

    initStorage() {
        var storedValue = localStorage.getItem(this.id+'_upgrade');
        if (storedValue !== null) {
            this.setPikminUpgrade(storedValue);
        }
    }

    save(id: string, value: string) {
        localStorage.setItem(id, value);
    }

    getPikminUpgrade() {
        return this.id_upgrade;
    }

    setPikminUpgrade(upgrade: string) {
        this.id_upgrade = upgrade;
        this.save(this.id+'_upgrade', this.id_upgrade);
    }
}