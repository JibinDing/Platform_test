const mailjet = require('node-mailjet');

exports.main = async (event, context) => {
  const { to, subject, text } = event;

  const mj = mailjet.apiConnect(
    '4812a52484c5bef23d1a71bb041caa9d',    // 替换成你的 Mailjet API Key
    'cf788ec3655f5dd243b48eddc42653a4' // 替换成你的 Secret Key
  );

  const request = mj.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'dingjibin1610@gmail.com', // ⚠️ 必须验证过
          Name: '校园圈验证'
        },
        To: [
          {
            Email: to,
            Name: to
          }
        ],
        Subject: subject,
        TextPart: text
      }
    ]
  });

  try {
    const result = await request;
    console.log('发送成功:', result.body);
    return { code: 200, msg: '邮件发送成功' };
  } catch (err) {
    console.error('邮件发送失败', err);
    return { code: 500, msg: '邮件发送失败', error: err.toString() };
  }
};
