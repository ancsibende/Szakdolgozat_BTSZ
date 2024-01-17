import { AxiosResponse } from "axios";
import apiClient from "../api.client";
import { USER_MANAGEMENT, TEAMS } from "../api.constants";
import { User } from "../../types";

export const addUser = async (request: User): Promise<AxiosResponse<User>> => {
  try {
    const response = await apiClient.post<User>(USER_MANAGEMENT, request);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (
  username: string,
): Promise<AxiosResponse<void>> => {
  try {
    const response = await apiClient.delete<void>(USER_MANAGEMENT, {
      data: username,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTeams = async (): Promise<{
  Male: string[];
  Female: string[];
}> => {
  try {
    const response = await apiClient.get<{ Male: string[]; Female: string[] }>(
      TEAMS,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (): Promise<AxiosResponse<User[]>> => {
  try {
    const response = await apiClient.get<User[]>(USER_MANAGEMENT);
    return response;
  } catch (error) {
    throw error;
  }
};

export const modifyUser = async (
  username: string,
  modifiedUser: User,
): Promise<AxiosResponse<User>> => {
  try {
    const response = await apiClient.put<User>(
      `${USER_MANAGEMENT}/${username}`,
      modifiedUser,
      {},
    );
    return response;
  } catch (error) {
    throw error;
  }
};
