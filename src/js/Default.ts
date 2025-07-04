import { ObjectLocalStorageType, ObjectHTMLElementType, ObjectTreasureType, ObjectRarityRate } from "./Typage.js"

export const objectHTMLElement: ObjectHTMLElementType = {
    //Element Type
    vertical_touchspin_element_add: ".touchspin_element .addPikmin",
    vertical_touchspin_element_sub: ".touchspin_element .removePikmin",
    vertical_touchspin_element_input: ".touchspin_element input",

    // Gameplay
    gameplay_container: "#gameplay_content",
    idle_init_btn: "#start_idle",
    idle_progress_bar: "#idleProgressBar",
    idle_harvest_btn: "#harvest",
    idle_pikmin_animation: "#idle-animation",
    treasure_init_btn: "#start_treasure",
    treasure_container: "#treasure",
    treasure_search_btn: "#search_treasure",
    treasure_start_expedition_btn: "#start_treasure_expedition",
    treasure_information: "#treasure-information",
    treasure_information_name: "#treasure-information .name",
    treasure_information_get_time: "#treasure-information .get_time",
    treasure_information_weight: "#treasure-information .weight",
    treasure_information_reward: "#treasure-information .reward",
    treasure_information_rarity: "#treasure-information .rarity",

    //Onion
    onion: "#onion",
    onion_container: ".onionContainer",
    onion_unlock: "#onion_unlock",
    onion_select_btn: ".selectOnion",
    onion_nb_pikmin: ".nb_pikmin",
    onion_attack: ".attack",
    onion_attack_upgrade_btn: ".attack_upgrade",
    onion_life_point: ".life_point",
    onion_life_point_upgrade_btn: ".life_point_upgrade",
    onion_defense: ".defense",
    onion_defense_upgrade_btn: ".defense_upgrade",
    onion_image_container: ".onionImgContainer",

    //Global
    global_reset_btn: "#reset",
    global_gold_view: ".money"
}


export const objectRarityRate: ObjectRarityRate = {
    1: 78.39,      //78.39%
    2: 93.39,      //15%
    3: 98.39,      //5%
    4: 99.39,      //1%
    5: 99.89,      //0.5%
    6: 99.99,      //0.1%
    7: 100         //0.01%
}

export const objectTreasure: ObjectTreasureType = {
    capsule: {
        name: "Capsule",
        search_time: 12000,
        get_time: 10,
        weight: 10,
        reward: 2,
        rarity: 1
    },
    disk: {
        name: "Disk",
        search_time: 180000,
        get_time: 30,
        weight: 25,
        reward: 10,
        rarity: 2
    }
}

export const objectLocalStorage: ObjectLocalStorageType = {
    global: {
        money: 1000000,
        default_time_progress_bar: 10000
    },
    pikmin: {
        RedPikmin: {
            dynamic: {
                lock: 0,
                grow_time: 10000,
                attack: 3,
                life_point: 10,
                defense: 1,
            },
            static: {
                position: 1,
                unlock_cost: 500,
            }
        },
        YellowPikmin: {
            dynamic: {
                lock: 1,
                grow_time: 20000,
                attack: 1,
                life_point: 10,
                defense: 3,
            },
            static: {
                position: 2,
                unlock_cost: 1000,
            }
        },
        BluePikmin: {
            dynamic: {
                lock: 1,
                grow_time: 30000,
                attack: 1,
                life_point: 20,
                defense: 1,
            },
            static: {
                position: 3,
                unlock_cost: 2000,
            }
        },
        PurplePikmin: {
            dynamic: {
                lock: 1,
                grow_time: 50000,
                attack: 5,
                life_point: 30,
                defense: 5,
            },
            static: {
                position: 4,
                unlock_cost: 5000,
            }
        },
        WhitePikmin: {
            dynamic: {
                lock: 1,
                grow_time: 100000,
                attack: 1,
                life_point: 10,
                defense: 1,
            },
            static: {
                position: 5,
                unlock_cost: 10000,
            }
        },
    },
    onion: {
        red: {
            capacity: 10
        },
        yellow: {
            capacity: 10
        },
        blue: {
            capacity: 10
        },
        purple: {
            capacity: 10
        },
        white: {
            capacity: 10
        },
    },
    elementType: {
        progressBar: {
            timeProgressBar: 10
        }
    }
}