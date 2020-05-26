<template>
  <div class="container">
    <div class="titleItem col j-c a-c">
      <div class="titleName">钱包余额</div>
      <div class="titleNum">{{extendobj}}</div>
      <div class="handle row j-c a-c" @click="getMyCashMoney()">提 现</div>
    </div>

    <div class="interalCon">
      <nav class="tab row j-b">
        <div class="item" v-for="(item, index) in tabList" :key="index" @click="switchItem(index)">
          <span :class="{ on: curIndex === index }">{{ item.txt }}</span>
        </div>
      </nav>
      <div class="munDteail">
        <div>
          <div class="item row j-b a-c" v-for="(item, index) in numberList" :key="index">
            <span class="title" v-if="item.TrueName">{{ item.TrueName }}</span>
            <span class="title" v-else-if="item.CreateTime">{{
              item.CreateTime
            }}</span>
            <span class="desc" v-if="item.UserFranceGainType == 0">+{{
              item.UserFranceGain/100
            }}</span>
            <span class="desc" v-else-if="item.UserFranceGainType == 1">-{{
              item.UserFrancePrice/100
            }}</span>
            <span class="desc" v-else>-{{
              item.UserCashPrice/100
            }}</span>
          </div>
          <van-divider v-if="numberList.length > 4" style="padding-bottom:.5rem">没有更多数据了</van-divider>
        </div>
      </div>
    </div>
    <div class="becomMemberCon" v-if="becomMemberCon">
      <div class="code_mask" @click.stop="BecomMember(false)"></div>
      <div class="becomMember col j-c a-c">
        <div class="title">当前余额 {{extendobj}} 元</div>
        <input v-model="numCash" class="name" type="tel" placeholder="请输入金额" />
        <input v-model="userName" class="phone" placeholder="请输入您的姓名" />

        <div class="confirm row a-c j-c" @click="payBtm()">
          提现
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { getUserInfo, myProfit, myCash, getMyCash } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      userObj: {},
      becomMemberCon: false,
      tabList: [
        { txt: '收支明细' },
        { txt: '提现明细' }
      ],
      curIndex: 0,
      pageSize: 1000,
      numCash: '',
      userName: '',
      pageIndex: 1,
      extendobj: 0,
      numberList: []



    }
  },
  mounted() {
    this._getUserInfo()
    this._myProfit()
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.munDteail', { click: true })
      console.log(this.scroll)
    })

  },
  methods: {
    switchItem(index) {
      this.curIndex = index
      if (index == 0) {
        this._myProfit()
      } else {
        this._myCash()

      }

    },
    BecomMember(flag) {
      this.becomMemberCon = flag
    },

    _myProfit() {
      myProfit({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        console.log('收益', res)
        if (res.code === 0) {
          this.numberList = res.data
          // this.extendobj = res.extendobj
        } else {
          this.numberList = ''
        }
      })
    },
    getMyCashMoney() {
      this.becomMemberCon = true

    },
    payBtm() {
      
      if (isNaN(this.numCash.trim())) {
        Toast('请输入数字金额')
      } else if (!this.numCash.trim()) {
        Toast('金额不能为空')
      } else if (!this.userName) {
        Toast('姓名不能为空')
      } else {
        this._getMyCash()
      }

    },
    _getMyCash() {

      getMyCash({
        UserCashPrice: this.numCash,
        VideoUserName: this.userName,
        openid: this.userObj.OpenId
      }).then(res => {
        console.log('提现', res)
        if (res.code === 0) {
          Toast('提现成功')
          this._getUserInfo()
          this.becomMemberCon = false
          // this.curIndex = 1
        } else if (res.code === 1) {
          Toast(res.msg)
        }
      })
    },
    _myCash() {
      myCash({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        console.log('提现', res)
        if (res.code === 0) {
          this.numberList = res.data
          // this.extendobj = res.extendobj
        } else {
          this.numberList = ''
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
          this.extendobj = this.userObj.money
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
  font-size: 0.28rem;
  background: #ffffff;
  height: 100%;
  width: 100%;
  position: absolute;
}
.titleItem {
  margin-top: 0.52rem;
}
.titleName {
  font-size: 0.3rem;
  color: #474747;
}
.titleNum {
  font-size: 0.73rem;
  color: #c5a064;
  margin-top: 0.3rem;
}
.handle {
  width: 1.82rem;
  height: 0.58rem;
  font-size: 0.35rem;
  color: #ffffff;
  background: #c5a064;
  border-radius: 0.05rem;
  margin-top: 0.4rem;
}
.interalCon {
  width: 6.9rem;
  margin: 0 auto;
  background-color: #fff;
  padding: 0 0.4rem;
  position: relative;
  margin-top: 0.32rem;
  -webkit-border-radius: 0.2rem;
  -moz-border-radius: 0.2rem;
  border-radius: 0.2rem;
  box-shadow: 0px 0px 2px 0px #f5f5f5;
  border: 1px solid #f5f5f5;
}
.tab {
  width: 100%;
  height: 1rem;
  background-color: #fff;
  position: relative;
  top: 0;
  z-index: 10;
}
.tab > .item {
  width: 50%;
  line-height: 1rem;
  text-align: center;
  font-size: 0.28rem;
  color: #505050;
}
.tab > .item > span {
  display: inline-block;
}

.on {
  color: #c5a064;
  border-bottom: 2px solid #c5a064;
}
.munDteail {
  height: 6rem;
  white-space: nowrap;
  overflow: hidden;
}
.munDteail .item {
  width: 100%;
  height: 1.56rem;
  border-bottom: 1px solid #ffffff;
}
.desc {
  color: #c5a064;
  width: 1rem;
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
.becomMember {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 73%;
  background: #ffffff;
  text-align: center;
  color: #8a898a;
  border-radius: 0.2rem;
}
.becomMember > .title {
  background: #c5a064;
  color: #ffffff;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.3rem;
  border-top-right-radius: 0.2rem;
  border-top-left-radius: 0.2rem;
}
.becomMember > .name {
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
.confirm {
  width: 92%;
  height: 0.98rem;
  border: 1px solid #d6d6d6;
  border-radius: 0.1rem;
  font-size: 0.36rem;
  color: #ffffff;
  background: #c5a064;
  margin-top: 0.5rem;
  margin-bottom: 0.33rem;
}
</style>
