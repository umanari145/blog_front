import { LoginApiInterface } from "../../interface/LoginApiInterface";

export class LocalLoginApi implements LoginApiInterface {
  async fetchData(email: string, password: string): Promise<{ success: boolean; httpStatusCode: number; message: string }> {
    if (email === "hoge@gmail.com" && password === "hoge") {
      return {
        success: true,
        httpStatusCode: 201,
        message: "ログイン成功",
      };
    } else {
      return {
        success: false,
        httpStatusCode: 401,
        message: "ログイン失敗",
      };
    }
  }
}
