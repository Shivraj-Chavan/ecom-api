import mongoose from "mongoose";


const connectToMongo=async()=>{

    try{
        
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`connection to db is done`);
    }catch(error){
        console.log(`connection to db failed`)
        process.exit(1);
    }
}

export default connectToMongo