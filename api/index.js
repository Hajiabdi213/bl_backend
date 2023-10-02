import express, {json} from "express";
import usersRouter from './users.js'
import customersRouter from './customers.js'

const server = express();
server.use(json())
server.use('/api/users', usersRouter)
server.use('/api/customers', customersRouter)


export default server;