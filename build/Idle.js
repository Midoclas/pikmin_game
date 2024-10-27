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
    function Idle() {
        var _this = this;
        var query = "idleProgressBar";
        _this = _super.call(this, query, defaultTimeProgressBar) || this;
        _this.setProgressBar();
        return _this;
    }
    return Idle;
}(ProgressBar));
export default Idle;
