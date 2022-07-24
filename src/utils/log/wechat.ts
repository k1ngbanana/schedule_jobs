import LogService from "./log-service";
import { wechat } from "../../config";
import axios from "axios";

class WechatService extends LogService {
  constructor() {
    super();
    this.isValidate = !!wechat.botUrl;
  }

  async log(...data: any[]) {
    console.log("wechat log:", ...data);
  }

  async error(...data: any[]) {
    console.error("wechat error:", ...data);
  }

  async sendMessage(content: unknown) {
    if (!this.isValidate) return;

    const url = wechat.botUrl;
    const response = await axios.post<{ errcode: number; errmsg: string }>(
      url!,
      {
        msgtype: "markdown",
        markdown: {
          content: this.assembledText(content),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = response;
    if (data.errcode !== 0) {
      console.error(data.errmsg);
      throw new Error(`发送失败: ${data.errmsg || "-"}`);
    }
  }

  assembledText(content: unknown) {
    if (Array.isArray(content)) {
      const html: string[] = [];

      content.forEach((text) => {
        html.push(`${text}`);
      });

      return `${html.join("\n")}`;
    } else if (typeof content === "string") {
      return content;
    }
  }
}

export default new WechatService();
