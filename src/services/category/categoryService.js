import { categoryDTO } from "./categoryDto.js";

export const getAllCategory = async () => {
    const category = [];
    await categoryDTO.findAll({ include: ["products"] }).then(c => { return c.map(cat => category.push(cat.dataValues)) })
    console.log(category);
    return category;
}

export const getByIdCategory = async (id) => {
    let category = null;

    await categoryDTO.findByPk(id, { include: ["products"] }).then((c) => category = c ? c.dataValues : null);

    return category;
}

export const createCategory = async (category) => {
    let success = false;
    console.log(category);
    await categoryDTO.create({
        Name: category.categoryName,
        Description: category.categoryDescription
    }).then(() => { success = true }).catch(() => { success = false });

    return success;
}

export const updateCategory = async (category, id) => {
    let success = false;
    await categoryDTO.update({ Name: category.categoryName, Description: category.categoryDescription }, { where: { Id: id } })
        .then(() => { success = true })
        .catch(() => { success = false });

    return success;
}