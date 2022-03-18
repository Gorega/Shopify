import nextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import {connectToDataBase} from "../../../lib/db";
import {compare} from "bcrypt";

export default nextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            async authorize(credentials){
                const client = await connectToDataBase();
                const user = await client.db().collection("users").findOne({email:credentials.email})
            
                if(!user){
                    throw new Error("email provided not registered")
                }

                const comparePassword = await compare(credentials.password,user.password)
                if(!comparePassword){
                    throw new Error("Incorrect email or password");
                }

                return{email:user.email,image:user.profileImg,name:user.username}
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
          })
    ]
})