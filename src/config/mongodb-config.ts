import { Config } from "../../types/configTypes";

const config: Config = {
    development: {
        mongoURI: 'mongodb+srv://anish42001:Asdlkj@cluster0.fiijnln.mongodb.net/?retryWrites=true&w=majority',
        port: 3000,
        secretKey: 'your_secret_key',
    },
    production: {
        mongoURI: '',
        port: 8080,
        secretKey: 'your_production_secret_key',
    },
};

export default config;