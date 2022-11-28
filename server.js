import express from 'express';
import { database } from './src/database/database.js';
import categoryEndpoints from './src/endpoints/category/categoryEndpoints.js';
import cors from 'cors'
import relationships from './src/database/relationships.js';
import bodyParser from 'body-parser'

const app = express();

const PORT = 5147;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(categoryEndpoints);
app.use(cors());
app.listen(PORT);

relationships();
database.sync({}).then(() => console.log('Database ready!')).catch(err => console.log(err));

console.log(`Server Listen on localhost:${PORT}`);