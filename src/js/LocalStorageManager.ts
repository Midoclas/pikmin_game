import { objectLocalStorage } from "./Default.js";
import { PikminType } from "./Typage.js";

export default class LocalStorageManager {

    async initStorage() {
        this.initOnionStorage();
        this.initPikminStorage();
        this.initElementStorage();
        this.initGlobal();
        localStorage.setItem("is_game_exist", "1");
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
                localStorage.setItem("onion_"+key, objectLocalStorage.onion[key as keyof typeof objectLocalStorage.onion].capacity.toString());
            });
    }

    initPikminStorage() {
        Object.keys(objectLocalStorage.pikmin)
            .map((key) => {
                const pikminData = objectLocalStorage.pikmin[key as keyof PikminType];
                for (const data in pikminData.dynamic) {
                    const value = pikminData.dynamic[data as keyof typeof pikminData.dynamic];
                    localStorage.setItem("pikmin_" + key + "_" + data, value.toString());
                }
            });
    }

    initElementStorage() {
        localStorage.setItem("element_progress_bar_time_progress_bar", objectLocalStorage.elementType.progressBar.timeProgressBar.toString());
    }
}