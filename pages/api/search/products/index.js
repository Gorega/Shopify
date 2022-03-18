import {products} from "../../../../public/products";

export default async function handler(req,res){
    if(req.method === "GET"){
        const {query} = req.query;
        const Products = products.filter((product)=> product.name.toLowerCase().includes(query.toLowerCase()));
        return res.status(200).json({Products});
    }
}