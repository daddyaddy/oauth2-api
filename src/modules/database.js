import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

class Database {
  mongoMemoryServer;
  connection;
  mongoDevUri = process.env.api_timeqube_online_db_uri;
  constructor() {}

  run = async () => {
    if (process.env.NODE_ENV !== "production") {
      this.mongoMemoryServer = await MongoMemoryServer.create();
      this.mongoDevUri = this.mongoMemoryServer.getUri();
    }
    await this.connect();
  };

  getStatus = () => {
    return mongoose.connection.readyState;
  };

  getConnection = () => {
    return this.connection;
  };

  getMongoUri = () => {
    return this.mongoDevUri;
  };

  async connect() {
    if (this.getStatus() === 1) return;
    if (this.getStatus() === 2) return;

    const mongoUri = this.getMongoUri();
    mongoose.Promise = global.Promise;
    try {
      global.log("Database connecting...");
      this.connection = await mongoose.connect(mongoUri, {
        useUnifiedTopology: true,
      });
      global.log("Database connected succesfully");
    } catch (error) {
      global.err("Database connection failed");
      console.log(error);
    }
  }

  async truncate() {
    if (!mongoose.connection.readyState) return;
    if (process.env.NODE_ENV !== "test") return;
    console.log("Database truncate collections...", process.env.NODE_ENV);

    const { collections } = mongoose.connection;
    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({})
    );
    await Promise.all(promises);
  }

  async disconnect() {
    if (!mongoose.connection.readyState) return;
    console.log("Database disconnecting...", process.env.NODE_ENV);

    await mongoose.disconnect();
  }
}

export default new Database();
