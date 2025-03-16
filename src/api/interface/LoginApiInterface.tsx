export interface LoginApiInterface {
  fetchData(email: string, password: string): Promise<{ success: boolean; httpStatusCode: number; message: string }>;
}
