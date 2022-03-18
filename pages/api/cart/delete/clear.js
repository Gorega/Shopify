import {connectToDataBase} from "../../../../lib/db";
import { getSession } from "next-auth/react";

export default async function handler(req,res){
    if(req.method === "DELETE"){
        const client = await connectToDataBase();
        const session = await getSession({req});
        if(!session){
            client.close();
            return res.status(401).json({msg:"Unathorized"});
        }

        const prodcuts = client.db().collection("cart").deleteMany({user:session.user.name});
        return res.status(200).json({msg:"Success"})
    }
}