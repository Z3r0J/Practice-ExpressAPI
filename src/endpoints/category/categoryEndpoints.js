import { Router } from 'express';
import { createCategory, getAllCategory, getByIdCategory, updateCategory } from '../../services/category/categoryService.js';
import { validationResult, body } from 'express-validator';


const categoryEndpoints = Router();

categoryEndpoints.get('/api/category', async (req, res, next) => {
    const allCategory = await getAllCategory();

    !allCategory ? res.status(404).json({ message: "No hay categorias actualmente" }) : res.status(200).json(allCategory);

});

categoryEndpoints.get('/api/category/:id', async (req, res, next) => {
    const id = Number(req.params.id).toString() !== 'NaN' ? req.params.id : 0;

    if (id == 0) {
        res.statusCode = 400;
        return res.status(400).json({ message: "El id debe ser un numero mayor que 0 y no debe contener letras" })
    }

    const categoryById = await getByIdCategory(id);

    if (categoryById) {
        return res.status(200).json(categoryById);
    }

    res.statusCode = 404;
    return res.status(404).json({ message: "No se encontro ninguna categoria con ese id" });

});

categoryEndpoints.post('/api/category', [body("name" || "Name").trim().not().isEmpty().withMessage("Name is required"), body("description" || "Description").trim().not().isEmpty().withMessage("Description is required")], async (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect");
        error.statusCode = 422;
        error.data = validationResult(req).array();
        return res.status(422).json(error);
    }

    const categoryName = req.body?.name || req.body?.Name;
    const categoryDescription = req.body?.description || req?.body.Description;

    const created = await createCategory({ categoryName, categoryDescription });
    if (created) {
        res.statusCode = 201;

        return res.status(201).json({ message: "Creado correctamente" });
    }

});

categoryEndpoints.put('/api/category', [body("name" || "Name").trim().not().isEmpty().withMessage("Name is required"), body("description" || "Description").trim().not().isEmpty().withMessage("Description is required"), body("id" || "Id").trim().not().isEmpty().withMessage("Id is required")], async (req, res, next) => {

    if (!validationResult(req).isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect");
        error.statusCode = 422;
        error.data = validationResult(req).array();
        return res.status(422).json(error);
    }

    const categoryName = req.body.name || req.body.Name;
    const categoryDescription = req.body.description || req.body.Description;

    const Id = Number(req.body.id || req.body.Id).toString() !== 'NaN' ? Number(req.body.id) : 0;

    if (Id == 0) {
        res.statusCode = 400;
        return res.status(400).json({ message: "El id debe ser un numero mayor que 0 y no debe contener letras" })
    }

    console.log(Id)

    const exist = await getByIdCategory(Id);

    if (exist) {

        const wasSuccess = await updateCategory({ categoryName, categoryDescription }, Id);
        if (wasSuccess) {
            return res.status(204).json();
        }

        return res.status(500).json({ message: "Something went wrongs..." })
    }

    return res.status(404).json({ message: "The category was not found" })
});


export default categoryEndpoints;