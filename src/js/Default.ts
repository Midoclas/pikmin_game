import { ObjectLocalStorageType } from "./Typage"

export const objectLocalStorage: ObjectLocalStorageType = {
    global: {
        money: 1000000
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