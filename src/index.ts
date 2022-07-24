import { Xindongli } from "./utils/system";
import to from "await-to-js";
import LogServices from "./utils/log";

async function main() {
  let res: string[] = [];

  const [err, res1] = await to(xindongli());
  if (err) res.push(...(err.message ? ["新动力签到失败", err.message] : []));
  else res.push(...(res1?.msg ? ["新动力签到成功", res1.msg] : []));

  for (let logService of LogServices) {
    const [logServiceError] = await to(logService.sendMessage(res));
    if (logServiceError) await logService.error(logServiceError);
  }

  console.log(res.join("\n"));
}

async function xindongli() {
  const xindongli = new Xindongli();
  const res = await xindongli.login(
    process.env.XINDONGLI_USERNAME,
    process.env.XINDONGLI_PASSWORD
  );
  const { headers } = res;

  const cookies = headers["set-cookie"];
  const formatCookies = cookies
    ?.map((cookie) => {
      return cookie.split(";")[0];
    })
    .join(";");

  if (formatCookies) return await xindongli.checkin(formatCookies);
}

main();
