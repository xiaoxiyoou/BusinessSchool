<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <img class="banner" src="./img/1.png" alt="" />
        <img class="banner" src="./img/2.png" alt="" />
        <img class="banner" src="./img/5.png" alt="" />
        <img class="banner" src="./img/6.png" alt="" />
        <img class="banner" src="./img/3.png" alt="" />
        <img class="banner" src="./img/4.png" alt="" />

        <img class="banner" src="./img/7.png" alt="" />
      </div>
    </div>
    <div class="btm row j-c a-c" @click.stop="BecomMember(true)">立即加入</div>
    <!-- 成为社员 -->
    <div class="becomMemberCon" v-if="becomMemberCon">
      <div class="code_mask" @click.stop="BecomMember(false)"></div>
      <div class="becomMember col j-c a-c">
        <div class="title">填写信息</div>
        <input v-model="userName" class="name" placeholder="请输入姓名">
        <input v-model="phoneNum" class="phone" type="tel" placeholder="请输入您的手机号码">

        <div class="chooseCourse">选择课程</div>

        <div class="courseDetail col" v-for="(item, index) in geMembertData" :key="index" @click="selcet(item.VideoSectionId, index,item.IsBuy)">
          <div class="row a-c">
            <div class="selectCon  col a-c j-c" :class="defaultIdndex == index ? 'selectCon-hover' : ''">
              <div class="select " :class="defaultIdndex == index ? 'selectHover' : ''"></div>
            </div>
            <div class="courseName">《{{ item.VideoSectionRemark }}》</div>
          </div>
          <div class="isbuy" v-if="item.IsBuy">（已购买）</div>
        </div>

        <div class="confirm row a-c j-c" @click="_submitPersonInfo">
          提交
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { payCourse, getUserInfo, geMembertList } from 'api/index'
import BScroll from 'better-scroll'
import { Toast } from 'vant';
export default {
  data() {
    return {

      defaultIdndex: 0,
      geMembertData: [],
      IsBuy: 0,
      codeTxt: '获取验证码',
      phoneNum: '',
      pwd: '',
      time: 60,
      userName: '',
      codeVaue: '',
      becomMember: false,
      becomMemberCon: false,
      userObj: {},
      disabled: true,
      btm: true
    }
  },
  mounted() {
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.container', { click: true })
    })
    this._getUserInfo()
    this._geMembertList()

  },
  methods: {
    selcet(value, index, IsBuy) {
      this.defaultIdndex = index;
      console.log('value', value)
      this.selected = value
      this.IsBuy = IsBuy
      console.log('this.IsBuy', this.IsBuy)
    },

    BecomMember(flag) {
      this.becomMemberCon = flag
    },
    _submitPersonInfo() {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.IsBuy) {
        Toast('本课程您已购买过')
        return false;
      } else if (!this.phoneNum) {
        Toast('手机号不能为空')
        return false;
      } else if (!myreg.test(this.phoneNum)) {
        Toast('手机号格式错误')
        return false;
      } else if (!this.userName) {
        Toast('姓名不能为空')
        return false;
      } else {
        this._payCourse()


      }
    },
    _payCourse() {
      payCourse({
        openid: this.userObj.OpenId,
        VideoUserName: this.userName,
        UserTel: this.phoneNum,
        Province: '',
        City: '',
        District: '',
        VideoOrderType: 2,
        videoId: 0,
        videoSectionId: this.selected,
        VideoOrderPrice: 399,
        ActivationCodeNum: ''
      }).then(res => {
        console.log('this.selected', this.selected)
        console.log('支付提交', res)
        if (res.code == 0) {
          let params = JSON.parse(res.data)
          if (typeof window.WeixinJSBridge !== "undefined") {
            var that = this
            window.WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
              "appId": params.appId,  //公众号名称，由商户传入     
              "timeStamp": params.timeStamp,  //时间戳，自1970年以来的秒数     
              "nonceStr": params.nonceStr,  //随机串     
              "package": params.package,
              "signType": params.signType,  //微信签名方式：     
              "paySign": params.paySign  //微信签名 
            },
              function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  Toast('支付成功！');
                  that.becomMemberCon = false
                  that.$router.push({ path: '/home/index' })
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  Toast('支付失败！');
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                  Toast('调起微信支付失败');
                }
              });
          }

        }


      })
    },
    // 获取用户信息
    _getUserInfo() {
      getUserInfo().then(res => {
        console.log('用户信息', res)
        if (res.code === 0) {
          console.log('执行')
          this.userObj = Object.assign({}, res.data)
          if (this.userObj.Telephone) {
            this.phoneNum = this.userObj.Telephone
          }
          if (this.userObj.TrueName) {
            this.userName = this.userObj.TrueName
          }

        }
      })
    },
    // 社员专享
    _geMembertList() {
      geMembertList().then(res => {
        console.log('社员专享', res)
        if (res.code === 0) {

          this.geMembertData = res.data
          console.log(' this.geMembertData', this.geMembertData)
          this.selected = res.data[0].VideoSectionId
          this.IsBuy = res.data[0].IsBuy

        }
      })
    },

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
  background-color: #fff;
  bottom: 0;
  padding: 0;
  margin: 0;
  font-size: 0.28rem;
}
.wrapper {
  padding-bottom: 1rem;
}
.banner {
  width: 100%;
  height: auto;
  vertical-align: bottom;
  margin: 0;
}
.btm {
  position: fixed;
  bottom: 0;
  color: #ffffff;
  background: #c5a064;
  width: 100%;
  height: 1rem;
  font-size: 0.4rem;
}
/* 成为社员样式 */
.becomMember {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 80%;
  background: #ffffff;
  text-align: center;
  color: #8a898a;
  border-radius: 0.2rem;
  font-size: 0.28rem;
}
.becomMember > .title {
  background: #c5a064;
  color: #ffffff;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  border-top-right-radius: 0.2rem;
  border-top-left-radius: 0.2rem;
}
.code_mask {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0.3;
}
.name {
  width: 92%;
  height: 1rem;
  border: 1px solid #d6d6d6;
  margin-top: 0.42rem;
  border-radius: 0.1rem;
  padding-left: 0.33rem;
  font-size: 0.3rem;
}
.phone {
  width: 92%;
  height: 1rem;
  margin-top: 0.39rem;
  border: 1px solid #d6d6d6;
  border-radius: 0.1rem;
  padding-left: 0.33rem;
  font-size: 0.3rem;
  /* line-height: 1.07rem; */
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

.selectCon {
  width: 0.25rem;
  height: 0.25rem;
  background: #dfdede;
  border-radius: 50%;
  border: 0.01rem solid #dfdede;
}
.select {
  width: 0.13rem;
  height: 0.13rem;
  background: #dfdede;
  border-radius: 50%;
  position: relative;
  z-index: 0;
}
.selectCon-hover {
  width: 0.25rem;
  height: 0.25rem;
  background: #ffffff;
  border-radius: 50%;
  border: 0.01rem solid #c5a064;
}
.selectHover {
  width: 0.13rem;
  height: 0.13rem;
  background: #c5a064;
  border-radius: 50%;
  position: relative;
  z-index: 0;
}
.confirm {
  width: 92%;
  height: 0.98rem;
  border: 1px solid #d6d6d6;
  border-radius: 0.1rem;
  font-size: 0.36rem;
  color: #ffffff;
  background: #c5a064;
  margin-top: 0.52rem;
  margin-bottom: 0.33rem;
}
.chooseCourse {
  text-align: left;
  width: 92%;
  margin-top: 0.34rem;
  color: #656565;
}
.courseDetail {
  text-align: left;
  width: 92%;
  margin-top: 0.3rem;
  align-items: flex-end;
}
.isbuy {
  color: #c5a064;
  font-size: 0.25rem;
}
</style>
