// @ts-ignore
import Cookies from "js-cookie";
import axios from "axios";
import { useRequestError } from "@/hooks/useRequestError";
const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const axios_ = axios.create({
  baseURL: BASE_API_URL,
  timeout: 20000, // 10 soniya timeout
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
});

// Interceptors qo'shish
axios_.interceptors.response.use(
  (response) => response,
  (error) => {
    useRequestError()
  }
);

export default axios_;
