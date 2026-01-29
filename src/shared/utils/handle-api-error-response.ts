import { IHttpResponse } from '../interfaces/http-response.interface';

// TODO: Modify as necessary
export const handleAPIErrorResponse = (error: IHttpResponse) => {
  if (!error?.message) {
    console.error('An unexpected error occurred');
    return;
  }
  const { message } = error;
  if (Array.isArray(message)) {
    message.forEach((msg: string) => console.error(msg));
    return;
  }

  if (typeof message === 'string') {
    console.error(message);
  }
};
