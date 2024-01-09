import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'e_commerce',
    host: '127.0.0.1',
    username: 'root',
    password: 'Asdlkj@123',
    dialect: 'mysql',
});

export default sequelize;