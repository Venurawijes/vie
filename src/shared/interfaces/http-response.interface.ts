export interface IHttpResponse {
  isSuccess: boolean;
  statusCode: number;
  message?: string | string[];
  error?: string;
}
