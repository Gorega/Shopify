import {connectToDataBase} from "../../../lib/db";
import {getSession} from "next-auth/react";

export default async function handler(req,res){
    if(req.method === "GET"){
        const client = await connectToDataBase();
        const session = await getSession({req})
        if(!session){
            client.close();
            return res.status(401).json({msg:"Unauthorized"});
        }
        const products = await client.db().collection("cart").find({user:session.user.name}).toArray();
        client.close();
        return res.status(200).json({result:products});  
    }
}