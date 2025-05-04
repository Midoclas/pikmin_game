export default interface TreasureActionInterface {
    initElementType(): void
    getTreasure(): string;
    setTreasure(id_treasure: string): void;
    render(): void
    isFinish(): boolean;
    destructor(): Promise<void>;
}