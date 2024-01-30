import { Sequelize } from 'sequelize';
import envConfig from './env-config';

const sequelize = new Sequelize({
    database: 'e_commerce',
    host: '127.0.0.1',
    username: 'root',
    port: 3306,
    password: 'Asdlkj@123',
    dialect: 'mysql',
});

export default sequelize;