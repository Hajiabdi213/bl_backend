import prisma from "./lib/index.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
});

// user signup

router.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, phone, email, password, picture } = req.body;

    //checking inputs
    if (!firstname) {
      return res.status(400).json("Enter the first name");
    } else if (!phone) {
      return res.status(400).json("Enter the last name");
    } else if (!password) {
      return res.status(400).json("Enter the password");
    }

    // check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json(`User with the email ${email} already exists`);
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user
    const newUser = await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        isActive: true,
        role: true,
        email: email,
        password: hashedPassword,
        picture: picture,
      },
    });

    if (!newUser) {
      return res.status(204).json("Something went wrong");
    }

    return res.status(200).json({
      message: "User created Successfully",
      user: newUser
    });
  } catch (error) {
    return res.status(404).json(error);
  }
});



// user login
router.post('/login', async(req, res)=>{
    const {email, password} = req.body
    try {
        // find if the user exists
        const user = await prisma.user.findUnique({where:{
            email:email
        }});
        // return message if the user was not found
        if(!user){
            return res.status(404).json({
                message:"User with the email ${email} does not exist"
            })
        }

        // compare the password 
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "invalid credentials"
            })
        }


        // create token
        const token = jwt.sign(
            {id:user.id, email:user.email},
            SECRET_KEY,
            {expiresIn:"1hr"}
            )

            return res.status(200).json({
                message: "User logged in successfully",
                token: token,
              });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
          });
    }
})

export default router;
