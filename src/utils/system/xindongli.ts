import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import SystemService from "./login-service";

const baseUrl = process.env.XINDONGLI_URL;

export class Xindongli extends SystemService {
  async login(email: string | undefined, passwd: string | undefined) {
    if (!email || !passwd) {
      throw new Error(
        '没有设置"XINDONGLI_USERNAME"或"XINDONGLI_PASSWORD"，请设置后重试'
      );
    }

    const url = `${baseUrl}/auth/login`;
    const response = await axios.post<{ ret: number; msg: string }>(url, {
      email,
      passwd,
      code: "",
    });

    const { data } = response;
    if (data.ret !== 1) {
      console.error(data.msg);
      throw new Error(`登录失败: ${data.msg || '-'}`);
    }

    return response;
  }

  async checkin(cookie: string) {
    const url = `${baseUrl}/user/checkin`;
    const config: AxiosRequestConfig = {
      method: "POST",
      headers: {
        Cookie: cookie,
      },
    };
    const { data } = await axios.post<{ ret: number; msg: string }>(
      url,
      undefined,
      config
    );

    if (data.ret !== 1) {
      throw new Error(data.msg);
    }

    return data;
  }
}
