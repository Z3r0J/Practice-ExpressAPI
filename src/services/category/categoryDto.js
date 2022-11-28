import { INTEGER, STRING, TEXT } from "sequelize";
import { database } from "../../database/database.js"

export const categoryDTO = database.define('category', {
    Id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: STRING,
        allowNull: false
    },
    Description: {
        type: TEXT,
        allowNull: false
    }
});