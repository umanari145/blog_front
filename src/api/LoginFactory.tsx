import { LocalLoginApi } from "./implementations/Login/LocalLoginApi";
import { ProductionApi } from "./implementations/Login/ProductionLoginApi";
import { LoginApiInterface } from "./interface/LoginApiInterface";

export const createLogin = (): LoginApiInterface => {
  if (process.env.NODE_ENV === "development") {
    return new LocalLoginApi();
  }
  return new ProductionApi();
};
