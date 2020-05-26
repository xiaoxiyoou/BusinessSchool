<template>
  <div class="container">
    <input v-model="trade" readonly="readonly" class="phone" type="tel" placeholder="请输入您的地址" @blur="getHeight" @click="Addressbound()" />
    <van-popup v-model="show" position="bottom" :columns-placeholder="['请选择', '请选择', '请选择']" :style="{ height: '30%' }">
      <van-area :area-list="areaList" title="所在城市" @cancel="cancel" @confirm="confirm" />
    </van-popup>
    <div class="confirm" @click="_getSendCode">
      确认修改
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { UserAddress, getUserInfo } from 'api/index'
import { Toast } from 'vant'
import AreaList from 'assets/js/area';
export default {
  data() {
    return {
      show: false,
      trade: '',
      codeTxt: '获取验证码',
      phoneNum: '',
      pwd: '',
      time: 60,
      areaList: AreaList,
      disabled: true
    }
  },
  mounted() {
    this._getUserInfo()
  },
  methods: {
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
    Addressbound() {
      this.show = true
    },
    // 获取用户信息
    _getUserInfo() {
      getUserInfo().then(res => {
        console.log('用户信息', res)
        if (res.code === 0) {
          // this.userName = this.userObj.TrueName
          this.trade = res.data.Address

        }
      })
    },
    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    _getSendCode() {

      if (!this.trade) {
        Toast('请输入您的地址')
        return false;
      }

      UserAddress({
        UserAddress: this.trade
      }).then(res => {
        console.log('地址修改', res);
        if (res.code == 0) {
          Toast('修改成功')
          this.$router.go(-1)
        } else {
          Toast(res.msg)
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
