<template>
  <div class="container col a-c" v-if="nomessage">
    <input v-model="userName" class="name" placeholder="请输入姓名">
    <input v-model="phoneNum" class="phone" type="tel" placeholder="请输入您的手机号码">
    <div class="authCode row a-c j-b">
      <input v-model="pwd" class="code" type="tel" placeholder="请输入验证码" @blur="getHeight" />
      <div class="getCode" @click="_getSendCode" @blur="getHeight" v-if="disabled">
        获取验证码
      </div>
      <div class="getCode" @blur="getHeight" v-else>
        {{ time }}秒后重试
      </div>
    </div>

    <div class="confirm row a-c j-c" @click="_submitPersonInfo">
      完成绑定
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getSendCode, ingetQrcode, getUserInfo } from 'api/index'

import { Toast } from 'vant'
export default {
  data() {
    return {
      nomessage: false,
      shareUserId: '',
      userName: '',
      codeTxt: '获取验证码',
      phoneNum: '',
      time: 60,
      pwd: '',
      userObj: {},
      disabled: true

    }
  },
  mounted() {
    this._getUserInfo()
    // let url = decodeURIComponent(window.location.hash).split("#/information?")
    let url = decodeURIComponent(window.location.hash).split("#/information?")[1].split("|")
    console.log('url', url)
    if (url[0].split("shareUserId=")[1]) {
      this.shareUserId = url[0].split("shareUserId=")[1]
      console.log('url', url[0].split("shareUserId=")[1])
    }





  },
  created() {



  },
  methods: {
    // 获取用户信息
    _getUserInfo() {
      getUserInfo().then(res => {
        console.log('用户信息', res)
        if (res.code === 0) {
          console.log('执行')
          this.userObj = Object.assign({}, res.data)
          if (this.userObj.Telephone) {
            this.$router.push('/extension')

          } else {
            this.nomessage = true
          }
        } else {
          this.$router.push({
            path: '/login',
          })
        }
      })
    },
    _getSendCode() {

      if (!this.phoneNum) {
        Toast('请输入手机号')
        return false;
      }
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.phoneNum)) {
        Toast('手机号格式错误')
        return false;
      }
      this.disabled = false
      let timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          clearInterval(timer)
          this.disabled = true
          this.time = 60
        }
      }, 1000)
      getSendCode({
        phoneNum: this.phoneNum
      }).then(res => {
        console.log('发送验证码请求', res);
        Toast('验证码已发送')

      })


    },
    _submitPersonInfo() {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!this.phoneNum) {
        Toast('手机号不能为空')
        return false;
      } else if (!myreg.test(this.phoneNum)) {
        Toast('手机号格式错误')
        return false;
      } else if (!this.userName) {
        Toast('姓名不能为空')
        return false;
      } else if (!this.pwd) {
        Toast('验证码不能为空')
        return false;
      } else {
        this._ingetQrcode()
      }

    },
    // 点击确定
    _ingetQrcode() {

      ingetQrcode({
        userCode: this.pwd,
        TrueName: this.userName,
        shareUserId: this.shareUserId,
        userTel: this.phoneNum
      }).then(res => {
        console.log(res)
        Toast(res.msg)
        if (res.code === 0) {
          setTimeout(() => { this.$router.push('/extension') }, 1000);
        }
      })
    },

    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  components: {

  }
}
</script>
<style scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  font-size: 0.28rem;
  background: #ffffff;
}
.name {
  width: 92%;
  height: 1.07rem;
  border: 1px solid #d6d6d6;
  margin-top: 0.42rem;
  border-radius: 0.1rem;
  padding-left: 0.33rem;
  font-size: 0.3rem;
}
.phone {
  width: 92%;
  height: 1.07rem;
  margin-top: 0.39rem;
  border: 1px solid #d6d6d6;
  border-radius: 0.1rem;
  padding-left: 0.33rem;
  font-size: 0.3rem;
}
.authCode {
  width: 92%;
  height: 1.04rem;
  margin-top: 0.39rem;
}
.code {
  border: 1px solid #d6d6d6;
  border-radius: 0.1rem;
  padding-left: 0.33rem;
  font-size: 0.3rem;
  width: 60%;
  height: 1.04rem;
}
.getCode {
  width: 37%;
  height: 1.04rem;
  line-height: 1.04rem;
  text-align: center;
  border: 0.01rem solid #d6d6d6;
  border-radius: 0.1rem;
  color: #c5a064;
  font-size: 0.32rem;
}
.confirm {
  width: 90%;
  height: 0.98rem;
  border: 1px solid #d6d6d6;
  border-radius: 0.1rem;
  font-size: 0.36rem;
  color: #ffffff;
  background: #c5a064;
  margin-top: 0.52rem;
}
</style>