export const email = {
    user: process.env.MAIL_SENDER,
    pass: process.env.SMTP_PASSWORD,
    host: process.env.MAIL_HOST_SENDER || 'smtp.qq.com',
    port: process.env.MAIL_PORT_SENDER || '465',
    to: process.env.MAIL_RECIPIENT
}

export const wechat = {
    botUrl: process.env.WECHAT_BOT_URL,
}
