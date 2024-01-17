import { AxiosResponse } from "axios";
import apiClient from "../api.client";
import {
  ADDEVENT,
  ADDRESULT,
  DELEVENT,
  EDITRESULT,
  EVENTS,
  GETEVENTWRESULTSMALE,
  GETEVENTWRESULTSFEMALE,
  UPLOADIMAGE,
  GETIMAGE,
} from "../api.constants";
import { Event, Result } from "../../types";

export const getEvents = async (): Promise<AxiosResponse<Event[]>> => {
  try {
    const response = await apiClient.get<Event[]>(EVENTS);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addEvent = async (
  request: Event,
): Promise<AxiosResponse<Event>> => {
  try {
    const response = await apiClient.post<Event>(ADDEVENT, request);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (
  eventId: number,
): Promise<AxiosResponse<void>> => {
  try {
    const deleteEndpoint = DELEVENT.replace("{:id}", eventId.toString());
    const response = await apiClient.delete<void>(deleteEndpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

export const postHomeEvents = async (
  teamName: string,
): Promise<AxiosResponse<Event[]>> => {
  try {
    const response = await apiClient.post<Event[]>(`events/${teamName}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addResultsToEvent = async (
  eventId: number,
  resultList: Result[],
): Promise<AxiosResponse<void>> => {
  try {
    const addResultEndpoint = ADDRESULT.replace("{:id}", eventId.toString());
    const response = await apiClient.post<void>(addResultEndpoint, resultList);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editResult = async (
  eventId: number,
  resultList: Result[],
): Promise<AxiosResponse<void>> => {
  try {
    const editResultEndpoint = EDITRESULT.replace("{:id}", eventId.toString());
    const response = await apiClient.put<void>(editResultEndpoint, resultList);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getEventsWithResultsFemale = async (): Promise<
  AxiosResponse<Event[]>
> => {
  try {
    const response = await apiClient.get<Event[]>(GETEVENTWRESULTSFEMALE);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getEventsWithResultsMale = async (): Promise<
  AxiosResponse<Event[]>
> => {
  try {
    const response = await apiClient.get<Event[]>(GETEVENTWRESULTSMALE);
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (
  eventId: number,
  file: File,
): Promise<AxiosResponse<void>> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<void>(
      `${UPLOADIMAGE.replace("{:id}", eventId.toString())}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getImage = async (eventId: number): Promise<ArrayBuffer> => {
  try {
    const response = await apiClient.get<ArrayBuffer>(
      `${GETIMAGE.replace("{:id}", eventId.toString())}`,
      { responseType: "arraybuffer" },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
