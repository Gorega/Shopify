import { MongoClient } from "mongodb";

export async function connectToDataBase(){
const connect = await MongoClient.connect(process.env.DB_CONNECTION_STRING)
return connect;
}