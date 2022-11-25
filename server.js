import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import { mainRouter } from "./mainRoute.js"

const app = express()


app.use(cors())
app.use(express.json())


app.use("/", mainRouter)

const start = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://user:user@cluster0.gjm6c.mongodb.net/max?retryWrites=true&w=majority")
        app.listen(process.env.PORT || 5000, "127.0.0.1", ()=> {
            console.log("Сервер начал работу")
        })
    } catch(err) {
        console.log(err)
    }
}
start()