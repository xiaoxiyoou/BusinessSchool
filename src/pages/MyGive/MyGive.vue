<template>
  <div class="container">
    <nav class="tab row a-c">
      <div class="item" v-for="(item, index) in tabList" :key="index" @click="switchItem(index)">
        <span :class="{ on: curIndex === index }">{{ item.txt }}</span>
      </div>
    </nav>
    <div class="videoListCon">
      <ul class="videoList" ref="videoList" :class="{ minHeight: hasVerticalScroll}">
        <li class="item row border-bottom-1px j-c a-c" v-for="(item, index) in videoList" :key="index">
          <img class="itemImg" :src="item.FreeCodeImg" alt="" />
          <div class="itemInfo col j-b">
            <div class="infoTitle">
              <div class="title">{{ item.FreeCodeTitle }}</div>
              <div class="desc">{{ item.FreeCodeRemark }}</div>
            </div>
            <div class="infoData row j-b a-c">
              <!-- <div class="viewNum">{{ item.FreeCodeRemark }}</div> -->
              <div class="integral" @click="give(item.FreeCodeId)" v-if="item.FreeCodeState == 0">赠 送</div>
              <div class="integral2" v-if="item.FreeCodeState == 1">已赠送</div>
              <div class="integral3" v-if="item.FreeCodeState == 2">已失效</div>
            </div>
          </div>
        </li>
      </ul>

    </div>
    <div class="noinfoCon col a-c j-c" v-if="noinfoShow">
      <img class="noinfo" src="./../../assets/img/noInfo.png" alt="" />
      <div>暂无内容</div>
    </div>
    <!-- 生成邀请码 -->
    <div class="codeCardWrapper" v-if="codeCard">
      <div class="code_mask" @click="closeCard()"></div>
      <div class="codeCardCon">

        <img class="real_pic" :src="dataURL" alt="">
        <div class="codeCard col a-c" v-if="codeCardcontent" ref="imageWrapper">
          <img class="codeCardImg" src="./img/banner2.png" alt="">
          <div class="couerseTitle row j-c a-c">{{courseTitle}}</div>
          <div class="itemFirst-wrapper">
            <div class="itemFirst row j-b a-c">
              <div class="row a-c">
                <img class="avatar" :src="extendobj.HeadImg" alt="">
                <div class="textCon col j-b">
                  <div class="NickName">{{extendobj.NickName}}</div>
                  <div class="NickText">加入繁星学社殡葬人的商学院</div>
                </div>
              </div>
              <div class="img-con row j-c a-c">
                <img class="img" :src="codeImg" alt="" />
              </div>
            </div>
          </div>
          <div class="tip">长按图片保存分享给好友</div>
          <img class="close" src="./img/close.png" @click="closeCard()" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { myGiveData, getQrcodeUserGive, getQrcodeGive } from 'api/index'
import html2canvas from 'html2canvas'
import BScroll from 'better-scroll'
import { Toast } from 'vant';
export default {
  data() {
    return {
      videoList: [],
      tabList: [
        { txt: '可赠送' },
        { txt: '已送出' },
        { txt: '已失效' }
      ],
      curIndex: 0,
      pageIndex: 1,
      noinfoShow: false,
      pageSize: 1000,
      extendobj: {},
      codeImg: '',
      dataURL: '',
      codeCard: false,
      hasVerticalScroll: false,
      courseTitle: '',
      codeCardcontent: true


    }
  },
  mounted() {

    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.videoListCon', { click: true })
      this.hasVerticalScroll = !this.scroll.hasVerticalScroll
    })


  },
  created() {
    this._myGiveData('', 0)
  },
  methods: {
    switchItem(index) {
      this.curIndex = index
      if (index == 0) {
        this._myGiveData('', 0)
      } else if (index == 1) {
        this._myGiveData('', 1)
      } else {
        this._myGiveData('', 2)
      }
    },


    _myGiveData(isfail, codestate) {
      myGiveData({
        pageIndex: this.pageIndex,
        isfail,
        codestate,
        pageSize: this.pageSize
      }).then(res => {
        console.log('有效课程', res)
        if (res.code === 0) {
          this.videoList = res.data
          this.noinfoShow = false
        } else if (res.code === 1) {
          this.videoList = ''
          this.noinfoShow = true
        }
      })
    },


    give(flag) {
      Toast.loading({
        message: '生成中...',
        forbidClick: true
      });
      console.log('flag', flag)
      this._getQrcodeUserGive(flag)
      this.codeCard = true
    },
    // 关闭邀请卡
    closeCard() {
      this.codeCard = false
    },
    // 邀请码和用户信息接口
    _getQrcodeUserGive(codeId) {
      getQrcodeUserGive({
        FreeCodeId: codeId,
      }).then(res => {
        console.log('邀请码和用户信息接口', res)
        this.extendobj = res.extendobj
        this.courseTitle = res.data.FreeCodeTitle
        console.log('this.courseTitle ', this.courseTitle)
        this._getQrcodeGive(res.data.FreeCodeContent, res.data.VideoUserId);
      })
    },
    // 邀请码和用户信息接口
    _getQrcodeGive(freeCode, shareUserId) {
      console.log('freeCode', freeCode)
      console.log('shareUserId', shareUserId)
      getQrcodeGive({
        freeCode: freeCode,
        shareUserId: shareUserId
      }).then(res => {
        console.log('我的邀请码二维码接口', res)
        this.codeImg = res
        setTimeout(() => {
          this.toImage()
        }, 1100);
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
        // this.codeCardcontent = false

      });
    },

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
.videoListCon {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 1.05;
}
.videoList {
  padding-bottom: 2rem;
  margin-top: 1.05rem;
  /* min-height: 15rem; */
}
.minHeight {
  min-height: 15rem;
}
.videoList > .item {
  background: #ffffff;
  height: 2.31rem;
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

.videoList > .item > .itemImg {
  width: 2.9rem;
  height: 1.65rem;
  border-radius: 0.05rem;
}
.videoList > .item > .itemInfo {
  height: 1.65rem;
  width: 3.2rem;
  margin-left: 0.43rem;
}
.videoList > .item > .itemInfo > .infoTitle > .title {
  color: #2d2d2d;
  font-weight: 700;
  font-size: 0.3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}
.videoList > .item > .itemInfo > .infoTitle > .desc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  color: #8a898a;
}
.videoList > .item > .itemInfo > .infoData > .viewNum {
  color: #8a898a;
}
.videoList > .item > .itemInfo > .infoData > .integral {
  color: #ec8c4b;
  width: 1.16rem;
  height: 0.47rem;
  line-height: 0.47rem;
  text-align: center;
  font-size: 0.26rem;
  color: #f5f5f5;
  background-color: #c5a064;
  -webkit-border-radius: 0.06rem;
  -moz-border-radius: 0.06rem;
  border-radius: 0.06rem;
}
.videoList > .item > .itemInfo > .infoData > .integral2 {
  color: #ec8c4b;
  width: 1.16rem;
  height: 0.47rem;
  line-height: 0.47rem;
  text-align: center;
  font-size: 0.26rem;
  color: #f5f5f5;
  background-color: #d1bc9a;
  -webkit-border-radius: 0.06rem;
  -moz-border-radius: 0.06rem;
  border-radius: 0.06rem;
}
.videoList > .item > .itemInfo > .infoData > .integral3 {
  color: #ec8c4b;
  width: 1.16rem;
  height: 0.47rem;
  line-height: 0.47rem;
  text-align: center;
  font-size: 0.26rem;
  color: #f5f5f5;
  background-color: #dcdcdc;
  -webkit-border-radius: 0.06rem;
  -moz-border-radius: 0.06rem;
  border-radius: 0.06rem;
}
.noinfo {
  width: 100%;
  height: auto;
}
.noinfoCon {
  color: #8a898a;
  position: absolute;
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
  opacity: 0.6;
}
.codeCard {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 6.25rem;
  height: 8.36rem;
  position: fixed;
}
.real_pic {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  position: fixed;
  width: 6.25rem;
  height: 8.36rem;
}
.codeCardImg {
  width: 6.25rem;
  height: 6.4rem;
}
.tip {
  color: #ffffff;
  font-size: 0.3rem;
  /* margin: .3rem 0 .38rem; */
  position: absolute;
  bottom: -0.5rem;
}
.close {
  width: 0.5rem;
  height: 0.5rem;
  /* top: 1rem;
  position: fixed;
  right: .5rem; */
  position: absolute;
  bottom: -1.3rem;
  z-index: 1002;
}
.codetext {
  position: absolute;
  top: 7rem;
}
.couerseTitle {
  width: 3.82rem;
  height: 1.59rem;
  /* line-height: 1.59rem; */
  font-size: 0.4rem;
  text-align: center;
  position: absolute;
  top: 4.04rem;
  color: #192548;
}
.itemFirst {
  width: 6.25rem;
  padding: 0 0.25rem;
  height: 1.96rem;
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
  margin-right: .2rem;
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
