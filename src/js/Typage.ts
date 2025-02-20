import Pikmin from "./Pikmin/Pikmin";

export type GlobalType = {
    money: number;
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