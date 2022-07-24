// 所有消息推送服务继承这个类
export default class LogService {
    isValidate = false;

    constructor() {}

    async log(...data: any[]) {}

    async error(...data: any[]) {}

    async sendMessage(...data: any[]) {}

    assembledText(content: unknown) {
        if (Array.isArray(content)) {
            const html: string[] = [];

            content.forEach((text) => {
                html.push(`<p>${text}</p>`);
            });

            return `<div>${html.join("")}</div>`;
        } else if (typeof content === "string") {
            return content;
        }
    }
}
