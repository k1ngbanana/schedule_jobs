// 所有消息推送服务继承这个类
export default class LogService {
    isValidate = false;

    constructor() {}

    async log(...data: any[]) {}

    async error(...data: any[]) {}

    async sendMessage(...data: any[]) {}
}
