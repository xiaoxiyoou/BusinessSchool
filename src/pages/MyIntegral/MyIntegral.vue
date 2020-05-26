<template>
  <div class="container">
    <router-view />
    <header class="head">
      <img class="headBg" src="./img/di.png" alt="">
      <div class="right row a-c j-c">
        <div class="rankNum">{{userObj.integral}}</div>
        <div class="name">积分</div>
      </div>
    </header>
    <div class="interalCon">
      <div class="item row j-b a-c border-bottom-1px">
        <div class="col">
          <span class="title">签到得积分</span>
          <span class="desc">每天可签到1次，获得5积分</span>
        </div>
        <div class="button" @click="_toSign" :class="userObj.issign === 0 ? '' : 'on' ">{{userObj.issign === 0 ? '签到' : '已签到'}}</div>
      </div>
      <div class="item row j-b a-c border-bottom-1px">
        <div class="col">
          <span class="title">完善信息</span>
          <span class="desc">可获取10积分</span>
        </div>
        <div class="button" @click="_toComplete" :class="userObj.isuserinfo === 0 ? '' : 'on' ">{{userObj.isuserinfo === 0 ? '去完善' : '已完善'}}</div>
      </div>
      <div class="item row j-b a-c border-bottom-1px">
        <div class="col">
          <span class="title">分享获取积分</span>
          <span class="desc">分享一次获取2积分，每天最多5次</span>
        </div>
        <div class="button" @click.stop="codeCon(true)">去分享</div>
      </div>
      <div class="item row j-b a-c">
        <div class="col">
          <span class="title">邀请得积分</span>
          <span class="desc">成功邀请好友一起学习，获得10积分</span>
        </div>
        <div class="button" @click="_toInvited">去邀请</div>
      </div>
    </div>
    <div class="toInteralDetail" @click="toInteralDetail">积分使用规则</div>
    <!-- 点击分享 -->
    <div class="qrcodeCon" v-if="qrcodeCon">
      <div class="code_mask" @click.stop="codeCon(false)"></div>
      <img class="qrcodeImg" src="./img/shareTip.png" alt="" @click.stop="codeCon(false)">
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { getUserInfo, toSign } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      qrcodeCon: false,
      userObj: {}
    }
  },
  mounted() {
    setTimeout(() => {
      this._getUserInfo()
    }, 100);

  },
  methods: {
    codeCon(flag) {
      this.qrcodeCon = flag
    },
    _getUserInfo() {
      getUserInfo().then(res => {
        console.log(res)
        if (res.code === 0) {
          let data = res.data
          this.userObj = Object.assign({}, data)
        }
      })
    },
    toInteralDetail() {
      this.$router.push({
        path: '/IntegralDetail'
      })
    },
    _toSign() {
      if (this.userObj.issign === 0) {
        toSign().then(res => {
          console.log(res)
          if (res.code === 0) {
            this._getUserInfo()
            Toast('签到成功')
          } else if (res.code === 1) {
            Toast('今天已签到')
          }
        })
      }
    },
    _toComplete() {
      if (this.userObj.isuserinfo === 0) {
        this.$router.push({
          path: './SettingTotal'
        })
      } else {
        Toast('信息已完善')
      }
    },
    _toInvited() {
      this.$router.push({
        path: '/MyExtension'
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
}

.container .head {
  position: relative;
  width: 100%;
}

.container .head .headBg {
  width: 100%;
  position: absolute;
}

.container .head .content {
  position: absolute;
  top: 1.3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 6.9rem;
  height: 2.1rem;
  background-color: #fff;
  border-radius: 0.2rem;
}
.right {
  position: relative;
  top: 0.61rem;
  color: #ffffff;
  width: 100%;
}
.container .head .content .left .name,
.right .name {
  font-size: 0.35rem;
  position: relative;
  margin-top: 0.2rem;
  margin-left: 0.1rem;
}

.container .head .content .left .rankNum,
.right .rankNum {
  /* margin-top: .16rem; */
  font-size: 0.72rem;
}

.container .head .content .mid .avatar {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
}

.container .head .content .mid .peopleName {
  margin-top: 0.16rem;
  font-size: 0.32rem;
  color: #666;
}

.container .interalCon {
  width: 6.9rem;
  margin: 0 auto;
  /* margin-top: 1.00rem; */
  background-color: #fff;
  padding: 0 0.4rem;
  position: relative;
  margin-top: 0.8rem;
  border-radius: 0.2rem;
}

.container .interalCon .item {
  width: 100%;
  height: 1.56rem;
}

.container .interalCon .item .title {
  font-size: 0.32rem;
  color: #474747;
}

.container .interalCon .item .desc {
  margin-top: 0.1rem;
  font-size: 0.26rem;
  color: #808080;
}

.container .interalCon .item .button {
  width: 1.35rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.26rem;
  color: #f5f5f5;
  background-color: #c5a064;
  border-radius: 0.06rem;
}

.container .interalCon .item .on {
  background-color: #edecec !important;
  color: #b6b6b6 !important;
}

.container .toInteralDetail {
  width: 4.7rem;
  height: 0.66rem;
  line-height: 0.66rem;
  margin: 0 auto;
  margin-top: 0.44rem;
  text-align: center;
  font-size: 0.32rem;
  color: #f5f5f5;
  border-radius: 0.14rem;
  background-color: #c5a064;
}
.code_mask {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0.7;
}
.qrcodeImg {
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 6.75rem;
  height: 2.71rem;
}
</style>