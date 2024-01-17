import { AxiosResponse } from "axios";
import apiClient from "../api.client";
import { NEWS, ADDNEWS, DELNEWS } from "../api.constants";
import { NewsDetails } from "../../types";

export const getNews = async (): Promise<AxiosResponse<NewsDetails[]>> => {
  try {
    const response = await apiClient.get<NewsDetails[]>(NEWS);
    return response;
  } catch (error) {
    throw error;
  }
};

export const postNews = async (
  request: NewsDetails,
): Promise<AxiosResponse<NewsDetails>> => {
  try {
    const response = await apiClient.post<NewsDetails>(ADDNEWS, request);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteNews = async (
  newsId: number,
): Promise<AxiosResponse<void>> => {
  try {
    const deleteEndpoint = DELNEWS.replace("{:id}", newsId.toString());
    const response = await apiClient.delete<void>(deleteEndpoint);
    return response;
  } catch (error) {
    throw error;
  }
};
