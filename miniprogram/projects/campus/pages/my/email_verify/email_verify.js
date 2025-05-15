Page({
    data: {
      email: '',
      code: '',
      sentCode: '',
      verifyPassed: false
    },
  
    sendCode: async function () {
      const email = this.data.email.trim();
      if (!this._checkEmail(email)) return;
  
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      this.setData({ sentCode: code });
  
      // TODO: 用云函数调用邮箱发送服务
      await wx.cloud.callFunction({
        name: 'sendEmail',
        data: {
          to: email,
          subject: '邮箱验证验证码',
          text: `您的验证码是 ${code}，有效期5分钟。`
        }
      });
  
      wx.showToast({ title: '验证码已发送' });
    },
  
    verifyCode: async function () {
      if (this.data.code.trim() !== this.data.sentCode) {
        wx.showToast({ title: '验证码错误', icon: 'error' });
        return;
      }
  
      // 更新用户表
      await wx.cloud.callFunction({
        name: 'mcloud',
        data: {
          route: 'user/update_email_verify',
          email: this.data.email.trim()
        }
      });
  
      wx.showToast({ title: '验证成功' });
      wx.navigateBack();
    },
  
    _checkEmail(email) {
      if (!email || !email.includes('@')) {
        wx.showToast({ title: '邮箱格式错误', icon: 'none' });
        return false;
      }
    // ✅ 开发调试阶段临时放开邮箱后缀限制
    return true;
    //   const validDomains = ['ac.uk', '.edu', '.ca', '.edu.au'];
    //   const pass = validDomains.some(suffix => email.endsWith(suffix));
      if (!pass) {
        wx.showToast({ title: '不支持的高校邮箱域名', icon: 'none' });
        return false;
      }
  
      return true;
    }
  });
  