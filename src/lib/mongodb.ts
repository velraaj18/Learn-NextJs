import mongoose from "mongoose";

const mongoDbURI = process.env.MONGODB_URI as string;

var cached = (global as any).mongoose 

if(!cached){
    cached = (global as any).mongoose = {conn : null, promise : null}
}

export async function connectDB() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        await mongoose.connect(mongoDbURI, {
            bufferCommands : false
        }).then((mongoose) => {
            console.log("DB Connected");
            return mongoose;
        }).catch((err) => {
            console.log(err);
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}