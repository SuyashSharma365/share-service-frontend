import axios from 'axios';

const API_HOST = 'https://dropcode.space';

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
 * - Sends the FormData exactly as received. The backend receives:
 *   - 'message' as a multipart form field (for text-only uploads)
 *   - 'file' as one or more multipart form fields (for file uploads)
 *   - Both 'message' and 'file' fields (for text + file uploads)
 */
export async function uploadContent(formData: FormData) {
  const response = await axios.post<UploadResponse>(`${API_HOST}/api/upload`, formData, {
    // Do not set Content-Type so the browser can set the correct multipart boundary.
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
