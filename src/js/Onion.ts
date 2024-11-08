import Pikmin from "./Pikmin";

export default class Onion {
    
    capacity: number;
    pikmin: Pikmin;
    id: string;
    container = document.getElementById("onion");

    constructor(pikmin: Pikmin) {
        this.capacity = 0;
        this.pikmin = pikmin;
        this.id = this.pikmin.id + '_onion';
        this.initHtml();
    }

    async initHtml() {

        try {
            if (!this.container) {
                return;
            }
            var existingElement = this.container.querySelector('#'+this.id)
            if (existingElement) {
                existingElement.remove();
            }

            const response = await fetch("./src/views/onion.html");
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        
            var html = await response.text();
            html = html.replace('{onion_id}', this.id);
            html = html.replace('{pikmin_id}', this.pikmin.id);
            html = html.replace('{pikmin_upgrade}', this.pikmin.id_upgrade);
            html = html.replace('{nb_pikmin}', this.pikmin.nbPikmin.toString());
            const parseHtml = new DOMParser().parseFromString(html, "text/html")
            if (parseHtml.body.firstChild) {
                this.container.appendChild(parseHtml.body.firstChild);
                this.container.offsetHeight;
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }
}   