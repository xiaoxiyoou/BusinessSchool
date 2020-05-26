<template>
  <div class="container col a-c">
    <input v-model="userName" class="name" type="tel" placeholder="请输入姓名">
    <input v-model="phoneNum" class="phone" type="tel" placeholder="请输入您的手机号码">
    <div class="phone" @click="showPopup" :class="{ 'active': isActive }">{{trade}}</div>
    <div class="authCode row a-c j-b">
      <input v-model="pwd" class="code" type="tel" placeholder="请输入验证码" @blur="getHeight">
      <div class="getCode row a-c j-c" @click="_getSendCode" @blur="getHeight">{{codeTxt}}</div>
    </div>
    <div class="confirm row a-c j-c" @click="_submitPersonInfo">
      在线报名
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-picker show-toolbar title="请选择您的行业" :columns="columns" @cancel="cancel" @confirm="confirm" :default-index="1" />
      <van-picker :columns="columns" />
    </van-popup>
  </div>
</template>
<script type="text/ecmascript-6">
import { getBusiness, getOfflineAdd } from 'api/index'
import { Toast } from 'vant'
// import { getSendCode,getOfflineAdd,getBusiness } from 'api/index'
export default {
  data() {
    return {

      userName: '',
      codeTxt: '获取验证码',
      phoneNum: '',
      pwd: '',
      disabled: true,
      columns: [],
      trade: '请选择您的行业',
      IndustryCategoryIdCon: [],
      IndustryCategoryId: '',
      show: false,
      isActive: false
    }
  },
  mounted() {

    this._getBusiness()
  },
  created() {


  },
  methods: {
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
      } else if (!this.IndustryCategoryId) {
        Toast('行业不能为空')
        return false;
      } else {
        // 点击登录
        getOfflineAdd({
          userName: this.userName,
          userTel: this.phoneNum,
          userCode: this.pwd,
          cateId: this.IndustryCategoryId,
          offlineCourseId: this.$route.query.id
        }).then(res => {
          console.log(res)
          if (res.StatusCode === 200) {
            Toast('报名成功')
          }
        })
      }
    },
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    _getBusiness() {
      getBusiness().then(res => {
        console.log('行业类型', res)
        if (res.code === 0) {
          let IndustryCategoryNameCon = res.data.map(function (item) {
            return item.IndustryCategoryName;
          });

          this.columns = IndustryCategoryNameCon
          let IndustryCategoryIdCon = res.data.map(function (item) {
            return item.IndustryCategoryId;
          });
          this.IndustryCategoryIdCon = IndustryCategoryIdCon
        }
      })
    },
    _getSendCode() {

    },
    //   点击保存按钮
    confirm(value, index) {
      this.show = false
      this.trade = value
      this.IndustryCategoryId = this.IndustryCategoryIdCon[index]
      // console.log(value)
      // console.log(index)
      // console.log(this.trade)
      // console.log(this.IndustryCategoryId)
      // console.log(this.IndustryCategoryIdCon)
      // console.log(this.columns)
      this.isActive = true
    },
    cancel() {
      this.show = false
    },
    showPopup() {
      this.show = true;
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
  line-height: 1.07rem;
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
  width: 34%;
  height: 1.04rem;
  border: 1px solid #d6d6d6;
  border-radius: 0.1rem;
  font-size: 0.3rem;
  color: #c5a064;
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
.van-area {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.van-picker__cancel,
.van-picker__confirm {
  color: #c5a064 !important;
}
</style>