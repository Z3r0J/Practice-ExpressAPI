import { Sequelize } from 'sequelize';

export const database = new Sequelize('products', 'root', 'Jeanp', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3308
});

export default database;