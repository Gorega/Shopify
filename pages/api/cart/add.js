import {connectToDataBase} from "../../../lib/db";
import {getSession} from "next-auth/react";

export default async function handler(req,res){
    if(req.method === "POST"){
        const client = await connectToDataBase();
        const session = await getSession({req});
        if(!session){
            client.close();
            return res.status(401).json({msg:"Unauthorized"});
        }

        const {product_img,product_name,product_color,product_price,product_quantity} = req.body;
        const savedProduct = await client.db().collection("cart").findOne({user:session.user.name,product_name:product_name});
        if(savedProduct){
            client.close();
            return res.status(422).json({msg:"Product is already exist"})
        }

        const savedProducts = await client.db().collection("cart").countDocuments({user:session.user.name});
        if(savedProducts >= 6){
            client.close();
            return res.status(422).json({msg:"You have reached the limit of saved products"})
        }
        
        const product = await client.db().collection("cart").insertOne({
            user:session.user.name,
            product_img,
            product_name,
            product_color,
            product_price,
            product_quantity
        })
        client.close();
        return res.status(201).json({product})
    }

}