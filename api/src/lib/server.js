import express from 'express';
import config from './config.js';


export const startServer = () => {

    const httpServer = express();
    const port = config.port;

    // Test rout for port config

    httpServer.get('/ping',(req,res)=>{
        console.log(`Ping route : ${req.url} ${Date.now()}`);
        res.status(200).json({
            message:'Ping successful',
        })
    })


    try {

        httpServer.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        throw new Error("Error starting server: " + error.message);
    }
    console.log("Start server function running...")
};