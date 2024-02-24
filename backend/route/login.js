import express from 'express';
import Loginuser from '../models/loginschema.js';
import jwt from 'jsonwebtoken'

const LoginRouter = express.Router()

LoginRouter.use(express.json())

LoginRouter.post('/', async (req, res) => {
    const {username, password} = req.body 
    const jwt_secret = 'abcdefg'

    try {
        const existinguser = await Loginuser.findOne({username : username, password : password})

        if (existinguser) {
            const token = jwt.sign({username : username},jwt_secret)
            return res.status(200).json({status : 200, message : 'Logged-in successfully', jwt_token : token})

        }
    
        else {
            return res.status(401).json({status : 401, message : "Invalid credentials"})
        }
    
    }

    catch(err) {
        console.log('error while logging in', err)
        return res.json({message : err})
    }

   

    

})


export default LoginRouter; 