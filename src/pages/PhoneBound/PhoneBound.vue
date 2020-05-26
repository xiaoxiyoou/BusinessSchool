<template>
  <div class="container">
    <input v-model="phoneNum" class="phone" type="tel" placeholder="请输入您的手机号码" @blur="getHeight" />
    <div class="authCode row a-c j-b">
      <input v-model="pwd" class="code" type="tel" placeholder="请输入验证码" @blur="getHeight" />
      <div class="getCode" @click="_getSendCode" @blur="getHeight" v-if="disabled">
        获取验证码
      </div>
      <div class="getCode" @blur="getHeight" v-else>
        {{ time }}秒后重试
      </div>
    </div>
    <div class="confirm" @click="_submitPersonInfo">
      确认修改
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSendCode, sendPhoneBound, getUserInfo } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      codeTxt: '获取验证码',
      phoneNum: '',
      pwd: '',
      time: 60,
      disabled: true
    }
  },
  mounted() {
    this._getUserInfo()
  },
  methods: {
    // 获取用户信息
    _getUserInfo() {
      getUserInfo().then(res => {
        console.log('用户信息', res)
        if (res.code === 0) {
          // this.userName = this.userObj.TrueName
          this.phoneNum = res.data.Telephone

        }
      })
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
      if (!this.phoneNum) {
        Toast('手机号不能为空')
        return false;
      } else if (!myreg.test(this.phoneNum)) {
        Toast('手机号格式错误')
        return false;
      } else if (!this.pwd) {
        Toast('验证码不能为空')
        return false;
      } else {
        // 点击确定
        sendPhoneBound({
          userCode: this.pwd,
          userTel: this.phoneNum
        }).then(res => {
          console.log(res)
          if (res.code === 0) {
            Toast('修改成功')
            this.$router.go(-1)
          } else if (res.code === 1) {
            Toast('修改失败，请重试')
          }
        })
      }
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
</style>
