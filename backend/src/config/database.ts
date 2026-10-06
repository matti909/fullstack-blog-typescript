import mongoose from "mongoose";

const ConnectDB = async (): Promise<void> => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("Missing MONGODB_URI");
    }

    mongoose.connection.on("open", () => {
      console.info("successfuly connect database, port:", process.env.PORT);
    });

    await mongoose.connect(MONGODB_URI);

    process.on("SIGINT", () => {
      void (async () => {
        await mongoose.connection.close();
        process.exit(0);
      })();
    });
  } catch (error) {
    throw new Error("Failed to connect to mongoDB", { cause: error });
  }
};

export { ConnectDB };
