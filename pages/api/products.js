import { mongooseConnect } from "@/lib/mongooseConnect"
import { Product } from "@/models/Product"

export default async function handle(req, res) {
    const {method} = req
    await mongooseConnect()

    if(method == 'GET'){
        res.json(await Product.find())
    }

    if(method == 'POST'){
        const {title, description, price} = req.body
        await Product.create({
            title,description,price     
        })
        res.json({message: 'Product created'})
    }
}