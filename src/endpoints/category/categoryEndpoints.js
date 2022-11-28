import { Router } from 'express';
import { categoryDTO } from '../../services/category/categoryDto.js';
import { createCategory, getAllCategory, getByIdCategory } from '../../services/category/categoryService.js';

const categoryEndpoints = Router();

categoryEndpoints.get('/api/category', async (req, res, next) => {
    const allCategory = await getAllCategory();

    !allCategory ? res.status(404).json({ message: "No hay categorias actualmente" }) : res.status(200).json(allCategory);

});

categoryEndpoints.get('/api/category/:id', async (req, res, next) => {
    const id = Number(req.params.id).toString() !== 'NaN' ? req.params.id : 0;

    if (id == 0) {
        res.statusCode = 400;
        return res.json({ message: "El id debe ser un numero mayor que 0 y no debe contener letras" })
    }

    const categoryById = await getByIdCategory(id);

    if (categoryById) {
        return res.json(categoryById);
    }

    res.statusCode = 400;
    return res.json({ message: "No se encontro ninguna categoria con ese id" });

})

categoryEndpoints.post('/api/category', async (req, res, next) => {

    console.log(req.body);

    const categoryName = req.body?.name || req.body?.Name;
    const categoryDescription = req.body?.description || req?.body.Description;

    if (!categoryName) {
        res.statusCode = 400;
        return res.json({ message: "Name is required." });
    }

    if (!categoryDescription) {
        res.statusCode = 400;
        return res.json({ message: "Description is required" });
    }

    const created = await createCategory({ categoryName, categoryDescription });
    if (created) {
        res.statusCode = 201;

        return res.json({ message: "Creado correctamente" });
    }

})


export default categoryEndpoints;