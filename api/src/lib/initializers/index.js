import { setupMongo } from "./mongo.js"
import { setupRoutes } from "./setupRoutes.js"

export const initializeApp = async (app,config)=>{
    // initialize mongoDB
    setupMongo(config)
    console.log(`# - MongoDB connected`)


    // setup express router
    setupRoutes(app);

    console.log("## - express router setup complete")
}