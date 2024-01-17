import { AxiosResponse } from "axios";
import apiClient from "../api.client";
import { LOGIN, LOGOUT } from "../api.constants";
import { LoginRequest, LoginResponse } from "../../types";

export const login = async (
  request: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const response = await apiClient.post<LoginResponse>(LOGIN, request);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<AxiosResponse<void>> => {
  try {
    const response = await apiClient.post<void>(LOGOUT, null);
    return response;
  } catch (error) {
    throw error;
  }
};
