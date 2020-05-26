<template>
  <div class="container">
    <router-view />
    <div class="avatar row a-c j-b border-bottom-1px">
      <span class="title">头像</span>
      <div class="right row a-c" @click="showAvatar()">
        <img :src='userObj.HeadImg' alt="" />
      </div>
    </div>
    <div class="item row a-c j-b border-bottom-1px">
      <span class="title">昵称</span>

      <input class="text" v-model="userObj.NickName" placeholder="请输入昵称" />
    </div>
    <div class="item row a-c j-b border-bottom-1px">
      <span class="title">真实姓名</span>
      <input class="text" v-model="userObj.TrueName" placeholder="请输入姓名" />
    </div>
    <div class="item row a-c j-b border-bottom-1px">
      <span class="title">手机号</span>
      <input class="text" v-model="userObj.Telephone" placeholder="请输入手机号" />

    </div>
    <div class="item row a-c j-b border-bottom-1px">
      <input v-model="pwd" placeholder="请输入验证码" />
      <span v-if="disabled" class="getCode" @click="_getSendCode">获取验证码</span>
      <div class="getCode" @blur="getHeight" v-else>
        {{ time }}秒后重试
      </div>

    </div>

    <div class="item row a-c j-b border-bottom-1px">
      <span class="title">您的地区</span>
      <input class="text" type="text" readonly="readonly" @click="showPopup" :value="trade" />

    </div>
    <div class="item row a-c j-b border-bottom-1px">
      <span class="title">
        身份</span>
      <p class="text" style="line-height:1.2rem"  v-if="userObj.groupName">{{ userObj.groupName}}</p>
      <p class="text" style="line-height:1.2rem" v-else>学员</p>

    </div>
    <div class="btm row j-c a-c" @click="cofirmBtm()">确认修改</div>
    <van-popup v-model="show" position="bottom" :columns-placeholder="['请选择', '请选择', '请选择']" :style="{ height: '30%' }">
      <van-area :area-list="areaList" title="所在城市" @cancel="cancel" @confirm="confirm" />
    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
import { getUserInfo, cofirmMsg, getSendCode } from 'api/index'
import AreaList from 'assets/js/area';
import { Toast } from 'vant';
export default {
  data() {
    return {
      userObj: {},
      trade: '请选择',
      areaList: AreaList,
      pwd: '',
      show: false,
      time: 60,
      disabled: true


    }
  },
  mounted() {
    this._getUserInfo()
  },
  methods: {
    _getSendCode() {

      if (!this.userObj.Telephone) {
        Toast('请输入手机号')
        return false;
      }
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.userObj.Telephone)) {
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
        phoneNum: this.userObj.Telephone
      }).then(res => {
        console.log('发送验证码请求', res);
        Toast('验证码已发送')

      })


    },
    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    _getUserInfo() {
      getUserInfo().then(res => {
        console.log(res)
        if (res.code === 0) {
          let data = res.data
          console.log('个人信息', data)
          this.userObj = Object.assign({}, data)
        }
      })
    },
    toBoundPhone() {
      this.$router.push({
        path: './phonebound'
      })
    },
    showPopup() {
      this.show = true;
    },
    cancel() {
      this.show = false
    },
    //   点击保存按钮
    confirm(value) {
      this.show = false
      console.log(value)
      this.adressValue = value.map(function (item) {
        return item.name;
      });
      this.trade = this.adressValue.join('')

      console.log('this.trade', this.trade)

    },
    cofirmBtm() {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!this.userObj.Telephone) {
        Toast('手机号不能为空')
        return false;
      } else if (!myreg.test(this.userObj.Telephone)) {
        Toast('手机号格式错误')
        return false;
      } else if (!this.userObj.TrueName) {
        Toast('姓名不能为空')
        return false;
      } else if (this.trade == '请选择') {
        Toast('地址不能为空')
        return false;
      } else if (!this.pwd) {
        Toast('验证码不能为空')
        return false;
      } else {
        // this._GetWebChatOpenId()
        this._cofirmMsg()

      }

    },
    _cofirmMsg() {
      cofirmMsg({
        address: this.trade,
        userTel: this.userObj.Telephone,
        userCode: this.pwd,
        videoUserName: this.userObj.TrueName
      }).then(res => {

        console.log(res)
        if (res.code == 0) {
          Toast('修改成功')
          this.$router.go(-1)
        } else {
          Toast('修改失败，请重试')
        }

      })

    },
    toInputName(id) {
      this.$router.push({
        path: './inputname',
        query: {
          id: id
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
  background-color: #fff;
  padding: 0 0.45rem 0 0.45rem;
  font-size: 0.28rem;
}

.container .crop-con {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.container .crop-con .return {
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  padding: 0.12rem 0.16rem;
  background-color: #65a2e7;
  border-radius: 0.04rem;
  font-size: 0.32rem;
  color: #fff;
  z-index: 100;
}

.container .crop-con .bottom-button {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.1rem;
}

.container .crop-con .bottom-button .btn {
  padding: 0.04rem 0.06rem;
  background-color: #40ce53;
  border-radius: 0.04rem;
  font-size: 0.32rem;
  color: #fff;
}

.container .crop-con .bottom-button .uploading {
  width: 1.8rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  background: #40ce53;
  color: #fff;
  border-radius: 0.1rem;
  font-size: 0.32rem;
}

.container .crop-con .bottom-button .selectImg {
  width: 1.8rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  color: #fff;
  font-size: 0.32rem;
  background: #65a2e7;
  border-radius: 0.1rem;
  position: relative;
}

.container .crop-con .bottom-button .selectImg .text {
  z-index: 5;
}

.container .crop-con .bottom-button .selectImg .uploads {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.container .avatar {
  width: 100%;
  height: 1.4rem;
}

.container .avatar .title {
  font-size: 0.3rem;
  color: #666;
}

.container .avatar img {
  width: 0.84rem;
  height: 0.84rem;
  border-radius: 50%;
}

.container .item {
  width: 100%;
  height: 1.2rem;
}

.container .item .title {
  width: 30%;
  font-size: 0.3rem;
  color: #666;
}

.container .item .text {
  width: 70%;
  height: 100%;
  /* line-height: 1rem; */
  text-align: right;
  color: #000;
}
.btm {
  width: 4.7rem;
  height: 0.66rem;
  line-height: 0.66rem;
  margin: 0 auto;
  margin-top: 0.44rem;
  text-align: center;
  font-size: 0.32rem;
  color: #f5f5f5;
  -webkit-border-radius: 0.14rem;
  -moz-border-radius: 0.14rem;
  border-radius: 0.14rem;
  background-color: #c5a064;
}
.getCode {
  padding: 0.1rem;

  text-align: center;
  border: 0.01rem solid #d6d6d6;
  border-radius: 0.1rem;
  background: #c5a064;
  font-size: 0.25rem;
  color: #ffffff;
}
</style>