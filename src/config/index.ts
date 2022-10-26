import { config } from "dotenv";

config();

export const mongooseUri = process.env.MONGOOSE_URI;
