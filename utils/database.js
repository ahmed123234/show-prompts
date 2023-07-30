import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
    // set the mongoose options
    // if you don;t set it, then a warning will be shown on the console
    mongoose.set('strictQuery', true);

    // cheack if you are allready connected or not
    if (isConnected) {
        console.log("MongoDB is allready connected");
        return;
    }
    try{

        mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompts",
            useNewUrlParser:true,
            useUnifiedTopology: true,
        })
         
        isConnected = true;
        console.log("MongoDB connected");

    } catch (err) {
        console.error(err.message);

    }
}