<template>
  <div class="container">
    <div class="interalCon">
      <div class="itemTitle row a-c j-b">
        <div class="titleName row j-c a-c">邀请码</div>
        <div class="titleTime row a-c j-c">名额数量</div>
        <div class="titlePhone row a-c j-c">操作</div>
      </div>
      <div class="munDetail">
        <div>
          <div class="item row j-b a-c" v-for="(item, index) in numberList" :key="index">
            <span class="title row j-c a-c" v-if="item.CodeNumContent">{{
              item.CodeNumContent
            }}</span>
            <span class="title row j-c a-c" v-else-if="item.NickName">{{
              item.NickName
            }}</span>
            <span class="desc row j-c a-c" v-if="item.CodeNumAttr == 0">0.25</span>
            <span class="desc row j-c a-c" v-if="item.CodeNumAttr == 1">0.5</span>
            <span class="desc row j-c a-c" v-if="item.CodeNumAttr == 2">1</span>
            <div class="handleCon row j-c a-c">
              <div class="handle" v-if="item.CodeNumState == 0" @click="give(item.CodeNumId)">去使用</div>
              <div class="handle" v-if="item.CodeNumState == 1">已使用</div>
            </div>
          </div>
          <van-divider v-if="numberList.length > 4" style="padding-bottom:.5rem">没有更多数据了</van-divider>
          <noMessage :noinfoShow="noinfoShow"/>
        </div>
      </div>
      <!-- 生成邀请码 -->
      <div class="codeCardWrapper" v-if="codeCard">
        <div class="code_mask" @click="closeCard()"></div>
        <div class="codeCardCon">
          <img class="close" src="./img/close.png" @click="closeCard()" alt="">
          <img class="real_pic" :src="dataURL" alt="">
          <div class="codeCard col a-c" v-if="codeCardcontent" ref="imageWrapper">
            <img class="codeCardImg" src="./img/banner1.png" alt="">
            <div class="itemFirst-wrapper">
              <div class="itemFirst row j-b a-c">
                <img class="avatar" :src="extendobj.HeadImg" alt="">
                <div class="textCon col j-b">
                  <div class="NickName">{{extendobj.NickName}}</div>
                  <div class="NickText">加入繁星学社 线上交流学院</div>
                </div>
                <div class="img-con row j-c a-c">
                  <img class="img" :src="codeImg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { myInvitation, getQrcodeUserBuy, getQrcodeBuy } from 'api/index'
import html2canvas from 'html2canvas'
import BScroll from 'better-scroll'
import { Toast } from 'vant';
import noMessage from 'components/noMessage'
export default {
  data() {
    return {
      pageSize: 1000,
      noinfoShow :false,
      pageIndex: 1,
      dataURL: '',
      codeCard: false,
      numberList: [],
      extendobj: {},
      codeImg: '',
      codeCardcontent: true


    }
  },
  mounted() {
    this._myInvitation()

  },
  created() {
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.munDetail', { click: true })
      console.log(this.scroll)
    })

  },
  methods: {
    _myInvitation() {
      myInvitation({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        console.log('我的邀请码', res)
        if (res.code === 0) {
          this.numberList = res.data
        }else{
           this.noinfoShow =true
        }
      })
    },
    give(flag) {
      console.log('flag', flag)
      Toast.loading({
        message: '生成中...',
        forbidClick: true
      });
      this._getQrcodeUserBuy(flag)
      this.codeCard = true

    },
    // 关闭邀请卡
    closeCard() {
      this.codeCard = false
    },
    // 邀请码和用户信息接口
    _getQrcodeUserBuy(codeId) {
      getQrcodeUserBuy({
        codeId: codeId,
      }).then(res => {
        console.log('邀请码和用户信息接口', res)
        this.extendobj = res.extendobj
        this._getQrcodeBuy(res.data.CodeNumContent, res.data.VideoUserId);
      })
    },
    // 邀请码和用户信息接口
    _getQrcodeBuy(shareCode, shareUserId) {
      getQrcodeBuy({
        shareCode: shareCode,
        shareUserId: shareUserId
      }).then(res => {
        console.log('我的邀请码二维码接口', res)
        this.codeImg = res
        setTimeout(() => {
          this.toImage()
        }, 1000);
      })
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
        Toast.clear();
        this.codeCardcontent = false

      });
    },
  },
  components: {
      noMessage
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
.container .interalCon {
  width: 6.9rem;
  margin: 0 auto;
  background-color: #fff;
  padding: 0 0.4rem;
  position: relative;
  margin-top: 0.32rem;
  border-radius: 0.2rem;
}
.munDetail {
  height: 9rem;
  white-space: nowrap;
  overflow: hidden;
}
.container .interalCon .item {
  width: 100%;
  height: 1.56rem;
  border-bottom: 1px solid #ffffff;
}
.container .interalCon .item .desc {
  font-size: 0.32rem;
  color: #808080;
  width: 2.39rem;
}
.itemTitle {
  width: 100%;
  height: 0.85rem;
  border-bottom: 1px solid #f5f5f5;
}
.titleName,
.title {
  width: 0.92rem;
  height: 0.85rem;
}
.titleTime {
  width: 2.39rem;
  height: 0.85rem;
}
.titlePhone {
  width: 1.76rem;
  height: 0.85rem;
}
.handleCon {
  height: 0.85rem;
  width: 1.76rem;
}
.handle {
  width: 1.35rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.26rem;
  color: #f5f5f5;
  background-color: #c5a064;
  border-radius: 0.06rem;
}

.codeCardWrapper {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.codeCardCon {
  height: 100%;
  width: 100%;
}
.code_mask {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0.3;
}
.codeCard {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  position: fixed;
}
.real_pic {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  position: fixed;
  width: 4.9rem;
  height: 8.69rem;
}
.codeCardImg {
  width: 4.9rem;
  height: 7.07rem;
}
.close {
   width: 0.5rem;
  height: 0.5rem;
  top: 1rem;
  position: fixed;
  right: .5rem;
  z-index: 1002;
}
.codetext {
  position: absolute;
  top: 7rem;
}
.itemFirst {
  width: 100%;
  padding: 0 0.25rem;
  height: 1.6rem;
  z-index: 1000;
  background: #ffffff;
}

.itemFirst > .img-con {
  height: 1.32rem;
  width: 1.32rem;
  background: #ffffff;
}

.itemFirst > .img-con > .img {
  width: 1.2rem;
  height: 1.2rem;
}
.avatar {
  width: 0.71rem;
  height: 0.71rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
.textCon {
  text-align: left;
  height: 0.71rem;
}
.NickName {
  font-size: 0.25rem;
}
.NickText {
  color: #969696;
  font-size: 0.2rem;
  white-space: nowrap;
}
</style>
