import mongoose from "mongoose";

export const ConnectDB = async (): Promise<void> => {
  try {
    const MONGODB_URI =
      "mongodb+srv://msantiagotrinidad_db_user:F3FTyqiK3ZhC0xz5@clusterv1.hexpin9.mongodb.net";

    mongoose.connection.on("open", () => {
      console.info("successfuly connect database:", MONGODB_URI);
    });

    await mongoose.connect(MONGODB_URI);

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    throw new Error(`Failed to connect to mongoDB: ${error}`);
  }
};
