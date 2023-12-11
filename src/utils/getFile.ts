export const getFileImage = (fileName: string) => {
  const baseApiUrl = import.meta.env.VITE_APP_API_URL;

  return `${baseApiUrl}api/file/${fileName}`;
};