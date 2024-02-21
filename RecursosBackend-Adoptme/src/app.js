import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

import __dirname from './utils/index.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(`mongodb+srv://darkness:darkness@darkness.aqwkhfa.mongodb.net/adoptme?retryWrites=true&w=majority`)
const swaggerOptions={
    definition:{
        openapi:"3.0.1",
        info:{
            title:"Api para adoptar perros",
            definition:"Documentacion que muestra todo lo que se puede hacer con AdoptMe"
        }
    },
    apis:[process.cwd()+'/docs/users/users.yalm'],
}
console.log("why")
//console.log(`${process.cwd()}/docs/**/*.yalm`)
const spec=swaggerJsdoc(swaggerOptions)
app.use("/api",swaggerUi.serve,swaggerUi.setup(spec))
console.log(swaggerOptions)
console.log(spec)
app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
