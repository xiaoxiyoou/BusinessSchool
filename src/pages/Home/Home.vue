<template>
  <div class="container">
    <!-- <router-view /> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar v-model="active" active-color="#c5a064">
      <van-tabbar-item replace to="/home/index">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? home_icon.active : home_icon.inactive" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/home/Detail">
        <span>导师</span>
        <img slot="icon" slot-scope="props" :src="props.active ? teacher_icon.active : teacher_icon.inactive" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/home/Myself">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? my_icon.active : my_icon.inactive" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
  <!--  -->
</template>
<script type="text/ecmascript-6">

export default {
  data() {
    return {
      active: Number(sessionStorage.getItem('raBarActiveIndex')) || 0,
      my_icon: {
        active: require('./img/wo.png'),
        inactive: require('./img/wo1.png')
      },
      home_icon: {
        active: require('./img/shouye.png'),
        inactive: require('./img/shouye1.png')
      },
      teacher_icon: {
        active: require('./img/kecheng1.png'),
        inactive: require('./img/kecheng.png')
      }

    }
  },
  watch: {
    active(value) {
      //taber 缓存到本地
      sessionStorage.setItem('raBarActiveIndex', value)

    }
  },
  mounted() {

  },


  methods: {

    // switchTo(path) {
    //   // 切换路由
    //   this.$router.replace(path)
    // },



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
}
.btm {
  background: #ffffff;
  width: 100%;
  position: fixed;
  bottom: 0;
  border-bottom: 1px solid #d6d6d6;
  border-left: 1px solid #d6d6d6;
}
.btm > .item {
  width: 33.3%;
  height: 1rem;
  border-top: 1px solid #d6d6d6;
  border-right: 1px solid #d6d6d6;
}
.van-tabbar-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
>>> .van-tabbar-item__icon {
  margin-bottom: 0.05rem;
}
.van-tabbar-item__icon img {
  width: 0.42rem;
  height: 0.39rem;
}
>>> .van-tabbar-item__text {
  line-height: 0.39rem;
  height: 0.39rem;
}
.van-tabbar-item__text span {
  display: block;
  margin-left: 0.2rem;
  font-size: 0.28rem;

  letter-spacing: 1px;
}
</style>
