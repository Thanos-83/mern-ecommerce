import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.blue.underline);
  } catch (error) {
    console.log('mongo error');
    console.log(`Error: ${error.message}`.red.underline);
    process.exit(1);
  }
};

export default connectDB;
