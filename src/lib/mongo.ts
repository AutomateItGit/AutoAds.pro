import mongoose from 'mongoose';



const MONGODB_URI : string | undefined = process.env.MONGODB_URI;

if(!MONGODB_URI){
    console.log("Error while trying to connect to the database");
    throw new Error("Mongodb_uri is not defined in the env file. Pls provide one.");
}


interface MongooseCache{
    conn : typeof mongoose |null;
    promise : Promise<typeof mongoose> | null;
}

declare global {
    var mongoose : MongooseCache | undefined;
}

const cached = global.mongoose || {conn:null, promise : null};

if(!global.mongoose){
    global.mongoose = cached;
}

async function connectDB() : Promise<typeof mongoose>{

    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        const opts ={
            bufferCommands : false,    // Disable mongooseBuferring
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds  
        
            minPoolSize: 2, // Maintain a minimum of 2 socket connections
            maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
        };        
        
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            return mongoose;
        })
    }

    try{
        cached.conn = await cached.promise;
    }
    catch (e){
        cached.promise = null;
        throw e;
    }

    return cached.conn;

}

export default connectDB;