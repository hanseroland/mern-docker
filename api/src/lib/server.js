import express from 'express';
import config from './config.js';
import { setupRoutes } from './setupRoutes.js';
import { initializeApp } from './initializers/index.js';


export const startServer = async () => {

    const app = express();
    const port = config.port;

    setupRoutes(app);

     await initializeApp(app);


    try {

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        throw new Error("Error starting server: " + error);
    }

};