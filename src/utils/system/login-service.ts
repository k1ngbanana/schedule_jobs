// 所有登录服务继承这个类
export default class SystemService {
  constructor() {}

  async login(...data: any[]): Promise<any> {}
}
