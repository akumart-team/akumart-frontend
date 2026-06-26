import axiosInstance from "./axiosInstance";
import type { LoginResponse } from "../utils/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  role: "buyer" | "seller";
  // Optional fields — add when backend provides them
  business_name?: string;
  business_type?: string;
  state?: string;
  city?: string;
  waste_categories?: string[];
  monthly_volume?: string[];
  logistics_preference?: string[];
  production_description?: string
}

export interface RegisterResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "buyer" | "seller";
  is_verified: boolean;
  created_at: string;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    payload
  );
  return response.data;
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>(
    "/auth/register",
    payload
  );
  return response.data;
};