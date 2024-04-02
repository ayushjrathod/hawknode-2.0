import "dotenv/config";
import mongoose from "mongoose";


// //Database connection
// mongoose
//   .connect(
//     process.env.DBURL
//   )
//   .then(() => {
//     console.log("Database Connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

  //Use try/catch when async and await is needed
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