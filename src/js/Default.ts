import { ObjectLocalStorageType } from "./Typage"

export const objectLocalStorage: ObjectLocalStorageType = {
    global: {
        money: 3500
    },
    pikmin: {
        pikmin_red: {
            dynamic: {
                lock: 0,
                grow_time: 10,
                attack: 3,
                life_point: 10,
                defense: 1,
            },
            static: {
                position: 1,
                unlock_cost: 1000,
            }
        },
        pikmin_yellow: {
            dynamic: {
                lock: 1,
                grow_time: 20,
                attack: 1,
                life_point: 10,
                defense: 3,
            },
            static: {
                position: 2,
                unlock_cost: 1000,
            }
        },
        pikmin_blue: {
            dynamic: {
                lock: 1,
                grow_time: 30,
                attack: 1,
                life_point: 20,
                defense: 1,
            },
            static: {
                position: 3,
                unlock_cost: 1000,
            }
        },
        pikmin_purple: {
            dynamic: {
                lock: 1,
                grow_time: 50,
                attack: 5,
                life_point: 30,
                defense: 5,
            },
            static: {
                position: 4,
                unlock_cost: 1000,
            }
        },
        pikmin_white: {
            dynamic: {
                lock: 1,
                grow_time: 100,
                attack: 1,
                life_point: 10,
                defense: 1,
            },
            static: {
                position: 5,
                unlock_cost: 1000,
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