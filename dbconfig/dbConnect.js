// db.js
import mongoose from 'mongoose';
// import logger from './Logger/Logger.js'; // Adjust the path as needed
// mongodb://superadmin:draTOstLV3Sp0VokIzlv@31.220.89.68:27017/audit_log_DB?authSource=admin
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error('MongoDB Connection Error', { error });
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;