var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class VerticalTouchspin {
    constructor(query) {
        this.query = query;
        this.objectElement = null;
    }
    initElementType() {
        this.objectElement = document.querySelector(this.query);
        this.render();
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.objectElement === null) {
                    throw new Error(`Response status: element does not exist`);
                }
                const html = yield fetch("./src/views/element_type/vertical_touchspin.html");
                if (!html.ok) {
                    throw new Error(`Response status: ${html.status}`);
                }
                var htmlContent = yield html.text();
                const parseHtml = new DOMParser().parseFromString(htmlContent, "text/html");
                this.objectElement.remove();
                if (parseHtml.body.firstChild) {
                    this.objectElement.appendChild(parseHtml.body.firstChild);
                }
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
}
