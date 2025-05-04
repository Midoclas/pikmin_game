import PikminMap from "../Pikmin/PikminMap.js";
import { objectHTMLElement } from "../Default.js";

export default class VerticalTouchspin {

    objectElement: HTMLElement | null;
    query: string;

    constructor(query: string) {
        this.query = query;
        this.objectElement = null;
    }

    initElementType() {
        this.objectElement = document.querySelector(this.query);
    }

    initEventListener() {
        document.querySelectorAll(objectHTMLElement.vertical_touchspin_element_add)?.forEach((btn) => {
            let parent = btn.parentElement;
            btn.addEventListener("click", (e) => {
                
                let input = parent?.querySelector('input');
                let sub = parent?.querySelector('.removePikmin');
                if (input) {
                    let max = input.getAttribute('max') ?? 0;
                    let min = input.getAttribute('min') ?? 0;
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
            })
        });
        document.querySelectorAll(objectHTMLElement.vertical_touchspin_element_sub)?.forEach((btn) => {
            let parent = btn.parentElement;
            btn.addEventListener("click", (e) => {
                let input = parent?.querySelector('input');
                let add = parent?.querySelector('.addPikmin');
                if (input) {
                    let max = input.getAttribute('max') ?? 0;
                    let min = input.getAttribute('min') ?? 0;
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
            })
        });
        document.querySelectorAll(objectHTMLElement.vertical_touchspin_element_input)?.forEach((input) => {
            const inputE = input as HTMLInputElement;
            let parent = inputE.parentElement;
            inputE.addEventListener("change", (e) => {
                let add = parent?.querySelector('.addPikmin');
                let sub = parent?.querySelector('.removePikmin');
                let max = inputE.getAttribute('max') ?? 0;
                let min = inputE.getAttribute('min') ?? 0;
                if (sub && add) {
                    if (min > inputE.value) {
                        inputE.value = min.toString();
                    }
                    if (max < inputE.value) {
                        inputE.value = max.toString();
                    }
                    if (min == inputE.value) {
                        sub.setAttribute('disabled', 'true');
                    } else {
                        sub.removeAttribute('disabled');
                    }
                    if (max == inputE.value) {
                        add.setAttribute('disabled', 'true');
                    } else {
                        add.removeAttribute('disabled');
                    }
                }
            })
        });
    }

    async render() {
        try {
            if (this.objectElement === null) {
                throw new Error(`Response status: element does not exist`);
            }
            const html = await fetch("./src/views/element_type/vertical_touchspin.html");
            const htmlElement = await fetch("./src/views/element_type/vertical_touchspin_element.html");
            if (!html.ok) {
                throw new Error(`Response status: ${html.status}`);
            }
            if (!htmlElement.ok) {
                throw new Error(`Response status: ${htmlElement.status}`);
            }

            var htmlContent = await html.text();
            var htmlElementContent = await htmlElement.text();
            const parseHtml = new DOMParser().parseFromString(htmlContent, "text/html");

            this.objectElement.textContent = "";
            if (parseHtml.body.firstChild) {
                this.objectElement.appendChild(parseHtml.body.firstChild);
                let pikminMap = new PikminMap();
                for (const key in pikminMap.mapping) {
                    let copyHtml = htmlElementContent
                        .replaceAll('{pikmin_id}', pikminMap.mapping[key].id)
                        .replaceAll('{nb_pikmin}', pikminMap.mapping[key].nbPikmin.toString());
                    
                    let parseHtmlElement = new DOMParser().parseFromString(copyHtml, "text/html");
                    if (parseHtmlElement.body.firstChild) {
                        if (pikminMap.mapping.hasOwnProperty(key)) {
                            if (pikminMap.mapping[key].nbPikmin == 0) {
                                parseHtmlElement.querySelector('.addPikmin')?.setAttribute("disabled", "true");
                            }
                            this.objectElement.querySelector("#vertical_touchspin_element_container")?.appendChild(parseHtmlElement.body.firstChild);   
                        }
                    }
                }
                
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    addPikmin() {

    }
}