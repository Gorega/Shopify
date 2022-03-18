import {connectToDataBase} from "../../../../lib/db";
import { getSession } from "next-auth/react";

export default async function handler(req,res){
    if(req.method === "PATCH"){
        const {quantity,productName} = req.body;
        const client = await connectToDataBase();
        const session = await getSession({req})
        if(!session){
            client.close()
            return res.status(401).json({msg:"Unauthorized"});
        }

        const product = await client.db().collection("cart").findOneAndUpdate({user:session.user.name,product_name:productName},{
            $set:{product_quantity:quantity}
        });
        client.close();
        return res.status(200).json({product})
    }

}