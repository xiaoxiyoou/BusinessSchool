<template>
  <div class="container">
    <div id="app">
      <div class="tablexqys" ref="imageWrapper">
        <!-- 第一版底部 -->
        <div class="itemFirst-wrapper" v-if="text">
          <div class="itemFirst row a-c">
            <img class="avatar" :src="userObj.HeadImg" alt="">
            <div class="textCon col">
              <div class="NickName">{{userObj.NickName}}</div>
              <div class="NickText row j-b">
                <div>欢迎加入</div>
                <div>繁星学社</div>
              </div>
              <div class="NickText">殡葬人线上交流学院</div>
            </div>
            <div class="img-con col j-c a-c">
              <img class="img" :src="codeImg" alt=""/>
              <div class="">马上扫码加入</div>
            </div>
          </div>
        </div>
        <div class="col j-b">
          <img v-if="predictImg" id="predictImg" :src="dataURL" alt="" />
          <div class="btm-share">长按保存图片，或者将图片发给朋友</div>

        </div>
        <div class="btm-con col a-c j-b">
          <div class="btm-hover-con  row a-c">
            <div @click.stop="imgHover(1)" :class="{ imghover: banner1 }" class="btm-img-con col j-c a-c "></div>
            <img class="btm-img" src="./img/banner11.png" />
            <div @click.stop="imgHover(2)" class="btm-img-con  btm-img-con-hover  col j-c a-c " :class="{ imghover: banner2 }"></div>
            <img class="btm-img1" src="./img/banner21.png" />
            <div @click.stop="imgHover(3)" class="btm-img-con  btm-img-con-hover  col j-c a-c" :class="{ imghover: banner3 }" style="left: -2rem;"></div>
            <img class="btm-img1" src="./img/banner31.png" style="left: -3.13rem;" />
          </div>
        </div>
        <img class="swiper-img" ref="bannerHover" :src="bannerHover" alt="" />
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import html2canvas from 'html2canvas'
import { getQrcode, getUserInfo } from 'api/index'
import { Toast } from 'vant';
export default {
  data() {
    return {
      dataURL: '',
      banner1: true,
      banner2: false,
      banner3: false,
      imgArr: ['banner1.png', 'banner2.png', 'banner3.png'],
      imgIndex: 0,
      predictImg: false,
      userObj: {},
      text: true,
      codeImg: require('./img/message.png')


    }
  },
  computed: {
    bannerHover() {
      return require("./img/" + this.imgArr[this.imgIndex])
    }
  },
  mounted() {

    Toast.loading({
      message: '生成中...',
      forbidClick: true
    });
    this._getUserInfo()
  },
  methods: {
    imgHover(flag) {
      Toast.loading({
        message: '生成中...',
        forbidClick: true
      });
      this.predictImg = false
      this.imgIndex = flag - 1
      if (flag == 1) {
        console.log('this.banner1', this.banner1)
        this.banner1 = true
        this.banner2 = false
        this.banner3 = false

      } else if (flag == 2) {
        this.banner1 = false
        this.banner2 = true
        this.banner3 = false
      } if (flag == 3) {
        this.banner1 = false
        this.banner2 = false
        this.banner3 = true
      }
      this.text = true
      setTimeout(() => {
        this.toImage()
      }, 1000);


    },
    toImage() {
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null,
        useCORS: true, // （图片跨域相关）
        allowTaint: true, // 允许跨域（图片跨域相关）
        width: this.$refs.imageWrapper.offsetWidth,// 设置canvas尺寸与所截图尺寸相同，防止白边
        height: this.$refs.imageWrapper.offsetHeight // 防止白边
      }).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        this.dataURL = dataURL;
        this.predictImg = true
        this.text = false
        Toast.clear();

      });
    },
    // 获取二维码
    _getQrcode(shareUserId) {
      getQrcode({
        shareUserId: shareUserId
      }).then(res => {
        console.log('二维码', res)
        this.codeImg = res
        setTimeout(() => {
          this.toImage()
        }, 1000);
      })
    },
    // 获取个人信息
    _getUserInfo() {
      getUserInfo().then(res => {
        console.log('二维码信息', res)
        if (res.code === 0) {
          let data = res.data
          this.userObj = Object.assign({}, data)
          this._getQrcode(this.userObj.VideoUserId)
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
  height: 100%;
  position: relative;
  font-size: 0.28rem;
}
.avatar {
  width: 0.71rem;
  height: 0.71rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  margin-right: .1rem;
}
.textCon {
  text-align: left;
  /* height: 0.8rem; */
}
.NickName {
  font-size: 0.25rem;
}
.NickText {
  color: #969696;
  font-size: 0.23rem;
  width: 2rem;
  white-space: nowrap;
  /* margin-top: .05rem; */
}
#app {
  text-align: center;
  position: relative;
  padding-top: 0.2rem;
}

.swiper-pagination {
  position: relative;
}

.swiper-img {
  width: 6.25rem;
  height: 8.34rem;
  position: relative;
  z-index: 1;
}

.tablexqys {
  position: relative;
  z-index: 1;
  width: 6.25rem;
  height: 8.34rem;
  margin: 0 auto;
}

.itemFirst {
  position: absolute;
  bottom: 0rem;
  width: 100%;
  padding: 0 0.25rem;
  height: 1.86rem;
  z-index: 1000;
  left: 50%;
  transform: translate(-50%, 0%);
}

.itemFirst > .img-con {
  height: 1.7rem;
  width: 1.44rem;
  background: #ffffff;
  position: absolute;
  right: .18rem;
  font-size: .21rem;
}

.itemFirst > .img-con > .img {
  width: 1.2rem;
  height: 1.2rem;
  
}

.itemSecond-wrapper {
  display: none;
}

.itemSecond {
  position: absolute;
  z-index: 2;
  bottom: 1rem;
  left: 50%;
  transform: translate(-50%, 0%);
}

.itemSecond > .shopCon {
  text-align: left;
  min-height: 1rem;
  width: 2.27rem;
}

.itemSecond > .shopCon > .text {
  font-size: 0.16rem;
  white-space: nowrap;
  padding-bottom: 0.1rem;
}

.itemSecond > .shopCon > .shopname {
  font-size: 0.2rem;
  font-weight: 700;
}

.itemSecond > .img-wrapper {
  width: 1.35rem;
  height: 1.35rem;
  border: 1px solid #331036;
  position: relative;
}

.leftBuff {
  width: 0.4rem;
  position: absolute;
  left: -0.3rem;
  top: -0.4rem;
}

.rightBuff {
  width: 0.3rem;
  position: absolute;
  left: 1.18rem;
  top: 1.12rem;
}

.itemSecond > .img-wrapper > .img-con {
  height: 1.25rem;
  width: 1.25rem;
  background: #ffffff;
}

.itemSecond > .img-wrapper > .img-con > .img {
  width: 1.15rem;
  height: 1.15rem;
}

/* 第三版 */
.itemThird-wrapper {
  display: none;
}

.itemThird {
  position: absolute;
  z-index: 2;
  bottom: 0.5rem;
  left: 50%;
  transform: translate(-50%, 0%);
  color: #ffffff;
}

.itemThird > .shopCon {
  text-align: left;
  min-height: 1.3rem;
  width: 2.5rem;
}

.itemThird > .shopCon > .shopname {
  font-size: 0.25rem;
  font-weight: 700;
}

.itemThird > .shopCon > .text {
  font-size: 0.16rem;
  white-space: nowrap;
}

.itemThird > .shopCon > .text-tip {
  font-size: 0.2rem;
  white-space: nowrap;
}

.itemThird > .img-wrapper {
}

.itemThird > .img-wrapper > .img-con {
  height: 1.5rem;
  width: 1.5rem;
  background: #ffffff;
}

.itemThird > .img-wrapper > .img-top {
  height: 0.37rem;
  width: 0.34rem;
  position: absolute;
  right: -0.25rem;
  top: -0.37rem;
}

.itemThird > .img-wrapper > .img-con > .img {
  width: 1.38rem;
  height: 1.38rem;
}

.btm-share {
  width: 100%;
  font-size: 0.32rem;
  border-radius: 0.08rem;
  color: #4c4c4c;
  text-align: center;
  font-size: 0.27rem;
  position: absolute;
  margin-top: 0.2rem;
  top: 8.43rem;
}

.btm-img {
  height: 1.21rem;
  width: 1.01rem;
  position: relative;
  z-index: -1;
  left: -1.13rem;
}

.btm-img1 {
  height: 1.21rem;
  width: 1.01rem;
  position: relative;
  z-index: -1;
  left: -2.13rem;
}

.btm-img-con-hover {
  left: -1rem;
}

.btm-img-con {
  border: 0.02rem solid #e2e2e2;
  height: 1.49rem;
  width: 1.25rem;
  margin-left: 0.22rem;
  position: relative;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0);
}

.btm-hover-con {
  height: 1.89rem;
  width: 100%;
  box-shadow: 0 1px 3px rgba(50, 6, 105, 0.4);
  -webkit-box-shadow: 0 1px 3px rgba(50, 6, 105, 0.4);
  z-index: 5;
  left: 0;
  bottom: 0;
  position: fixed;
}

.imghover {
  border: 0.02rem solid #e9bd77;
  background: url(./img/trian.png) no-repeat right top;
  background-size: 0.3rem 0.3rem;
}

#predictImg {
  width: 6.25rem;
  height: 8.34rem;
  left: 50%;
  transform: translate(-50%, 0%);
  position: absolute;
  z-index: 100;
}

.btm-con {
  left: 0;
  height: 2.55rem;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
