var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PikminMap from "../Pikmin/PikminMap.js";
import { objectHTMLElement } from "../Default.js";
export default class VerticalTouchspin {
    constructor(query) {
        this.query = query;
        this.objectElement = null;
    }
    initElementType() {
        this.objectElement = document.querySelector(this.query);
    }
    initEventListener() {
        var _a, _b, _c;
        (_a = document.querySelectorAll(objectHTMLElement.vertical_touchspin_element_add)) === null || _a === void 0 ? void 0 : _a.forEach((btn) => {
            let parent = btn.parentElement;
            btn.addEventListener("click", (e) => {
                var _a, _b;
                let input = parent === null || parent === void 0 ? void 0 : parent.querySelector('input');
                let sub = parent === null || parent === void 0 ? void 0 : parent.querySelector('.removePikmin');
                if (input) {
                    let max = (_a = input.getAttribute('max')) !== null && _a !== void 0 ? _a : 0;
                    let min = (_b = input.getAttribute('min')) !== null && _b !== void 0 ? _b : 0;
                    if (max > input.value) {
                        input.value = (parseInt(input.value) + 1).toString();
                    }
                    if (max == input.value) {
                        btn.setAttribute('disabled', 'true');
                    }
                    if (sub && min < input.value) {
                        sub.removeAttribute('disabled');
                    }
                }
            });
        });
        (_b = document.querySelectorAll(objectHTMLElement.vertical_touchspin_element_sub)) === null || _b === void 0 ? void 0 : _b.forEach((btn) => {
            let parent = btn.parentElement;
            btn.addEventListener("click", (e) => {
                var _a, _b;
                let input = parent === null || parent === void 0 ? void 0 : parent.querySelector('input');
                let add = parent === null || parent === void 0 ? void 0 : parent.querySelector('.addPikmin');
                if (input) {
                    let max = (_a = input.getAttribute('max')) !== null && _a !== void 0 ? _a : 0;
                    let min = (_b = input.getAttribute('min')) !== null && _b !== void 0 ? _b : 0;
                    if (min < input.value) {
                        input.value = (parseInt(input.value) - 1).toString();
                    }
                    if (min == input.value) {
                        btn.setAttribute('disabled', 'true');
                    }
                    if (add && max > input.value) {
                        add.removeAttribute('disabled');
                    }
                }
            });
        });
        (_c = document.querySelectorAll(objectHTMLElement.vertical_touchspin_element_input)) === null || _c === void 0 ? void 0 : _c.forEach((input) => {
            const inputE = input;
            let parent = inputE.parentElement;
            inputE.addEventListener("change", (e) => {
                var _a, _b;
                let add = parent === null || parent === void 0 ? void 0 : parent.querySelector('.addPikmin');
                let sub = parent === null || parent === void 0 ? void 0 : parent.querySelector('.removePikmin');
                let max = (_a = inputE.getAttribute('max')) !== null && _a !== void 0 ? _a : 0;
                let min = (_b = inputE.getAttribute('min')) !== null && _b !== void 0 ? _b : 0;
                if (sub && add) {
                    if (min > inputE.value) {
                        inputE.value = min.toString();
                    }
                    if (max < inputE.value) {
                        inputE.value = max.toString();
                    }
                    if (min == inputE.value) {
                        sub.setAttribute('disabled', 'true');
                    }
                    else {
                        sub.removeAttribute('disabled');
                    }
                    if (max == inputE.value) {
                        add.setAttribute('disabled', 'true');
                    }
                    else {
                        add.removeAttribute('disabled');
                    }
                }
            });
        });
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (this.objectElement === null) {
                    throw new Error(`Response status: element does not exist`);
                }
                this.objectElement.classList.remove("d-none");
                const html = yield fetch("./src/views/element_type/vertical_touchspin.html");
                const htmlElement = yield fetch("./src/views/element_type/vertical_touchspin_element.html");
                if (!html.ok) {
                    throw new Error(`Response status: ${html.status}`);
                }
                if (!htmlElement.ok) {
                    throw new Error(`Response status: ${htmlElement.status}`);
                }
                var htmlContent = yield html.text();
                var htmlElementContent = yield htmlElement.text();
                const parseHtml = new DOMParser().parseFromString(htmlContent, "text/html");
                this.objectElement.textContent = "";
                if (parseHtml.body) {
                    this.objectElement.append(...Array.from(parseHtml.body.children));
                    let pikminMap = new PikminMap();
                    for (const key in pikminMap.mapping) {
                        let copyHtml = htmlElementContent
                            .replaceAll('{pikmin_id}', pikminMap.mapping[key].id)
                            .replaceAll('{nb_pikmin}', pikminMap.mapping[key].nbPikmin.toString());
                        let parseHtmlElement = new DOMParser().parseFromString(copyHtml, "text/html");
                        if (parseHtmlElement.body.firstChild) {
                            if (pikminMap.mapping.hasOwnProperty(key)) {
                                if (pikminMap.mapping[key].nbPikmin == 0) {
                                    (_a = parseHtmlElement.querySelector('.addPikmin')) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "true");
                                }
                                (_b = this.objectElement.querySelector("#vertical_touchspin_element_container")) === null || _b === void 0 ? void 0 : _b.appendChild(parseHtmlElement.body.firstChild);
                            }
                        }
                    }
                }
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    addPikmin() {
    }
}
