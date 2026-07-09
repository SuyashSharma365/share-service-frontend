import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_URL;
console.log("API_HOST =", API_HOST);

export interface UploadResponse {
  objectId?: string;
  key?: string;
}

export async function retrieveContent(objectId: string) {
  const response = await axios.get<RetrieveResponse>(
    `${API_HOST}/api/retrieve`,
    {
      headers: {
        'object-Id': objectId,
      },
      timeout: 20000,
      responseType: 'json',
    }
  );

  return response.data;
}

export interface RetrieveResponse {
  message?: string;
  data?: string; // base64 encoded file data (optional)
}



export async function uploadContent(formData: FormData) {
  const response = await axios.post<UploadResponse>(
    `${API_HOST}/api/upload`,
    formData,
    {
      timeout: 20000,
    }
  );

  return response.data;
}