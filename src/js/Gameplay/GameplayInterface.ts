export default interface GameplayInterface {
    gameplayContainer: null|HTMLElement;
    destructor(): Promise<void>;
}