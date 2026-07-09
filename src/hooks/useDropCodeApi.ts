import { useMutation } from '@tanstack/react-query';
import { retrieveContent, uploadContent } from '../lib/api';


export function useUploadContent() {
  return useMutation({
    mutationFn: uploadContent,
  });
}

export function useRetrieveContent() {
  return useMutation({
    mutationFn: (objectId: string) => retrieveContent(objectId),
  });
}