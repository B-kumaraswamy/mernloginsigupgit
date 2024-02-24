import express  from "express";
import product from "../models/productschema.js";

const  ProductRouter = express.Router()

ProductRouter.use(express.json())

ProductRouter.post('/', async (req, res) => {
    

    try {
        console.log('req received as',  req.body)
    const {id, title, price, vendor, imageUrl} = req.body
    console.log('product id is', id)
        const existingProduct = await product.findOne({id : id})
        if(!existingProduct) {
            const details = new product({id : id, title : title, price : price, vendor : vendor, imageUrl : imageUrl})
    
            await details.save().then(() => console.log('product added to db successfully'))
    
            return res.status(200).json({status : 200, message : 'product added to db successfully'})
    
        }
    
        else {
            return res.status(400).json({status : 400, message : 'product already exist in the db'})
        }
    
    }

    catch(err) {
        console.log('error while adding to the db', err)

        return res.json({message : err})
    }

    
})


export default  ProductRouter;