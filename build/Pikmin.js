var Pikmin = /** @class */ (function () {
    function Pikmin(id) {
        this.id_upgrade = 'leaf';
        this.nbPikmin = 0;
        this.id = id;
        this.initStorage();
    }
    Pikmin.prototype.initStorage = function () {
        var storedValue = localStorage.getItem(this.id);
        if (storedValue !== null) {
            this.setNbPikmin(parseInt(storedValue));
        }
        storedValue = localStorage.getItem(this.id + '_upgrade');
        if (storedValue !== null) {
            this.setPikminUpgrade(storedValue);
        }
    };
    Pikmin.prototype.save = function (id, value) {
        localStorage.setItem(id, value);
    };
    Pikmin.prototype.getNbPikmin = function () {
        return this.nbPikmin;
    };
    Pikmin.prototype.setNbPikmin = function (nb) {
        this.nbPikmin = nb;
        this.save(this.id, this.nbPikmin.toString());
    };
    Pikmin.prototype.getPikminUpgrade = function () {
        return this.id_upgrade;
    };
    Pikmin.prototype.setPikminUpgrade = function (upgrade) {
        this.id_upgrade = upgrade;
        this.save(this.id + '_upgrade', this.id_upgrade);
    };
    Pikmin.prototype.add = function (nb) {
        this.nbPikmin += nb;
        this.save(this.id, this.nbPikmin.toString());
    };
    Pikmin.prototype.remove = function (nb) {
        this.nbPikmin -= nb;
        this.save(this.id, this.nbPikmin.toString());
    };
    return Pikmin;
}());
export default Pikmin;
