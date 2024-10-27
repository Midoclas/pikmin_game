import { defaultTimeProgressBar } from "./Default.js";
import ProgressBar from "./ElementsType/ProgressBar/ProgressBar.js"

export default class Idle extends ProgressBar {

    constructor() {
        let query = "idleProgressBar";
        super(query, defaultTimeProgressBar);        
        this.setProgressBar();
    }
}