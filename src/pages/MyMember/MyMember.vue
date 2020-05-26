<template>
  <div class="container">
    <router-view />
    <header class="head">
      <img class="headBg" src="./img/di.png" alt="" />
      <div class="right row a-c j-c">
        <!-- <img class="rankImg" :src="userObj.HeadImg" alt="" /> -->
        <div class="name">我的团队</div>
      </div>
      <div class="content col a-c j-a">
        <div class="peopleTextCon">
          <div class="peopleText">当前邀请客户</div>
        </div>
        <div class="peopleNumCon">
          <span class="peopleNum">{{ numberList.length }}</span
          >人
        </div>
      </div>
    </header>
    <div class="interalCon">
      <div class="itemTitle row a-c j-b">
        <div class="titleName">姓名</div>
        <div class="titleTime row a-c j-c">注册时间</div>
        <div class="titlePhone row a-c j-c">电话</div>
        <div class="titlePhone row a-c j-c">当前身份</div>
      </div>
      <div class="munDteail">
        <div>
        <div
          class="item row j-b a-c"
          v-for="(item, index) in numberList"
          :key="index"
        >
          <!-- <div class="row a-c"> -->
            <span class="title" v-if="item.TrueName">{{ item.TrueName }}</span>
            <span class="title" v-else-if="item.NickName">{{
              item.NickName
            }}</span>
            <span class="desc" v-if="item.Createtime">{{
              item.Createtime
            }}</span>
          
            <a :href="'tel:' + item.Telephone" v-if="item.Telephone"><div class="phone" >{{ '****' + item.Telephone.substr(7)}}</div></a>
            <div class="phone" v-else>-</div>
            <div class="shenfen" >{{ item.GroupName }}</div>
        </div>
        <van-divider v-if="numberList.length > 4" style="padding-bottom:.5rem">没有更多数据了</van-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { myNumber } from 'api/index'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
     pageSize:1000,
     pageIndex:1,
     numberList:[],
    

    }
  },
  computed:{
   

  },
  mounted() {
    this._myNumber()
   
  },
  created(){
      // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.munDteail', { click: true })
      console.log(this.scroll)
    })

  },
  methods: {
    _myNumber() {
      myNumber({
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.numberList = res.data
         
          
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
  font-size: 0.28rem;

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
  top: 0.6rem;
  color: #ffffff;
  width: 100%;
}
.container .head .content .left .name,
.right .name {
  font-size: 0.35rem;
}
.rankImg {
  width: 0.4rem;
  height: 0.4rem;
}
.peopleNum {
  font-size: 0.72rem;
}
.peopleNumCon {
  color: #c5a064;
  font-size: 0.35rem;
}
.container .head .content .left .rankNum,
.right .rankNum {
  font-size: 0.72rem;
}
.peopleTextCon {
  width: 100%;
  padding-left: 0.34rem;
  color: #474747;
  font-size: 0.3rem;
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

  background-color: #fff;
  padding: 0 0.4rem;
  position: relative;
  margin-top: 3.2rem;
  border-radius: 0.2rem;
}
.itemTitle {
  width: 100%;
  height: 0.85rem;
  border-bottom: 1px solid #f5f5f5;
  font-size: .3rem;
  white-space: nowrap;
}
.titlePhone {
  width: 1.76rem;
  height: 0.85rem;
}
.titleTime {
  width: 2.39rem;
  height: 0.85rem;
}
.container .interalCon .item {
  width: 100%;
  height: 1.56rem;
  border-bottom: 1px solid #ffffff;
  white-space: nowrap;
}

.container .interalCon .item .title {
  font-size: 0.28rem;
  color: #474747;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width:1rem;
}

.container .interalCon .item .desc {
  font-size: 0.28rem;
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
.munDteail{
  height: 6rem;
 white-space: nowrap;
 overflow: hidden;
}
.phone{
  
  color: #808080;
  font-size: .28rem;
  text-align: center;
  min-width: 1.2rem;

}
.shenfen{
 color: #c5a064;
  min-width: 1.2rem;
  font-size: .28rem;
  text-align: right;
}
</style>
