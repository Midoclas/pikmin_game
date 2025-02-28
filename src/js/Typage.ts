import Pikmin from "./Pikmin/Pikmin";

export type ObjectHTMLElementType = {
    [key: string]: string;
}

export type ObjectTreasureType = {
    [key: string]: {
        name: string;
        value: number;
        weight: number;
        duration_time: number;
    }
}

export type GlobalType = {
    money: number;
    default_time_progress_bar: number;
}

export type PikminType = {
    [key: string]: {
        dynamic: {
            grow_time: number;
            attack: number;
            defense: number;
            life_point: number;
            lock: number;
        },
        static: {
            position: number;
            unlock_cost: number;
        }
    };
};

export type OnionType = {
    [key: string]: { capacity: number };
};
export type ElementType = {
    progressBar: { timeProgressBar: number };
};

export type ObjectLocalStorageType = {
    global: GlobalType;
    pikmin: PikminType;
    onion: OnionType;
    elementType: ElementType;
};

export type mappingPikminType = {
    [key: string]: Pikmin
}