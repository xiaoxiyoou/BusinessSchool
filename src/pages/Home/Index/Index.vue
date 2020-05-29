<template>
  <div v-show="pageShow">
    <div class="pageShow">
      <div class="content">
        <div class="topCon row a-c j-b">
          <div class="row a-c" @click="setting()">
            <img class="avatar" :src="userObj.HeadImg" alt="">
            <div>{{userObj.NickName}}</div>
            <div v-if="userObj.groupName != '游客'" style="margin-left:15px;color:#c5a064">{{userObj.groupName}}</div>
          </div>
          <div class="sign" @click="_toSign">{{userObj.issign === 0 ? '签到' : '已签到'}}</div>
        </div>
        <!-- 轮播 -->
        <van-swipe v-if="pageShow" :autoplay="4000" indicator-color="#c5a064">
          <van-swipe-item v-for="(item, index) in banner" :key="index">
            <img class="swiper-img" v-lazy="item.VideoAdImg" />
          </van-swipe-item>
        </van-swipe>
        <!-- 导航栏 -->
        <div class="navWrapper row j-c a-c">
          <nav class="navCon row a-c border-bottom-1px">
            <div class="navItem col j-c a-c" v-for="(item, index) in navList" :key="index" @click="switchTo(item.path)">
              <img class="itemImg" :src="item.img" alt="" />
              <span class="itemName">{{ item.txt }}</span>
            </div>
          </nav>

        </div>
        <!-- 内容部分 -->
        <section v-if="indexData.length" ref="listCon" class="listCon">
          <div class="manageThink" v-for="(item, index) in indexData" :key="index">
            <!-- 399繁星社员推广广告 -->
            <div v-if="item.VideoCategoryName == '助推课程'  && item.VideoListView " class="bar"></div>
            <div v-if="item.VideoCategoryName == '免费试看'  && item.VideoListView || item.VideoCategoryName == '助推课程'  && item.VideoListView " class="row j-c a-c" style="">
              <img @click="Advertise()" v-for="(item, index) in advImg" :key="index" class="adv-img" :src="item.VideoAdImg" alt="">
            </div>
            <!-- 课程广告 -->
            <div v-if="item.VideoCategoryName == '精品课程' && item.VideoListView" class="row j-c a-c">
              <img v-for="(item, index) in memberImg" :key="index" class="adv-img" :src="item.VideoAdImg" alt="">
            </div>

            <!-- 课程标题 -->
            <div class="bar" v-if="item.VideoListView "></div>
            <div class="title row a-c j-b" v-if="item.VideoListView" @click="lookAll(item.VideoCategoryId)">
              <div class="name">{{item.VideoCategoryName}}</div>
              <div class="lookAll row a-c">更多
                <van-icon name="arrow" />
              </div>
            </div>
            <!-- 课程内容 -->
            <div class="list row j-b f-w" v-if="item.VideoListView" @click="lookAll(item.VideoCategoryId)">
              <div class="item" v-for="(el, index) in item.VideoListView" :key="index">
                <img :src="el.VideoConver" alt="" />
                <div class="itemInfoCon">
                  <div class="itemInfo row j-b">
                    <div class="name">{{el.VideoName}}</div>
                    <div class="integral" v-if="item.VideoListView[index].IsFree == 1">{{el.SalePrice}}元</div>
                    <div class="integral" v-if="el.IsFree == 2">{{el.VideoPrice}}积分</div>
                  </div>
                  <div class="desc">{{el.VideoDesc}}</div>
                </div>
              </div>
            </div>
            <!-- 社员专享 把社员专享放在积分兑换下面-->
            <div class="bar" v-if="item.VideoCategoryName == '积分兑换'"></div>
            <div class="title row a-c j-b" v-if="item.VideoCategoryName == '积分兑换'">
              <div class="name">社员专享</div>

            </div>
            <!-- 课程内容 -->
            <div class="list row j-b f-w" v-if="item.VideoCategoryName == '积分兑换'">
              <div class="item" v-for="(res, index) in geMembertData" :key="index" @click="lookAllnum(res.VideoSectionId)">
                <img :src="res.VideoSectionImg" alt="" />
                <div class="itemInfoCon">
                  <div class="itemInfo row j-b">
                    <div class="name">{{res.VideoSectionTitle}}</div>
                  </div>
                  <div class="desc">{{res.VideoSectionRemark}}</div>
                </div>
              </div>
            </div>
            <!-- 课程广告 -->
            <div class="row j-c a-c" v-if="item.VideoCategoryName == '积分兑换'">
              <img v-for="(item, index) in memberImg" :key="index" class="adv-img" :src="item.VideoAdImg" alt="">
            </div>
            <div class="manageThink" v-if="item.VideoCategoryName == '积分兑换'">
              <div class="bar"></div>
              <div class="title row a-c j-b">
                <div class="name">殡业互联网直播公开课</div>
              </div>
              <div class="propaganda" @click="propaganda()">
                <img class="banner" src="./../../../assets/img/banner.png" alt="">
                <div class="title">《殡业互联网工具营销的10大创新》</div>
                <div class="item row a-c j-b">
                  <div class="row a-c">
                    <img class="look" src="./../../../assets/img/look.png" alt="">
                    <!-- <div class="time">3.15-19日每晚19.00</div> -->
                  </div>
                  <div class="tip">免费</div>
                </div>
              </div>
            </div>
            <div class="barTwo"></div>
            <!-- 城商课程 -->
            <div class="bar" v-if="item.VideoCategoryName == '积分兑换'"></div>
            <div class="title row a-c j-b" @click="lookAllnum(3)" v-if="item.VideoCategoryName == '积分兑换'">
              <div class="name">家族宝诚商专属课程</div>
              <div class="lookAll row a-c">更多
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="list row j-b f-w " v-if="item.VideoCategoryName == '积分兑换'">
              <div class="item" v-for="(res, index) in shopList" :key="index" @click="lookAllnum(3)">
                <img :src="res.VideoConver" alt="" />
                <div class="itemInfoCon">
                  <div class="itemInfo row j-b">
                    <div class="name">{{res.VideoName}}</div>
                  </div>
                  <div class="desc">{{res.VideoDesc}}</div>
                </div>
              </div>
            </div>
            <!-- 帮扶计划 -->
            <div class="bar" v-if="item.VideoCategoryName == '积分兑换'"></div>
            <div class="title row a-c j-b" v-if="item.VideoCategoryName == '积分兑换'" @click="helpLook()">
              <div class="name">帮扶计划</div>
              <div class="lookAll row a-c">更多
                <van-icon name="arrow" />
              </div>
            </div>
            <!-- 课程内容 -->
            <div class="list row j-b f-w " v-if="item.VideoCategoryName == '积分兑换'">
              <div class="item" v-for="(res, index) in helpData" :key="index" @click="helpLook()">
                <img :src="res.VideoSectionImg" alt="" />
                <div class="itemInfoCon">
                  <div class="itemInfo row j-b">
                    <div class="name">{{res.VideoSectionTitle}}</div>
                  </div>
                  <div class="desc">{{res.VideoSectionRemark}}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 399繁星社员推广广告 -->
        <div v-if="advImg" class="col j-c a-c" style="width:100%;background:#ffffff">
          <img @click="Advertise()" v-for="(item, index) in advImg" :key="index" class="adv-img" :src="item.VideoAdImg" alt="">
        </div>
        <!-- 学员见证 -->
        <div class="imgList row f-w j-b">
          <img class="imgItem" v-for="(item,index) in witnessListImg" :key="index" :src="item.VideoCaseConver" alt="" @click="toFeedDetail(item.VideoCaseId)">

        </div>
      </div>
    </div>
    <!-- 首页弹窗 -->
    <div class="qrcodeCon" v-if="qrcodeCon">
      <div class="code_mask" @click.stop="codeCon(false)"></div>
      <div class="qrcodeItem">
        <img class="qrcodeImg" src="./img/indexPop.png" alt="" @click="extiontion()">
        <img class="closeImg" src="./img/close.png" @click.stop="codeCon(false)" alt="">
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getList, NumCategory, getSwiperList, geMembertList, witnessList, getUserInfo, toSign } from 'api/index'
import BScroll from 'better-scroll'
import { Toast } from 'vant';
export default {
  data() {
    return {
      helpData: [
        {
          VideoSectionImg: require('./img/posterTwo.png'),
          VideoSectionTitle: "千恩万谢殡葬礼仪服务有限公司帮扶赋能计划梳理",
          VideoSectionRemark: '1对1帮扶赋能计划'
        },
        {
          VideoSectionImg: require('./img/posterOne.png'),
          VideoSectionTitle: "常州缘起文化传播有限公司帮扶赋能计划梳理",
          VideoSectionRemark: '1对1帮扶赋能计划'


        }
      ],
      qrcodeCon: true,
      pageShow: false,
      userObj: {},
      advImg: [],
      memberImg: [],
      navList: [
        { txt: '课程内容', img: require('./img/yingxiao.png'), path: '/CourseContent' },
        { txt: '线下课程', img: require('./img/liyi.png'), path: '/OfflineCourses' },
        // { txt: '9.9公开课', img: require('./img/9.9.png'), path: '/OpenClass' },
        { txt: '帮扶计划', img: require('./img/help.png'), path: '/OpenClass' },
        { txt: '智库导师', img: require('./img/teacher.png'), path: '/teacher' },
        // { txt: '成为社员', img: require('./img/renwendaguan.png'), path: '/BecomingMember' }
        { txt: '诚商课程', img: require('./img/traesure.png'), path: '/NumCategory?id=3' }
      ],
      indexData: [],
      geMembertData: [],
      witnessListImg: [],
      banner: [],
      shopList: [],
      code: 0


    }
  },
  computed: {


  },
  created() {
    // Toast.loading({
    //   message: '加载中...',
    //   forbidClick: true
    // });
    this._getSwiperList(1)
    this._getSwiperList(3)
    this._getSwiperList(4)
    this._getList()
    this._geMembertList()
    this._witnessList(0)
    this._witnessList(1)
    this._NumCategory()

  },
  // 清除tabar缓存
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem('qrcodeCon', false)
    next();
  },
  mounted() {

    // setTimeout(() => {
    //   }, "1000");
    this._getUserInfo()

    if (sessionStorage.getItem('qrcodeCon') == 'false') {
      sessionStorage.setItem('qrcodeCon', false)
      this.qrcodeCon = false
      console.log('不显示')
    } else {
      sessionStorage.setItem('qrcodeCon', true)
      this.qrcodeCon = true
    }
    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.pageShow', { click: true })
    })

    // setTimeout(() => {
    //   if (this.code != 0) {
    //     this.$router.push({
    //       path: '/login',
    //     })
    //   }
    // }, "10000");


  },

  methods: {
    _NumCategory() {
      NumCategory({
        videoSectionId: 3
      }).then(res => {
        console.log('商家', res)
        this.shopList = res.data.VideoListView.slice(0, 2)

      })

    },
    propaganda() {
      window.location.href = 'https://appt2ipqewv9303.h5.xiaoeknow.com/mp_more/eyJpZCI6IjE5Njk4MzgifQ'
    },
    setting() {
      this.$router.push('/Setting')
    },
    // 关闭弹窗
    codeCon(flag) {
      this.qrcodeCon = flag
    },
    // 首页图片
    _getSwiperList(videoAdCateId) {
      getSwiperList({
        videoAdCateId: videoAdCateId
      }).then(res => {
        console.log("广告", res)
        if (res.code === 0) {
          if (videoAdCateId == 1) {
            console.log('轮播图片', res)
            this.banner = res.data
          } else if (videoAdCateId == 3) {
            console.log('399加入图片', res)
            this.advImg = res.data
          } else if (videoAdCateId == 4) {
            console.log('社员图片', res)
            this.memberImg = res.data
          }
        }
      })
    },
    // 视频内容
    _getList() {
      getList().then(res => {

        console.log('视频内容', res)
        if (res.code === 0) {
          this.indexData = res.data
          this.pageShow = true
          Toast.clear();

        }
      })
    },
    // 学员见证
    _witnessList(cateId) {
      witnessList({
        cateId: cateId
      }).then(res => {
        console.log('学员见证', res)
        if (res.code === 0) {
          this.witnessListImg = res.data.concat(this.witnessListImg)
        }
      })
    },
    helpLook() {
      window.location.href = 'https://appt2ipqewv9303.h5.xiaoeknow.com/mp_more/eyJpZCI6IjI1MDU3MDgifQ'
    },
    switchTo(path) {
      if (path == "/OpenClass") {
        window.location.href = 'https://appt2ipqewv9303.h5.xiaoeknow.com/mp_more/eyJpZCI6IjI1MDU3MDgifQ'
        return false
      }
      // 切换路由
      this.$router.push(path)
      console.log(path)
    },
    // 社员专享
    _geMembertList() {
      geMembertList().then(res => {
        console.log('社员专享', res)
        if (res.code === 0) {
          this.geMembertData = res.data
          console.log(' this.geMembertData', this.geMembertData)
        }
      })
    },
    // 查看课程列表
    lookAll(id) {
      this.$router.push({
        path: '/VideoList',
        query: { id: id }
      })
    },
    // 查看社员课程列表
    lookAllnum(id) {
      this.$router.push({
        path: '/NumCategory',
        query: { id: id }
      })
    },
    // 进入课程详情
    toVideoDetail(videoId) {
      this.$router.push({
        path: '/videodetail',
        query: { id: videoId }
      })
    },
    // 回到我的扩展
    extiontion() {
      this.$router.push({
        path: '/extension',
      })
    },
    // 社员反馈详情
    toFeedDetail(videoId) {
      this.$router.push({
        path: '/FeedbackDetail',
        query: { id: videoId }
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
    // 成为社员
    Advertise() {
      this.$router.push({
        path: '/BecomingMember',
      })
    },
    // 获取用户信息
    _getUserInfo() {
      getUserInfo().then(res => {
        console.log('用户信息', res)
        // alert(localStorage.getItem('VideoUserId'))
        if (res.code == 0) {
          this.userObj = Object.assign({}, res.data)
          console.log('执行')

        } else {
          this.$router.push({
            path: '/login',
          })

        }
      })
    }

  },
  components: {

  }
}
</script>
<style scoped>
.pageShow {
  width: 100%;
  height: 100%;
  position: absolute;
}
.topCon {
  width: 100%;
  height: 1.2rem;
  padding: 0 0.24rem;
  background: #ffffff;
}
.avatar {
  width: 0.82rem;
  height: 0.82rem;
  border-radius: 50%;
  margin-right: 0.1rem;
}
.sign {
  width: 1rem;
  height: 0.52rem;
  border-radius: 0.2rem;
  background: #c5a064;
  color: #ffffff;
  text-align: center;
  line-height: 0.52rem;
}
.swiper-img {
  width: 100%;
  height: 3.21rem;
}
.navWrapper {
  width: 100%;
  background: #ffffff;
  position: relative;

  height: 1.4rem;
}
.navCon {
  position: absolute;
  height: 1.8rem;
  margin-top: -0.5rem;
  width: 7.07rem;

  left: 50%;
  transform: translate(-50%, 0%);
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 5px 5px #f5f5f5;
}
.navItem {
  width: 20%;
  height: 1.75rem;
}
.navItem :last-child {
  margin-right: 0;
}
.itemImg {
  width: 0.64rem;
  height: 0.64rem;
}
.itemName {
  color: #7d7d7d;
  font-size: 0.25rem;
  margin-top: 0.17rem;
}

.manageThink {
  background: #ffffff;
}
.propaganda {
  margin: 0 0.24rem;
  border: 1px solid #eaeaea;
  padding-bottom: 0.5rem;
  background-color: #ffffff;
  border-radius: 0.15rem;
}
.propaganda > .item {
  margin: 0 0.24rem;
}
.propaganda > .title {
  font-size: 0.38rem;
  margin: 0.3rem auto;
}
.propaganda > .banner {
  border-top-left-radius: 0.15rem;
  border-top-right-radius: 0.15rem;
  width: 100%;
}
.look {
  width: 0.35rem;
  height: 0.33rem;
  margin-right: 0.3rem;
}
.tip {
  color: red;
}
.adv-img {
  background: #ffffff;
  /* width: 7.09rem; */
  width: 100%;
  padding: 0 0.24rem;
  height: 1.28rem;

  margin-bottom: 0.3rem;
}
.manageThink > .title {
  padding: 0 0.24rem;
}
.manageThink > .list {
  padding: 0 0.24rem;
}

.manageThink > .title > .name {
  color: #2d2d2d;
  font-size: 0.3rem;
  font-weight: 700;
  margin-top: 0.32rem;
  margin-bottom: 0.32rem;
  border-left: 0.06rem solid #c5a064;
  padding-left: 0.15rem;
}
.list > .item {
  width: 48%;
}
.list > .item > img {
  width: 100%;
  /* height: 2.04rem; */
  height: auto;
}
.list > .item > .itemInfoCon > .itemInfo {
  margin-top: 0.2rem;
}
.list > .item > .itemInfoCon > .itemInfo > .name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #2d2d2d;
  font-weight: 700;
}
.list > .item > .itemInfoCon > .desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.34rem;
  color: #8a898a;
  font-size: 0.22rem;
  margin-top: 0.1rem;
}
.integral {
  color: #ec8c4b;
  white-space: nowrap;
}
.bar {
  width: 100%;
  height: 0.17rem;
  background: #f5f5f5;
}
.barTwo {
  width: 100%;
  height: 0.37rem;
  background: #ffffff;
}
.imgList {
  margin-top: -0.25rem;
  background: #ffffff;
  padding: 0 0.24rem;
  padding-bottom: 2rem;
}
.imgList > img {
  width: 49%;
  height: 2.11rem;
  margin-top: 0.2rem;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.advImgbtm {
  /* margin-top: -0.17rem; */
}
.van-swipe__indicator {
  background-color: #c5a064 !important;
}
/* 二维码样式 */
.qrcodeCon {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.qrcodeItem {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  /* background: #ffffff; */
  text-align: center;
  border-radius: 0.1rem;
  color: #8a898a;
}
.qrcodetest {
  margin-top: 0.3rem;
}
.qrcodeImg {
  width: 5.98rem;
  height: auto;
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
.closeImg {
  height: 0.55rem;
  width: 0.55rem;
  margin-top: 0.26rem;
}
</style>