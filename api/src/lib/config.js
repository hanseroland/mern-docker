export default {
    port: process.env.PORT || 3000,

    /**
     * Rest API config
     */

    api:{
        prefix:"/api"
    },

    /**
     * Switch routes on/off
     */
    routes:{
     default:true
    },

    mongo:{
        protocol:process.env.MONG0_PROTOCOL,
        username:process.env.MONGO_USERNAME,
        password:process.env.MONGO_PASSWORD,
        database:process.env.MONGO_DB_NAME,
        url:process.env.MONG0_URL
    }
};

