import {connectToDataBase} from "../../../../lib/db";
import { getSession } from "next-auth/react";

export default async function handler(req,res){
    if(req.method === "DELETE"){
        const {productName} = req.query;
        const client = await connectToDataBase();
        const session = await getSession({req})
        if(!session){
            client.close();
            return res.status(401).json({msg:"Unauthorized"});
        }

        const product = await client.db().collection("cart").findOneAndDelete({user:session.user.name,product_name:productName});
        client.close();
        return res.status(200).json({msg:"deleted Successfuly"})
    }

}