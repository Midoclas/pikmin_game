var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { defaultTimeProgressBar } from "./Default.js";
import ProgressBar from "./ElementsType/ProgressBar/ProgressBar.js";
var Idle = /** @class */ (function (_super) {
    __extends(Idle, _super);
    function Idle(pikmin) {
        var _this = this;
        var query = "idleProgressBar";
        _this = _super.call(this, query, defaultTimeProgressBar) || this;
        _this.timeoutId = 0;
        _this.isHarvestable = false;
        _this.btn = document.getElementById("harvest");
        _this.pikmin = pikmin;
        _this.initEventListener();
        _this.init();
        return _this;
    }
    Idle.prototype.initEventListener = function () {
        var _this = this;
        var _a;
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            _this.harvest();
        });
    };
    Idle.prototype.init = function () {
        this.plant();
    };
    Idle.prototype.plant = function () {
        var _this = this;
        this.isHarvestable = false;
        this.resetProgressBar();
        this.repaint();
        this.timeoutId = setTimeout(function () {
            _this.isHarvestable = true;
            _this.repaint();
        }, this.timeProgressBar * 1000);
    };
    Idle.prototype.harvest = function () {
        if (this.isHarvestable) {
            this.pikmin.add(1);
            this.plant();
        }
        return false;
    };
    Idle.prototype.repaint = function () {
        var _a, _b;
        if (this.isHarvestable) {
            (_a = this.btn) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
        }
        else {
            (_b = this.btn) === null || _b === void 0 ? void 0 : _b.setAttribute("disabled", "");
        }
    };
    return Idle;
}(ProgressBar));
export default Idle;
