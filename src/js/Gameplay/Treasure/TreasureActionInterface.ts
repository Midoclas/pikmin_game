import { TreasureType } from "../../Typage";

export default interface TreasureActionInterface {
    initElementType(): void
    getTreasure(): TreasureType|null;
    setTreasure(id_treasure: TreasureType|null): void;
    render(): void
    renderTreasureInformation(): void
    isFinished(): boolean;
    destructor(): Promise<void>;
}