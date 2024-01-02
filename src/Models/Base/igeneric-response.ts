export interface IGenericResponse<T> {
  data: T;
  error: string;
  message: string;
  isSuccess: boolean;
}
