import "dotenv/config";
import mongoose from "mongoose";


const dbConnect = async ()=>{
    try{
        await mongoose.connect(process.env.DBURL);
        console.log("db connection successfull");
    }
    catch(error){
        console.log("Mongoose Connection failed",error);
    }
}

export default dbConnect;