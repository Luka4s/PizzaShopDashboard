import { env } from "@/env";
import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: env.VITE_API_URL,
});

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000));
    return config;
  });
}
