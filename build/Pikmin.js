"use strict";
var Pikmin = /** @class */ (function () {
    function Pikmin(objectElement, id) {
        this.objectElement = objectElement;
        this.id = id;
    }
    Pikmin.prototype.initStorage = function () {
        var storedValue = localStorage.getItem("pikmin" + this.id);
        if (storedValue === null) {
            localStorage.setItem("pikmin" + this.id, "0");
        }
    };
    Pikmin.prototype.getNbPikmin = function () {
        return localStorage.getItem("pikmin" + this.id);
    };
    Pikmin.prototype.setNbPikmin = function (nb) {
        localStorage.setItem("pikmin" + this.id, nb.toString());
    };
    return Pikmin;
}());
