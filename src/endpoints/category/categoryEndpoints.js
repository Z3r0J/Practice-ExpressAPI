import { Router } from 'express';

const categoryEndpoints = Router();

categoryEndpoints.get('/api/category', (req, res, next) => {
    res.json({ mensaje: 'OK: 200' });
});


export default categoryEndpoints;