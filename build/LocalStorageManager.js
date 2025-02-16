import { objectLocalStorage } from "./Default.js";
export default class LocalStorageManager {
    constructor() {
    }
    initStorage() {
        localStorage.setItem("is_game_exist", "1");
        this.initOnionStorage();
        this.initPikminStorage();
        this.initElementStorage();
        this.initGlobal();
    }
    reset() {
        localStorage.clear();
        window.location.reload();
    }
    initGlobal() {
        localStorage.setItem("money", objectLocalStorage.global.money.toString());
    }
    initOnionStorage() {
        Object.keys(objectLocalStorage.onion)
            .map((key) => {
            localStorage.setItem("onion_" + key, objectLocalStorage.onion[key].capacity.toString());
        });
    }
    initPikminStorage() {
        Object.keys(objectLocalStorage.pikmin)
            .map((key) => {
            localStorage.setItem("pikmin_" + key, objectLocalStorage.pikmin[key].default.toString());
            let lock = objectLocalStorage.pikmin[key].lock;
            if (lock) {
                localStorage.setItem("pikmin_" + key + "_lock", lock.toString());
            }
            localStorage.setItem("pikmin_" + key + "_grow_time", objectLocalStorage.pikmin[key].grow_time.toString());
            localStorage.setItem("pikmin_" + key + "_attack", objectLocalStorage.pikmin[key].attack.toString());
            localStorage.setItem("pikmin_" + key + "_defense", objectLocalStorage.pikmin[key].defense.toString());
            localStorage.setItem("pikmin_" + key + "_life_point", objectLocalStorage.pikmin[key].life_point.toString());
        });
    }
    initElementStorage() {
        localStorage.setItem("element_progress_bar_time_progress_bar", objectLocalStorage.elementType.progressBar.timeProgressBar.toString());
    }
}
