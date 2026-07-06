import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_URL;
console.log("API_HOST =", API_HOST);

export interface UploadResponse {
  objectId?: string;
  key?: string;
}

export interface RetrieveResponse {
  message?: string;
  data?: string; // base64 encoded file data (optional)
}

/**
 * Upload content to the server.
 * - Expects a FormData that may include a 'message' entry and one or more 'file' entries.
 * - The server expects the text message to be sent in a header named 'text'.
 */
export async function uploadContent(formData: FormData) {
  const text = (formData.get('message') as string) ?? '';
  // It's safe to leave the message in the form if the server ignores it there,
  // but remove it to avoid duplication.
  if (formData.has('message')) formData.delete('message');

  const response = await axios.post<UploadResponse>(`${API_HOST}/api/upload`, formData, {
    // Do not set Content-Type so the browser can set the correct multipart boundary.
    headers: {
      text,
    },
    timeout: 20000,
  });

  return response.data;
}

/**
 * Retrieve content by object id (4-digit key).
 * - Sends the key in the 'object-Id' request header per API spec.
 */
export async function retrieveContent(objectId: string) {
  const response = await axios.get<RetrieveResponse>(`${API_HOST}/api/retrieve`, {
    headers: {
      'object-Id': objectId,
    },
    timeout: 20000,
    responseType: 'json',
  });

  return response.data;
}
