import { setupMongo } from "./mongo.js"

export const initializeApp = async (app,config)=>{
    // initialize mongoDB
    setupMongo(config)
    console.log(`# - MongoDB connected`)
}