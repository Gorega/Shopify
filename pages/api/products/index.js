import {connectToDataBase} from "../../../lib/db";

export default async function handler(req,res){
    if(req.method === "GET"){
        let {name,company,category,price,colors,shipping} = req.query;
        const queryObject = {};
        if(name){
            queryObject.name = {$regex:name,$options:"i"}
        }
        if(company){
            queryObject.company = company;
        }
        if(category){
            queryObject.category = category;
        }
        if(colors){
            colors = "#" + colors.substring(0)
            queryObject.colors = {$all:[colors]}
        }
        if(price){
            queryObject.price = {$lt:Number(price)}
        }
        if(shipping){
            queryObject.shipping = {$exists:shipping}
        }
        const client = await connectToDataBase();
        const products = await client.db().collection("products").find(queryObject).sort({price:1}).toArray();
        return res.status(200).json(products);
    }
}