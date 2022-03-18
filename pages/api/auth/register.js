import {connectToDataBase} from "../../../lib/db";
import {hash} from "bcrypt"

export default async function handler(req,res){
    if(req.method === "POST"){
        const {username,email,password,confirmPassword} = req.body;
        const client = await connectToDataBase();

        if(!username || !email || !password || !confirmPassword){
            client.close();
            return res.status(422).json({msg:"fields should not be empty"})
        }

        if(password.length < 8){
            client.close();
            return res.status(422).json({msg:"password should not be less than 8 characters"})
        }

        if(password !== confirmPassword){
            client.close();
            return res.status(422).json({msg:"password should match"})
        }

        const hashedPassword = await hash(password,10);

        const existUser = await client.db().collection("users").findOne({email:email})

        if(existUser){
            client.close();
            return res.status(422).json({msg:"user already exist"})
        }
        
        const user = await client.db().collection("users").insertOne({
            username,
            email,
            password:hashedPassword,
            confirmPassword:hashedPassword,
            profileImg:"https://gecs.heavyindustries.gov.in/assets/site/main/images/002-man.png",
        })

        client.close();
        return res.status(201).json({user})
    }
}