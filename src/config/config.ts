
import 'dotenv/config';

export class Config {
    constructor() {}

    static get<T extends string | number | boolean>(key: string): T {
        return process.env[key] as T;
    }
}