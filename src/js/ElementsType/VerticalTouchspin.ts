export default abstract class VerticalTouchspin {

    objectElement: HTMLElement | null;

    constructor(query: string) {
        this.objectElement = document.getElementById(query);
        this.init();
    }

    init() {
        this.render();
    }

    async render() {
        try {
            if (this.objectElement === null) {
                throw new Error(`Response status: element does not exist`);
            }
            const html = await fetch("./src/views/element_type/vertical_touchspin.html");
            if (!html.ok) {
                throw new Error(`Response status: ${html.status}`);
            }

            var htmlContent = await html.text();
            const parseHtml = new DOMParser().parseFromString(htmlContent, "text/html");

            this.objectElement.remove();
            if (parseHtml.body.firstChild) {
                this.objectElement.appendChild(parseHtml.body.firstChild);
            }


        } catch (error: any) {
            console.error(error.message);
        }
    }
}