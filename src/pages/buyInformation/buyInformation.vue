<template>
  <div class="container" v-if="nomessage">
    <input v-if="phoneShow" v-model="userName" class="phone" placeholder="请输入姓名">
    <input v-if="phoneShow" v-model="phoneNum" class="phone" type="tel" placeholder="请输入您的手机号码" @blur="getHeight" />
    <div class="authCode row a-c j-b" v-if="phoneShow">
      <input v-model="pwd" class="code" type="tel" placeholder="请输入验证码" @blur="getHeight" />
      <div class="getCode" @click="_getSendCode" @blur="getHeight" v-if="disabled">
        获取验证码
      </div>
      <div class="getCode" @blur="getHeight" v-else>
        {{ time }}秒后重试
      </div>
    </div>
    <input v-model="codeVaue" class="phone" type="tel" placeholder="请输入邀请码">
    <div class="confirm" @click="_submitPersonInfo">
      提交
    </div>
    <div class="homeCon col j-c a-c">
      <img class="home" src="./../../assets/img/home.png" alt="" @click="Extion()">
      <div class="homeText">回首页</div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSendCode, inQrcodeGive, getUserInfo } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      phoneShow: true,
      nomessage: true,
      FreeCode: '',
      shareUserId: '',
      codeTxt: '获取验证码',
      phoneNum: '',
      pwd: '',
      time: 60,
      userName: '',
      codeVaue: '',
      disabled: true
    }
  },
  mounted() {
    this._getUserInfo()

    if (decodeURIComponent(window.location.hash).split("#/buyInformation?")[1].split("|")) {
      let url = decodeURIComponent(window.location.hash).split("#/buyInformation?")[1].split("|")
      console.log('url', url)
      this.FreeCode = url[1].split("shareCode=")[1]
      this.shareUserId = url[0].split("shareUserId=")[1]
      console.log('url', url[0].split("shareUserId=")[1])
      console.log('url', url[1].split("shareCode=")[1])
      this.codeVaue = this.FreeCode
    }
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
            this.phoneShow = false
            this.userName = this.userObj.TrueName
            this.phoneNum = this.userObj.Telephone
            this.pwd = '0000'


          } else {
            this.nomessage = true
          }
        }else {
          this.$router.push({
            path: '/login',
          })
        }
      })
    },
    Extion() {
      this.$router.push('/extension')
    },
    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
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
      if (!this.userName) {
        Toast('请输入姓名')
        return false;
      } else if (!this.phoneNum) {
        Toast('手机号不能为空')
        return false;
      } else if (!myreg.test(this.phoneNum)) {
        Toast('手机号格式错误')
        return false;
      } else if (!this.pwd) {
        Toast('验证码不能为空')
        return false;
      } else {
        this._inQrcodeGive()
      }

    },
    // 点击确定
    _inQrcodeGive() {
      inQrcodeGive({
        userCode: this.pwd,
        TrueName: this.userName,
        FreeCode: this.FreeCode,
        shareUserId: this.shareUserId,
        userTel: this.phoneNum
      }).then(res => {
       
        console.log(res)
        Toast(res.msg)
        if (res.code === 0) {
          setTimeout(() => { this.$router.push('/extension') }, 1000);
        }
      })
    }
  },
  components: {

  }
}
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0 0.35rem;
  background-color: #fff;
}
.container .phone {
  width: 100%;
  height: 1.08rem;
  margin-top: 0.44rem;
  padding-left: 0.33rem;
  border-radius: 0.1rem;
  border: 0.01rem solid #d6d6d6;
  font-size: 0.32rem;
  color: #666;
  touch-action: none;
}
.container .phone::placeholder {
  color: #979799;
}
.container .authCode {
  width: 100%;
  height: 1.04rem;
  margin-top: 0.4rem;
}
.container .authCode .code {
  width: 56%;
  height: 1.04rem;
  border-radius: 0.1rem;
  border: 0.01rem solid #d6d6d6;
  font-size: 0.32rem;
  color: #666;
  padding-left: 0.33rem;
  touch-action: none;
}
.container .authCode .code::placeholder {
  color: #979799;
}
.container .authCode .getCode {
  width: 37%;
  height: 1.04rem;
  line-height: 1.04rem;
  text-align: center;
  border: 0.01rem solid #d6d6d6;
  border-radius: 0.1rem;
  color: #c5a064;
  font-size: 0.32rem;
}
.container .confirm {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.36rem;
  color: #f5f5f5;
  background-color: #c5a064;
  border-radius: 0.1rem;
  margin-top: 0.52rem;
}
.homeCon {
  position: fixed;
  bottom: 1rem;
  right: 0.35rem;
  font-size: 0.22rem;
  color: #c5a064;
}
.home {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
}
</style>
