export type Config = {
    [key: string]: {
        mongoURI: string;
        port: number;
        secretKey: string;
    };
};