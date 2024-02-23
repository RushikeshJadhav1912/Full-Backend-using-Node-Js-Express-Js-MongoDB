
const app = require("./app");

const dotenv = require("dotenv");

//config
dotenv.config({path:"backend/config/config.env"})

//Connecting database
const connectDatabase=require("./config/database")

connectDatabase()






app.listen(process.env.PORT,()=>{
    console.log(`Servers is working on http://localhost:${process.env.PORT}`)
})