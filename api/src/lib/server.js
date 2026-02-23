import express from 'express';
import config from './config.js';


export const startServer = () => {

    const httpServer = express();
    const port = config.port;


    try {

        console.log("Testing docker images...");

        console.log(`Port from .env = ${process.env.PORT}`)

        httpServer.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        throw new Error("Error starting server: " + error.message);
    }
    console.log("Start server function running...")
};