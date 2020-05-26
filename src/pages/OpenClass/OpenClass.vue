<template>
  <div class="container ">
    <div class="content">
      <img class="banner" src="./img/banner1.png" alt="" />
      <div class="wrapper">
        <div class="title">学习可添加区域经理电话如下：</div>
        <div class="word">
          吴帝伯老师经营模式分析课程，参加学习添加孝子部落三大区域经理微信号码拉您进群！
        </div>
        <div v-for="(item, index) in msgObj" :key="index">
          <div class="word main-top">{{ item.title }}</div>
          <div class="word">
            {{ item.top }}
          </div>
          <div class="row  main-top">
            <span class="peopleName height" style="white-space: nowrap;"
              >{{ item.name }}：</span
            >
            <div style="white-space: nowrap;">
              <div class="">
                <span class="hover height"
                  ><a style="color: red;" :href="'tel:' + item.phone">{{
                    item.phone
                  }}</a></span
                >
              </div>
              <div class="main-top height">
                <span class="hover Name" @click="wxCode(item.index)"
                  >扫码添加微信</span
                >
              </div>
            </div>

            <div class="" style="white-space: nowrap;margin-left: .1rem;">
              <div class="height row a-c">
                <img class="phoneImg" src="./img/hand.png" />点击可直接拨打电话
              </div>
              <div class="main-top  height row a-c">
                <img class="phoneImg" src="./img/hand.png" />点击可直接扫码
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
     <!-- 二维码 -->
      <div class="wxcon" v-if="wxcon">
        <div class="mask" @click="close()"></div>
        <div class="wxImgCon col a-c j-c">
          <img
            class="wxImg"
            :src="bannerHover"
            alt=""
          />
          <div style="color: #8a898a;margin: 0 auto;">扫码或长按添加微信号</div>
        </div>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      msgObj:[
        {index:1,title:'第一区域：',top:'辽宁、河南、湖南、湖北、江西、四川、云南、贵州、西藏、重庆',name:'马丹',phone:13166734913},
        {index:2,name:'梁迎祥',phone:13166714319},
        {index:3,title:'第二区域：',top:'黑龙江、吉林、山东、安徽、江苏、浙江、福建、上海、甘肃、宁夏、新疆、青海、陕西',name:'陈虹帆',phone:15541567913},
        {index:4,name:'杨丽静',phone:15541978413},
        {index:5,title:'第三区域：',top:'内蒙古、河北、山西、天津、北京、海南、广东、广西、台湾、香港、澳门',name:'刘容好',phone:13166679153},
        {index:6,name:'王占新',phone:13166788913}
      ],
      imgArr: ['1.png', '2.png', '3.png','4.png', '5.png', '6.png'],
      imgIndex:0,
      wxcon:false


    }
  },
  computed: {
    bannerHover() {
      return require("./img/" + this.imgArr[this.imgIndex])
    }
  },
  mounted() {
      // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.container', { click: true })
    })

  },
  methods: {
    wxCode(flag){
      console.log('flag',flag)
      this.imgIndex = flag -1
      this.wxcon= true

    },
    close(){
      this.wxcon= false
    }
  },
  components: {

  }
}
</script>
<style scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ffffff;
  z-index: 999;
  font-size: 0.28rem;
}
.wrapper {
  padding: 0 0.2rem;
}
.banner {
  width: 100%;
  height: 3.21rem;
}
.title {
  color: #15254b;
  font-size: 0.4rem;
  font-weight: 700;
  margin: 0.25rem 0;
}
.word {
  font-size: 0.28rem;
  line-height: 0.5rem;
}
.height {
  height: 0.6rem;
  line-height: 0.6rem;
}
.main-top {
  margin-top: 0.2rem;
}
.hover {
  color: red;
  background: yellow;
  margin-right: 0.1rem;
}
.phoneImg {
  width: 0.4rem;
  height: auto;
}
.peopleName {
  width: 1.3rem;

  font-weight: 700;
}
.mask {
    width: 100%;
    height: 100%;
    background-color: #000;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    opacity: 0.3;
}
.wxImgCon {
    width: 4rem;
    height: 4rem;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1001;
    transform: translate(-50%, -50%);
    padding: .2rem;
    background: #ffffff;
    border-radius: .2rem;
}
.wxImg {
    width: 3.5rem;
    height: 3.5rem;
    /* padding: .2rem; */
    background: #ffffff;
    border-radius: .2rem;
}

</style>
