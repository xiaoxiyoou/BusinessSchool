<template>
  <div class="content">
    <div class="top">
      <span @click="toPhoneBound">手机绑定</span>
      <img @click="toSetting" class="setting" src="./img/shezhi.png" alt="" />
    </div>
    <img class="avatar" :src="userObj.HeadImg" alt="" />
    <div class="name">{{ userObj.NickName }}</div>
    <nav class="navCon row">
      <div class="navItem col j-c a-c" @click="switchTo('/MyApply')">
        <img class="itemImg" src="./img/course.png" />
        <div class="item row j-c a-c">已购课程</div>
      </div>
      <div class="navItem col j-c a-c" @click="switchTo('/MyGive')">
        <img class="itemImg" src="./img/give.png" />
        <div class="item row j-c a-c">赠课资格</div>
      </div>
      <div class="navItem col j-c a-c" @click="switchTo('/MyInvitation')">
        <img class="itemImg" src="./img/code.png" />
        <div class="item row j-c a-c">我的邀请码</div>
      </div>
    </nav>
    <nav class="navCon row">
      <div class="navItem col j-c a-c" @click="switchTo('/MyExtension')">
        <img class="itemImg" src="./img/extion.png" />
        <div class="item row j-c a-c">我的推广</div>
      </div>
      <div class="navItem col j-c a-c" @click="switchTo('/MyIntegral')">
        <img class="itemImg" src="./img/interger.png" />
        <div class="item row j-c a-c">我的积分</div>
      </div>
      <div class="navItem col j-c a-c" @click="switchTo('/MyProfit')">
        <img class="itemImg" src="./img/money.png" />
        <div class="item row j-c a-c">我的收益</div>
      </div>
      </nav>
      <nav class="navCon row">
      <div class="navItem col j-c a-c" @click="switchTo('/MyMember')">
        <img class="itemImg" src="./img/people.png" />
        <div class="item row j-c a-c">我的团队</div>
      </div>
      <div class="navItem col j-c a-c" @click="switchTo('/MyEnroll')">
        <img class="itemImg" src="./img/offline.png" />
        <div class="item row j-c a-c">线下报名</div>
      </div>
      <div class="navItem col j-c a-c" @click="switchTo('/MyFeedback')">
        <img class="itemImg" src="./img/judge.png" />
        <div class="item row j-c a-c">意见反馈</div>
      </div>
      </nav>
   
  </div>
</template>
<script type="text/ecmascript-6">
import { getUserInfo } from 'api/index'
export default {
  data() {
    return {
       userObj: {}


    }
  },
  mounted() {
     this._getUserInfo()

  },
  methods: {
     _getUserInfo(){
      getUserInfo().then(res=>{
        console.log(res)
        if(res.code === 0){
          let data = res.data
          this.userObj = Object.assign({}, data)
        }
      })
    },
   toPhoneBound(){
      this.$router.push({
        path: '/PhoneBound'
      })
    },
     toSetting(){
      this.$router.push({
        path: '/Setting'
      })
    },
    switchTo(path) {
      // 切换路由
      this.$router.push(path)
    }
  },
  components: {

  }
}
</script>
<style scoped>
.content{
  height: 5rem;
  background: #ffffff;
}
.top {
  width: 100%;
  height: 1.84rem;
  background: url("./img/di.png") no-repeat;
  background-size: cover;
  position: relative;
}
.top span {
  position: relative;
  left: 0.3rem;
  top: 0.2rem;
  font-size: 0.25rem;
  color: #fff;
}
.top .setting {
  position: absolute;
  right: 0.3rem;
  top: 0.2rem;
  width: 0.36rem;
}
.avatar {
  position: absolute;
  top: 0.9rem;
  left: 50%;
  transform: translateX(-50%);
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}
.name {
  position: absolute;
  top: 2.5rem;
  left: 50%;
  font-weight: 450;
  transform: translateX(-50%);
  font-size: 0.3rem;
  color: #000;
}

.navCon {
  width: 100%;
  top: 1.2rem;
  position: relative;
 
}
.navItem {
  background: #ffffff;
  width: 2.5rem;
  height: 1.75rem;
 
}
.navItem .item {
  margin-top: .1rem;

}
.navItem :last-child {
  margin-right: 0;
}
.itemImg {
  width: 0.73rem;
}
.itemName {
  margin-top: 0.16rem;
  color: #1c1c1c;
  font-size: 0.27rem;
}
</style>
