import { categoryDTO } from "../services/category/categoryDto.js";
import { productsDto } from "../services/products/productsDto.js";


export default function relationships() {
    categoryDTO.hasMany(productsDto, {
        onDelete: 'cascade',
        as: 'products',
        foreignKey: 'categoryId'
    });

    productsDto.belongsTo(categoryDTO, {
        foreignKey: 'categoryId',
        as: 'category'
    });
}