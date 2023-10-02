import prisma from "./lib/index.js";
import express from 'express'
import authenticate from "./middleware/authenticate.js";
const router = express.Router()


// get all customers
router.get('/',authenticate, async (req, res)=>{
    try {
        const customers  = await prisma.customer.findMany()

        if(!customers){
            return res.status(404).json({
                message: "there is no any customer available"
            })
        }
        return res.status(200).json({
            message:"All Customers: ",
            customers:customers
        })
    } catch (error) {
        
    }
})

// creating a customer
router.post('/', authenticate, async (req, res)=>{
    const {firstname, email} = req.body
    try {
        if(!firstname){
            return res.status(400).json("Enter firstname")
        }else if(!email)
        {
            return res.status(400).json("Enter email")

        }

        const customer = await prisma.customer.create({
            data:req.body
        })
        if(!customer){
            return res.status(400).json("something went wrong!")
        }

        return res.status(201).json({
            message:"customer has been created successfully",
            customer: customer
        })
    
    } catch (error) {
        return res.status(error)
    }
})

export default router;