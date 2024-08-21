import express from 'express';
import 'dotenv/config.js';
import dbConnection from '../database/config.js';
import { getEmployees, postEmployee, putEmployee, deleteEmployee } from '../controllers/employeeController.js';

export default class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.dbConnect();
        this.pathEmployee = '/api/employee';
        this.route();
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }

    async dbConnect() {
        await dbConnection();
    }

    route() {
        this.app.use(express.json());
        this.app.get(this.pathEmployee, getEmployees);
        this.app.post(this.pathEmployee, postEmployee);
        this.app.put(this.pathEmployee, putEmployee);
        this.app.delete(this.pathEmployee + '/:id', deleteEmployee);
    }
}
