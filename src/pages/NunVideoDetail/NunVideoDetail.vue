<template>
  <div class="container" v-wechat-title="title">
    <div class="topContent">

      <video-player v-show="!becomMemberCon" ref="videoPlayer" style="width:100%; height:4.2rem; object-fit: fill" class="video-player vjs-custom-skin" :playsinline="playsinline" :options="playerOptions" @canplay="onPlayerCanplay($event)" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" />
      <div class="sendBtn row a-c j-c" @click="toInvited">
        <button class="btn">发给好友一起学习</button>
      </div>
      <!-- 集数展示 -->
      <div class="episodes-wrapper" v-show="episodesData" ref="personWrap">
        <div style="" ref="personTab">
          <div class="episodes" v-for="(item, index) in episodesData" :key="index" @click="episodeSelect(index)" :class="defaultIdndex == index ? 'selectHover' : ''">
            {{ item.SortNum }}
          </div>
        </div>
      </div>
      <div class="detalItem border-bottom-1px" ref="detailHeight">
        <div class="title">视频介绍</div>
        <div class="descCon" ref="descCon">
          <div class="desc" style="font-size:.3rem!important" v-html="VideoObj.VideoContent"></div>
        </div>
      </div>

    </div>
    <!--提问按钮 -->
    <div class="quiz row a-c">
      <img @click="showQuiz" :src="quequetion" alt="" class="quizImg" />
    </div>
    <!-- 底部 -->
    <div class="btm row a-c border-top-1px">
      <div class="btmHomeCon row a-c j-c">
        <img class="homeImg" :src="homeImg" alt="" />
        <div class="btmHome" @click="homeback">首页</div>
      </div>

      <!-- 社员专项 -->
      <div v-if="VideoObj.IsBuy == 0" @click="pay(0)" class="SalePrice border-left-1px" style="background:#ea9c38">
        ￥<span class="priceNum">99</span>/节课
      </div>
      <!-- <div v-if="VideoObj.IsBuy == 0" @click="pay()" class="SalePrice border-left-1px" style="background:#ed6d52">
        ￥<span class="priceNum">199</span>/三节课
      </div> -->
      <div v-if="VideoObj.IsBuy == 0" @click="pay(1)" class="SalePrice border-left-1px" style="background:#b82d32">
        ￥<span class="priceNum">399</span>/七节课
      </div>
      <div @click="myAplay()" v-if="VideoObj.IsBuy == 1" class="buy" style="background:#ea9c38">已购买</div>
    </div>
    <!-- 评论弹出框 -->
    <div class="quizDialog" v-show="isShowQuiz">
      <!-- <div> -->
      <div class="mask" @click="closeQuiz"></div>
      <div class="quizWrap">
        <img @click="closeQuiz" src="./img/x.png" alt="" class="close" />
        <textarea placeholder="课程很专业，导师讲解非常细致。" class="quizText" @blur="getHeight" v-model="quiztext"></textarea>
        <button class="submit" @click="submit">发表</button>
      </div>
      <!-- 评论顶部 -->
      <div class="quizCon border-bottom-1px">
        <div class="title row a-c">
          <span class="name">全部提问</span>
          <span class="num">({{ count }})</span>
        </div>
      </div>
      <!-- 评论内容 -->
      <div class="evaluateCon" ref="evaluateHeight" :style="{height: commentHeight}">
        <div class="content">
          <div class="item row border-bottom-1px" v-for="(item, index) in evaluateList" :key="index">
            <img class="avatar" :src="item.HeadImg" alt="" />
            <div class="itemWrap">
              <div class="title">{{ item.NickName }}</div>
              <span class="time">{{ item.CreateTime }}</span>
              <p class="text">{{ item.VideoMessageTitle }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="becomMemberCon" v-if="becomMemberCon">
      <div class="code_mask" @click.stop="BecomMember(false)"></div>
      <div class="becomMember col j-c a-c">
        <!-- <div class="title">填写信息</div> -->
        <input v-model="userName" class="name" placeholder="请输入姓名" />
        <input v-model="phoneNum" class="phone" type="tel" placeholder="请输入手机号" />
        <!-- <div class="invitationCode" @click="showPopup" :class="{ active: isActive }" @focus="forbid()">
          {{ trade }}
        </div> -->
        <input type="text" class="phone" readonly="readonly" @click="showPopup" :value="trade" />
        <input v-model="invitationCode" class="phone" type="tel" placeholder="推荐人邀请码" />

        <div class="courseDetailWrapper row">
          <div class="courseDetailCon col" v-for="(item, index) in coerseList" :key="index">
            <div class="courseDetail row a-c" @click="selcetCouerse(index)">
              <div class="selectCon  col a-c j-c" :class="selcetIdndex == index ? 'selectCon-hover' : ''">
                <div class="select" :class="selcetIdndex == index ? 'selectHover' : ''"></div>
              </div>
              <div class="courseName" :class="selcetIdndex == index ? 'yellow' : ''">
                {{ item.VideoCategoryName }}
              </div>
            </div>
            <div class="chashNum" :class="selcetIdndex == index ? 'yellow' : ''">
              {{ item.num }}
            </div>
            <div class="red">{{ item.text }}</div>
            <div class="red">{{ item.textbtm }}</div>
          </div>
        </div>
        <div class="confirm row a-c j-c" @click="payBtm()">
          提交
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :columns-placeholder="['请选择', '请选择', '请选择']" :style="{ height: '30%' }">
      <van-area :area-list="areaList" title="所在城市" @cancel="cancel" @confirm="confirm" />
    </van-popup>
  </div>
</template>
<script type="text/ecmascript-6">
import { getSdkData, episodes, getFreeCouese, isBandCouese, isCourseDatail, getVideoDetail, getEvaluateList, sendEvaluate, payCourse, VideoView, getUserInfo } from 'api/index'
import BScroll from 'better-scroll'
import { Toast } from 'vant';
// import { wxpay } from 'assets/js/pay';
// import share from 'assets/js/share'
import AreaList from 'assets/js/area';
import { config } from 'assets/js/shareConfig.js'
var wx = require('weixin-js-sdk');
import { Dialog } from 'vant';
// import $ from jquery
export default {
  data() {
    return {
      playerOptions: {
        desc: '',
        title: '',
        autoplay: false,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        sources: [
          {
            type: 'video/mp4',
            src: 'http://school.fg1413.com/tradercollegevideo/img/defalut.mp4'
          }
        ],
        hls: true,
        poster: '',
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        }
      },
      VideoItemFilePathCon: [],
      VideoItemIsFreePathCon: [],
      videoIndex: 0,
      defaultIdndex: 0,
      episodesData: [],
      videoDefault: '',
      VideoOrderType: [0, 2],
      SalePrice: [99, 399],
      VideoObj: {},
      userObj: {},
      evaluateList: [],
      HeadImg: '',
      count: '',
      pageIndex: 1,
      pageSize: 1000,
      quiztext: '',
      quequetion: require('./img/quetion.png'),
      homeImg: require('./img/shouye1.png'),
      isShowQuiz: false,
      // 支付数据
      show: false,
      userName: '',
      phoneNum: '',
      tryVideo: '',
      becomMemberCon: false,
      trade: '所在城市',
      isActive: false,
      adressValue: '',
      areaList: AreaList,
      invitationCode: '',
      alredyBuy: false,
      // 选中数据
      coerseList: [
        { VideoCategoryName: '购买单节', num: '￥99', text: '' },
        { VideoCategoryName: '购买七节', num: '￥399', text: '送3位好友', textbtm: '学习名额' },
      ],
      selcetIdndex: 0,
      getCouerse: 0

    }
  },
  computed: {
    descHeight: function () {
      // return window.screen.availHeight / 100 * 2 - 8.48 + 'rem'
      let bodyheight = window.screen.availHeight / 100
      let height = 4.2 / 375 * window.screen.availWidth
      console.log('window.screen.availHeight', bodyheight)
      console.log('window.screen.availHeight', height)

      return (bodyheight - height) * 2 + 'rem'
    },
    commentHeight: function () {
      let bodyheight = window.screen.availHeight / 100 * 2 - 8
      let height = bodyheight / 375 * window.screen.availWidth
      return height * 2 + 'rem'
    },
    player() {
      return this.$refs.videoPlayer.player//自定义播放
    },
    playsinline() {
      var ua = navigator.userAgent.toLocaleLowerCase();
      //x5内核
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        return false
      } else {
        //ios端
        return true
      }
    }
  },
  created() {

    this._getEvaluateList()
    this._getUserInfo()
    this._getVideoDetail()



  },

  mounted() {
      window.addEventListener('resize', () => {
      this.computedHeight()
    })



    // 超出滚动
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll('.descCon', { click: true, taps: true, mouseWheel: true })
        console.log('descCon', this.scroll)
      } else {
        this.scroll.refresh();
      }
    })
    // // 超出滚动
    this.$nextTick(() => {
      this.scroll2 = new BScroll('.evaluateCon', { click: true, taps: true, stopPropagation: true, mouseWheel: true, probeType: 3 })
      console.log(this.scroll)
    })


  },
  methods: {
    computedHeight() {
      let awaitTimer = setTimeout(() => {
        clearTimeout(awaitTimer)
        this.$refs.descCon.style.height = (document.documentElement.clientHeight - '110') / 100 + 'rem'
      }, 10)
    },
    myAplay() {
      this.$router.push({
        path: '/MyApply',
      })
    },
    _getJsSdk() {
      getSdkData({
        tempurl: encodeURIComponent(location.href.split('#')[0]),
      }).then(res => {
        console.log('第二个配置的分享接口', res)
        let data = res.data.data
        // alert(JSON.stringify(data))
        config(data)
        wx.ready(() => {
          wx.onMenuShareTimeline({
            title: this.title, // 分享标题
            link: 'http://school.fg1413.com/tradercollegevideo/#' + localStorage.getItem('fromUrlTwo'),
            imgUrl: 'http://school.fg1413.com/tradercollegevideo/img/share.png', // 分享图标
            desc: this.desc, // 分享描述
            success: () => {

            },
            cancel() {
              // 用户取消分享后执行的回调函数
            }
          })
          wx.onMenuShareAppMessage({
            title: this.title, // 分享标题
            link: 'http://school.fg1413.com/tradercollegevideo/#' + localStorage.getItem('fromUrlTwo'),
            imgUrl: 'http://school.fg1413.com/tradercollegevideo/img/share.png', // 分享图标
            desc: this.desc, // 分享描述
            success: () => {

            },
            cancel() {

            }
          })
        })
      })

    },
    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    personScroll(n) {
      // 默认有六个li子元素，每个子元素的宽度为120px
      let width = n * 1;
      this.$refs.personTab.style.width = width + "rem";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        // if (!this.scroll) {
        this.scroll3 = new BScroll(this.$refs.personWrap, {
          startX: 0,
          click: true,
          scrollX: true,
          // 忽略竖直方向的滚动
          scrollY: false,
          eventPassthrough: "vertical"
        });
        console.log('横向滚动', this.scroll)
        // } else {
        //   this.scroll.refresh();
        // }
      });
    },

    onPlayerCanplay(player) {
      console.log('player Canplay!', player)
      var ua = navigator.userAgent.toLocaleLowerCase();
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        $('body').find('video').attr('x-webkit-airplay', true).attr('x5-playsinline', true).attr('webkit-playsinline', true).attr('playsinline', true)
      } else {
        $('body').find('video').attr('webkit-playsinline', "true").attr('playsinline', "true")
      }
    },

    onPlayerPlay(player) {
      console.log('播放')
      if (!this.VideoObj.VideoPath) {
        Toast('暂无视频，敬请期待')
        setTimeout(() => { player.pause() }, 100);
        return false
      }
      if (this.VideoObj.IsBuy == 0 && this.getCouerse == 0) {
        setTimeout(() => { player.pause() }, 100);
        this.becomMemberCon = true
        return false
      }
      this._VideoView()


    },
    onPlayerPause(player) {
      console.log('暂停', player)

    },
    // 精品课程点击  只换路径 收不收费在播放和暂停时控制
    episodeSelect(flag) {
      this.defaultIdndex = flag
      this.videoIndex = flag
      if (this.VideoItemFilePathCon[flag]) {
        this.playerOptions['sources'][0]['src'] = this.VideoItemFilePathCon[flag]
      }
      setTimeout(() => {
        this.$refs.videoPlayer.player.play()
        //  this.onPlayerCanplay() 
      }, 500);



    },
    // 精品课程分节请求
    _episodes() {
      episodes({
        videoId: this.$route.query.id
      }).then(res => {
        console.log('课程分节请求', res)
        if (res.code == 0) {
          this.episodesData = res.data
          this.VideoItemIsFreePathCon = this.episodesData.map(function (item) {
            return item.VideoItemIsFreePath;
          });
          this.VideoItemFilePathCon = this.episodesData.map(function (item) {
            return item.VideoItemFilePath;
          });


          this.VideoObj.VideoFreePath = this.VideoItemIsFreePathCon[0]
          this.VideoObj.VideoPath = this.VideoItemFilePathCon[0]


        }
        if (this.VideoObj.VideoPath) {
          this.playerOptions['sources'][0]['src'] = this.VideoObj.VideoPath
        }
        this.playerOptions['poster'] = this.VideoObj.VideoImg
        this.$nextTick(() => {
          this.personScroll(this.VideoItemIsFreePathCon.length + 1);
        });
      })
    },
    forbid() {
      //禁止软键盘弹出
      document.activeElement.blur();
    },
    // 点击支付
    pay(flag) {
      this.becomMemberCon = true
      this.selcetIdndex = flag
    },
    // 是否有赠送请求

    _getFreeCouese() {
      getFreeCouese({
        parentUserId: this.userObj.ParentUserId,
        VideoId: this.$route.query.id,
        freeCode: this.userObj.freeCode

      }).then(res => {
        console.log('是否有赠送请求', res)
        if (res.code == 1) {
          this._getVideoDetail()
        } else if (res.code == 0) {
          if (res.data) {
            this.getCouerse = 1
            Toast('恭喜您已获取赠送课程')
          } else {
            Toast('赠送方未选定课程，验证失败')
          }
        }

      })
    },
    // 观看会员课程与购买资格绑定
    _isBandCouese(VideoOrderItemTitle, VideoOrderId, ActivationCodeNum, VideoOrderItemPrice) {
      isBandCouese({
        VideoOrderItemTitle: VideoOrderItemTitle,
        VideoId: this.$route.query.id,
        VideoOrderId: VideoOrderId,
        ActivationCodeNum: ActivationCodeNum,
        VideoOrderItemPrice: VideoOrderItemPrice
      }).then(res => {
        if (res.code == 0) {
          console.log('观看会员课程与购买资格绑定', res)
          this._getVideoDetail()
        } else {
          console.log('绑定失败')
        }
      })
    },
    // 判断购买几节视频
    _isCourseDatail(orderType) {
      isCourseDatail({
        videoSectionId: localStorage.getItem('videoSectionId'),
        orderType: orderType
      }).then(res => {
        console.log('判断购买几节视频', res)
        if (res.code == 0) {
          this.alredyBuy = true
          Dialog.confirm({
            title: '确认观看',
            message: '请您确认是否观看本节视频'
          }).then(() => {
            console.log('res', res)
            let data = res.data
            this._isBandCouese(data.VideoOrderName, data.VideoOrderId, data.ActivationCodeNum, this.VideoObj.SalePrice)



          }).catch(() => {

          });

        } else if (res.code == 0) {
          Toast('观看视频次数已用完')
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
          // this._getFreeCouese()
          if (this.userObj.Telephone) {
            this.phoneNum = this.userObj.Telephone
          }
          if (this.userObj.TrueName) {
            this.userName = this.userObj.TrueName
          }
        }
      })
    },
    // 用户观看视频
    _VideoView() {
      VideoView({
        ParentUserId: this.userObj.ParentUserId,
        VideoId: this.$route.query.id
      }).then(res => {
        console.log('用户观看视频', res)
        if (res.code === 0) {
          console.log('记录成功', res)
        }
      })
    },
    // 视频详情数据
    _getVideoDetail() {
      getVideoDetail({
        VideoId: this.$route.query.id
      }).then(res => {
        console.log('视频详情数据', res)
        if (res.code === 0) {

          let data = res.data
          this.VideoObj = Object.assign({}, data)
          this.videoDefault = this.VideoObj.VideoPath
          this._episodes()
          this.title = this.VideoObj.VideoName
          this.desc = this.VideoObj.VideoDesc

          this._getJsSdk()
           this.computedHeight()

          // share(this.VideoObj.VideoName, this.VideoObj.VideoDesc)


        }
      })
    },
    toInvited() {
      this.$router.push({ path: '/MyExtension' })
    },
    _getEvaluateList() {
      getEvaluateList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        videoId: this.$route.query.id
      }).then(res => {
        console.log('评论数据请求', res)
        this.count = res.count
        console.log(' this.count', this.count)
        if (res.code === 0) {
          this.evaluateList = res.data
        }
      })
    },
    showQuiz() {
      this.isShowQuiz = true
    },
    closeQuiz() {
      this.isShowQuiz = false
    },
  
    // 提交评论
    submit() {
      if (!this.quiztext) {
        Toast('请输入评论内容')
        return false
      }
      sendEvaluate({
        messageTitle: this.quiztext,
        VideoId: this.$route.query.id
      }).then(res => {
        console.log('提交评论', res)
        if (res.code === 0) {
          this.quiztext = ''
          Toast('评论成功')
          this._getEvaluateList()

        }
      })
    },
    homeback() {
      this.$router.replace({ path: '/home/index' })
    },
    // 关闭支付购买
    BecomMember(flag) {
      this.becomMemberCon = flag

    },
    //   点击保存按钮
    confirm(value, index) {
      this.show = false
      console.log(value)
      this.adressValue = value.map(function (item) {
        return item.name;
      });
      this.trade = this.adressValue.join('')
      console.log('this.adressValue', this.adressValue)
      console.log(index)
      this.isActive = true
    },
    // 点击取消
    cancel() {
      this.show = false
    },
    // 显示支付页面
    showPopup() {
      this.show = true;
    },
    // 支付
    payBtm() {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!this.phoneNum) {
        Toast('手机号不能为空')
        return false;
      } else if (!myreg.test(this.phoneNum)) {
        Toast('手机号格式错误')
        return false;
      } else if (!this.userName) {
        Toast('姓名不能为空')
        return false;
      } else if (this.trade == '所在城市') {
        Toast('地址不能为空')
        return false;
      } else {
        this._payCourse()
      }

    },
    // 支付提交
    _payCourse() {
      payCourse({
        openid: this.userObj.OpenId,
        VideoUserName: this.userName,
        UserTel: this.phoneNum,
        Province: this.adressValue[0],
        City: this.adressValue[1],
        District: this.adressValue[2],
        VideoOrderType: this.VideoOrderType[this.selcetIdndex],
        videoId: this.$route.query.id,
        videoSectionId: localStorage.getItem('videoSectionId'),
        VideoOrderPrice: this.SalePrice[this.selcetIdndex],
        ActivationCodeNum: this.invitationCode
      }).then(res => {
        console.log('支付提交', res)
        // alert(res.data)
        if (res.code == 0) {
          let params = JSON.parse(res.data)
          if (typeof window.WeixinJSBridge !== "undefined") {
            var that = this
            window.WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
              "appId": params.appId,  //公众号名称，由商户传入     
              "timeStamp": params.timeStamp,  //时间戳，自1970年以来的秒数     
              "nonceStr": params.nonceStr,  //随机串     
              "package": params.package,
              "signType": params.signType,  //微信签名方式：     
              "paySign": params.paySign  //微信签名 
            },
              function (res) {

                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  Toast('支付成功！');
                  that.becomMemberCon = false;
                  that._getVideoDetail()
                  // setTimeout(() => {
                  //   this.playerOptions['sources'][0]['src'] = this.videoDefault
                  // }, 1000);
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  Toast('支付失败！');
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                  Toast('调起微信支付失败');
                }
              });
          }

        }


      })
    },
    selcetCouerse(index) {
      this.selcetIdndex = index;


    },

  }
}
</script>
<style scoped>
.container {
  font-size: 0.28rem;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  font-size: 0.28rem;
}
.topContent {
  position: absolute;
  width: 100%;
}
.container .sendBtn {
  width: 100%;
  height: 1.16rem;
  background-color: #fff;
}

.container .sendBtn .btn {
  width: 4.7rem;
  height: 0.65rem;
  border-radius: 0.15rem;
  color: #fff;
  font-size: 0.32rem;
  background-color: #e9bd77;
}
.container .detalItem {
  width: 100%;
  background-color: #fff;
  margin-top: 0.2rem;
  padding-top: 0.3rem;
}
.container .detalItem .title {
  font-size: 0.32rem;
  font-weight: 700;
  color: #2d2d2d;
  padding-left: 0.13rem;
  border-left: 0.06rem solid #c5a064;
  margin-bottom: 0.3rem;
  margin-left: 0.3rem;
}

.descCon {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  padding: 0 0.3rem;
}
.container .detalItem .desc {
  color: #8a898a;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 2rem;
}
.desc >>> p > p > span {
  font-size: 0.3rem !important;
}
.desc >>> p > span {
  font-size: 0.3rem !important;
}
.desc >>> p {
  font-size: 0.3rem !important;
}

.container .quizCon {
  width: 100%;
  height: 1rem;
  padding: 0.3rem;
  background-color: #fff;
  position: relative;
  top: 4.2rem;
  z-index: 1;
}

.container .quizCon > .title {
  width: 100%;
}

.container .quizCon > .title .name {
  font-size: 0.28rem;
  color: #424242;
}

.container .quizCon > .title .num {
  font-size: 0.26rem;
  color: #a9a9a9;
}

.container .quizCon .quiz {
  width: 100%;
  height: 0.7rem;
  margin-top: 0.34rem;
}

.quizImg {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  flex-shrink: 0;
  position: fixed;
  top: 8rem;
  right: 0;
}
.container .quizCon .quiz .quizBtn {
  flex: 1;
  height: 0.6rem;
  line-height: 0.6rem;
  margin-left: 0.2rem;
  text-align: center;
  font-size: 0.26rem;
  color: #a5a4a5;
  background-color: #f5f7f9;
  border-radius: 0.1rem;
}
.container .evaluateCon {
  width: 100%;
  background-color: #fff;
  position: relative;
  top: 4.2rem;
  bottom: 0;
  z-index: 0;
  padding-top: 0.2rem;
  overflow: hidden;
}
.evaluateCon .content {
  padding: 0rem 0.3rem 4rem;
  background-color: #fff;
}
.evaluateCon > .content > .item {
  padding-top: 0.2rem;
}

.container .evaluateCon .item .avatar {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.container .evaluateCon .item .itemWrap {
  flex: 1;
  margin-left: 0.2rem;
}

.container .evaluateCon .item .itemWrap .title {
  font-size: 0.28rem;
  color: #5d5d5d;
}

.container .evaluateCon .item .itemWrap .time {
  display: inline-block;
  margin-top: 0.1rem;
  font-size: 0.24rem;
  color: #a9a9a9;
}

.container .evaluateCon .item .itemWrap .text {
  width: 100%;
  margin-top: 0.1rem;
  font-size: 0.28rem;
  color: #5d5d5d;
  line-height: 0.4rem;
}
.container .quizDialog {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  bottom: 0;
}

.container .quizDialog .mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(62, 54, 42, 0.4);
}

.container .quizDialog .quizWrap {
  position: relative;
  left: 0;
  width: 100%;
  top: 4.2rem;
  height: 2.8rem;
  background-color: #fff;

  z-index: 1;
}

.container .quizDialog .quizWrap .quizText {
  width: 7.16rem;
  margin: 0 0.18rem;
  margin-top: 0.75rem;
  padding: 0.2rem;
  height: 1.2rem;
  color: #4d4e4d;
  font-size: 0.28rem;
  background-color: #f5f7f9;
  border-radius: 0.1rem;
}

.container .quizDialog .quizWrap .submit {
  position: absolute;
  right: 2.5%;
  bottom: 0.1rem;
  width: 1.5rem;
  height: 0.6rem;
  color: #fff;
  font-size: 0.28rem;
  border-radius: 0.3rem;
  background-color: #c5a064;
}

.container .quizDialog .quizWrap .close {
  position: absolute;
  right: 0.2rem;
  top: 0.05rem;
  width: 0.58rem;
  padding: 0.12rem;
}
.btm {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1rem;
}
.btmHomeCon {
  width: 25%;
  line-height: 1rem;
  height: 100%;
  text-align: center;
  background: #ffffff;
}
.btmHome {
  color: #555658;
  margin-left: 0.1rem;
}
.homeImg {
  width: 0.32rem;
}
.value {
  width: 75%;
  line-height: 1rem;
  text-align: center;
  background: #ea9c38;
  color: #ffffff;
}
.SalePrice {
  width: 37.5%;
  white-space: nowrap;
  line-height: 1rem;
  text-align: center;
  height: 100%;
  font-size: 0.22rem;
  color: #ffffff;
}
.buy {
  width: 75%;
  height: 100%;
  white-space: nowrap;
  line-height: 1rem;
  text-align: center;
  font-size: 0.3rem;
  color: #ffffff;
}
.priceNum {
  font-size: 0.38rem;
}
.becomMember {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 80%;
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
.courseDetailWrapper {
  width: 92%;
}
.courseDetailCon {
  width: 33%;
}
.courseDetail {
  text-align: left;
  width: 92%;
  margin-top: 0.3rem;
  white-space: nowrap;
}
.chooseCourse {
  text-align: left;
  width: 92%;
  margin-top: 0.34rem;
  color: #656565;
}

.selectCon {
  width: 0.25rem;
  height: 0.25rem;
  background: #dfdede;
  border-radius: 50%;
  border: 0.01rem solid #dfdede;
}
.select {
  width: 0.13rem;
  height: 0.13rem;
  background: #dfdede;
  border-radius: 50%;
  position: relative;
  z-index: 0;
}
.selectCon-hover {
  width: 0.25rem;
  height: 0.25rem;
  background: #ffffff;
  border-radius: 50%;
  border: 0.01rem solid #c5a064;
  color: #c5a064;
}
.select-hover {
  width: 0.13rem;
  height: 0.13rem;
  background: #c5a064;
  border-radius: 50%;
  position: relative;
  z-index: 0;
}
.confirm {
  width: 92%;
  height: 0.98rem;
  border: 1px solid #d6d6d6;
  border-radius: 0.1rem;
  font-size: 0.36rem;
  color: #ffffff;
  background: #c5a064;
  margin-top: 0.2rem;
  margin-bottom: 0.33rem;
}
.invitationCode {
  width: 92%;
  height: 1.07rem;
  margin-top: 0.39rem;
  border: 1px solid #d6d6d6;
  border-radius: 0.1rem;
  padding-left: 0.33rem;
  font-size: 0.3rem;
  line-height: 1.07rem;
  text-align: left;
}
.active {
  color: #2d2d2d;
}
.courseName {
  font-size: 0.3rem;
  margin-left: 0.1rem;
}
.chashNum {
  font-size: 0.4rem;
}
.red {
  color: #ed6d52;
  font-size: 0.23rem;
}
.yellow {
  color: #c5a064;
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
.selectHover {
  width: 0.13rem;
  height: 0.13rem;
  background: #c5a064;
  border-radius: 50%;
  position: relative;
  z-index: 0;
}
.episodes-wrapper {
  background: #ffffff;
  padding-bottom: 0.2rem;
  white-space: nowrap;
}
.episodes {
  width: 0.8rem;

  margin-left: 0.2rem;

  height: 0.8rem;
  background: #f5f5f5;
  border-radius: 0.1rem;
  color: #8a898a;
  width: 0.8rem;
  display: inline-block;

  text-align: center;
  line-height: 0.8rem;
}
.selectHover {
  background: #e9bd77;
  color: #ffffff;
}
/*
  播放按钮换成圆形
  */
.topContent >>> .video-js .vjs-big-play-button {
  height: 2em;
  width: 2em;
  line-height: 2em;
  border-radius: 1em;
  margin-left: -1.1em;
}
.topContent >>> .video-js:hover .vjs-big-play-button {
  background: rgba(0, 0, 0, 0);
}
</style>
