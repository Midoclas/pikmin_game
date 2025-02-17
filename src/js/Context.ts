export default class Context {
    static #instance: Context;
    money = 0;

    private constructor() {
        this.initStorage();
    }

    public static get instance(): Context {
        if (!Context.#instance) {
            Context.#instance = new Context();
        }

        return Context.#instance;
    }

    initStorage() {
        let moneyStoredValue = localStorage.getItem("money");
        if (moneyStoredValue !== null) {
            this.setMoney(parseInt(moneyStoredValue));
        }
    }

    save(id: string, value: string) {
        localStorage.setItem(id, value);
    }

    getMoney(): number {
        return this.money;
    }

    setMoney(value: number) {
        this.money = value;
        this.save("money", this.money.toString());
    }

    addMoney(value: number) {
        this.money += value;
        this.save("money", this.money.toString());
    }
}