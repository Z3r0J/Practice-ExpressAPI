import sequelize from 'sequelize';

export default function database() {
    return new sequelize('products', 'root', 'Jeanp', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3308
    })
}