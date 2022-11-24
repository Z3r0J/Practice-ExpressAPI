import express from 'express';
import categoryEndpoints from './src/endpoints/category/categoryEndpoints.js';

const app = express();

const PORT = 5147;

app.use(categoryEndpoints);
app.listen(PORT);

console.log(`Server Listen on localhost:${PORT}`);