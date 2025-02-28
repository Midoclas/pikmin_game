import TreasureAction from "./TreasureAction";

export default class TreasureGetting implements TreasureAction {

    id_treasure: string;

    constructor(id_treasure: string) {
        this.validateTreasure(id_treasure);
        this.id_treasure = id_treasure;
    }

    validateTreasure(id_treasure: string) {
        if (id_treasure.length === 0) {
            throw new Error(`TreasureGetting is call with an empty treasure id`);
        }
    }
}