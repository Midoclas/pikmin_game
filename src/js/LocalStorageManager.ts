import { objectLocalStorage } from "./Default.js";

export default class LocalStorageManager {

    constructor() {
        
    }

    initStorage() {
        localStorage.setItem("is_game_exist", "1");
        this.initOnionStorage();
        this.initPikminStorage();
        this.initElementStorage();
    }

    reset() {
        localStorage.clear();
        window.location.reload();
    }

    initOnionStorage() {
        Object.keys(objectLocalStorage.onion)
            .map((key) => {
                localStorage.setItem("onion_"+key, objectLocalStorage.onion[key as keyof typeof objectLocalStorage.onion].capacity.toString());
            });
    }

    initPikminStorage() {
        Object.keys(objectLocalStorage.pikmin)
            .map((key) => {
                localStorage.setItem("pikmin_"+key, objectLocalStorage.pikmin[key as keyof typeof objectLocalStorage.pikmin].default.toString());
                let lock = objectLocalStorage.pikmin[key as keyof typeof objectLocalStorage.pikmin].lock;
                if (lock) {
                    localStorage.setItem("pikmin_"+key+"_lock", lock.toString());
                }
                localStorage.setItem("pikmin_"+key+"_grow_time", objectLocalStorage.pikmin[key as keyof typeof objectLocalStorage.pikmin].grow_time.toString());
            });
    }

    initElementStorage() {
        localStorage.setItem("element_progress_bar_time_progress_bar", objectLocalStorage.elementType.progressBar.timeProgressBar.toString());
    }
}