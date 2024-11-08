var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Onion = /** @class */ (function () {
    function Onion(pikmin) {
        this.container = document.getElementById("onion");
        this.capacity = 0;
        this.pikmin = pikmin;
        this.id = this.pikmin.id + '_onion';
        this.initHtml();
    }
    Onion.prototype.initHtml = function () {
        return __awaiter(this, void 0, void 0, function () {
            var existingElement, response, html, parseHtml, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this.container) {
                            return [2 /*return*/];
                        }
                        existingElement = this.container.querySelector('#' + this.id);
                        if (existingElement) {
                            existingElement.remove();
                        }
                        return [4 /*yield*/, fetch("./src/views/onion.html")];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Response status: ".concat(response.status));
                        }
                        return [4 /*yield*/, response.text()];
                    case 2:
                        html = _a.sent();
                        html = html.replace('{onion_id}', this.id);
                        html = html.replace('{pikmin_id}', this.pikmin.id);
                        html = html.replace('{pikmin_upgrade}', this.pikmin.id_upgrade);
                        html = html.replace('{nb_pikmin}', this.pikmin.nbPikmin.toString());
                        parseHtml = new DOMParser().parseFromString(html, "text/html");
                        if (parseHtml.body.firstChild) {
                            this.container.appendChild(parseHtml.body.firstChild);
                            this.container.offsetHeight;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Onion;
}());
export default Onion;
