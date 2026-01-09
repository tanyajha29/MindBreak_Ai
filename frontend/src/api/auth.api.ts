import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if needed
});

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data: RegisterPayload) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};
