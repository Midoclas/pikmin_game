import { TreasureType } from "../../Typage";

export default interface TreasureActionInterface {
    container: HTMLElement|null;
    containerData: HTMLElement|null;

    getTreasure(): TreasureType|null;
    setTreasure(id_treasure: TreasureType|null): void;
    render(): void
    isFinished(): boolean;
    destructor(): Promise<void>;
}