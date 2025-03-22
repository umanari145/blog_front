import axios from "axios";
import { LoginApiInterface } from "../../interface/LoginApiInterface";

export class ProductionApi implements LoginApiInterface {
  async fetchData(email: string, password: string): Promise<{ success: boolean; httpStatusCode: number; message: string }> {
    try {
      const {data}= await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/login`,
        {
          email,
          password
        }
      );

      if (data.statusCode === 200) {
        // 成功時のレスポンス
        return {
          success: true,
          httpStatusCode: data.statusCode,
          message: "ログイン成功",
        };
      } else {
        return {
          success: false,
          httpStatusCode: data.statusCode,
          message: "ログイン失敗",
        };
      }
    } catch (error) {
      // エラーハンドリング
      if (axios.isAxiosError(error)  && error.response) {
        return {
          success: false,
          httpStatusCode: error.response.status,
          message: error.response.data?.message || "サーバーエラーが発生しました。",
        };
      } else {
        return {
          success: false,
          httpStatusCode: 500, // 未知のエラー時に500を返す
          message: "未知のエラーが発生しました。",
        };
      }
    }
  }
}
