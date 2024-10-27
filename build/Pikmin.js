var Pikmin = /** @class */ (function () {
    function Pikmin(id) {
        this.nbPikmin = 0;
        this.id = id;
        this.initStorage();
    }
    Pikmin.prototype.initStorage = function () {
        var storedValue = localStorage.getItem(this.id);
        if (storedValue !== null) {
            this.setNbPikmin(parseInt(storedValue));
            this.nbPikmin = parseInt(storedValue);
        }
    };
    Pikmin.prototype.save = function () {
        localStorage.setItem(this.id, this.nbPikmin.toString());
    };
    Pikmin.prototype.getNbPikmin = function () {
        return this.nbPikmin;
    };
    Pikmin.prototype.setNbPikmin = function (nb) {
        this.nbPikmin = nb;
        this.save();
    };
    Pikmin.prototype.add = function (nb) {
        this.nbPikmin += nb;
        this.save();
    };
    Pikmin.prototype.remove = function (nb) {
        this.nbPikmin -= nb;
        this.save();
    };
    return Pikmin;
}());
export default Pikmin;
