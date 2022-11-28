import { DATE, DECIMAL, INTEGER, STRING } from "sequelize";
import { database } from "../../database/database.js";

export const productsDto = database.define('products', {
    Id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: STRING,
        allowNull: false
    },
    Price: {
        type: DECIMAL(18, 2),
        allowNull: false
    },
    ExpireDate: {
        type: DATE,
        allowNull: false
    },
})