export default class Client {
    private readonly token: string;

    constructor({ token }: { token?: string }) {
        this.token = this.addToken(token);
    }

    private addToken(token?: string) {
        if (typeof token === "string") {
            return token;
        }

        throw new Error("Provided token must be of the type string.");
    }
}
