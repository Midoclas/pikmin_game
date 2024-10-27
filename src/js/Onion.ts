import Pikmin from "./Pikmin";

export default class Onion {
    
    capacity: number;
    pikmin: Pikmin;

    constructor(pikmin: Pikmin) {
        this.capacity = 0;
        this.pikmin = pikmin;
    }
}