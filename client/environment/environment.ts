import dotenv from "dotenv";
import { env } from "process";

dotenv.config();

const { LOCAL_API_URL, API_URL, ENV } = env;

let apiUrl: string;

if (ENV === "dev") {
  apiUrl = LOCAL_API_URL?.toString() as string;
} else {
  apiUrl = API_URL?.toString() as string;
}

// Remove it after Solve the environment Issue
apiUrl = "https://mern-ecommerce-app-api-wt3c.onrender.com/";

export { apiUrl };
