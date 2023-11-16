import mongoose from "mongoose";
import { Server } from "socket.io";


const connectDB = async (server) => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB connected: ${conn.connection.host}`);
      const db = conn.connection.db;

      const io = new Server(server,{
        cors : {
          origin : "http://localhost:5000",
        }
      });
      

      //return db;
      const collections = await db.listCollections().toArray();
      collections.forEach(async (collection) => {
        const changeStream = db.collection(collection.name).watch();
        changeStream.on("change", async (change) => {
            console.log(change);
          const updatedDocument = await db
            .collection(collection.name)
            .findOne({ _id: change.documentKey._id });
          console.log(updatedDocument);

           // Emit changes to connected clients via Socket.IO
        io.emit('databaseChange', { collection: collection.name, updatedDocument });
        });
      });

      return db;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }

    
};

export default connectDB;
