<template>
  <div class="container" v-wechat-title="title">
    <!-- <div class="wrapper"> -->
    <div class="topContent">
      <video-player v-show="!becomMemberCon && !byyWrapper && !datamsg" ref="videoPlayer" style="width:100%; height:4.2rem; object-fit: fill" class="video-player vjs-custom-skin" :playsinline="playsinline" :options="playerOptions" @canplay="onPlayerCanplay($event)" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" />
      <!-- <img v-show="byyWrapper" class="videoImg" src="./img/flag.png"> -->
      <img v-show="byyWrapper" class="videoImg" :src="VideoObj.VideoImg">
      <div @click="dataMsg()" class="msgCon" v-show="!byyWrapper && datamsg">
        <img v-show="!byyWrapper && datamsg" class="videoImg" :src="VideoObj.VideoImg">
        <div class="tip col a-c j-c">
          <img src="./../../assets/img/load.png">
          <div>点击下载学习资料</div>
        </div>

      </div>
      <div class="sendBtn row a-c j-c" @click="toInvited">
        <button class="btn">发给好友一起学习</button>
      </div>
      <!-- 集数展示 -->
      <div class="episodes-wrapper row" v-if="episodesData">
        <div style="" ref="personTab">
          <div class="episodes col a-c j-c" v-for="(item, index) in episodesData" :key="index" @click="episodeSelect(index)" :class="defaultIdndex == index ? 'selectHover' : ''">
            {{ item.SortNum }}
          </div>
        </div>
      </div>
      <div class="detalItem border-bottom-1px" ref="detailHeight">
        <div class="title">视频介绍</div>
        <div class="descCon" ref="descCon">
          <!-- <p class="desc" v-html="VideoObj.VideoContent"></p> -->
          <p class="desc" v-html="VideoContent"></p>
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
      <!-- 积分 -->
      <div v-if="VideoObj.IsFree == 2" class="value border-top-1px">
        <span @click="Interry()" v-if="VideoObj.isintegral == 0 && !datamsg">
          {{ VideoObj.VideoPrice }}积分</span>
        <span @click="Interry()" v-if="VideoObj.isintegral == 0 && datamsg">
          使用{{ VideoObj.VideoPrice }}积分下载资料</span>
        <span @click="myAplay()" class="buyclass row j-c a-c" v-if="VideoObj.isintegral == 1">已购买</span>
      </div>
      <!-- 免费 -->
      <div v-if="VideoObj.IsFree == 0" class="value border-left-1px" @click="freeVideo()">
        免费观看
      </div>
      <!-- 精品课程 -->
      <div v-if="VideoObj.IsFree == 1" class="value  row">
        <!-- <div > -->
        <span style="width:50%;height:100%;display:block;background:rgb(237, 109, 82)" @click="tryVid()" v-if="VideoObj.IsBuy == 0">试看</span>
        <span class="border-left-1px" style="width:50%;height:100%;display:block" @click="pay()" v-if="VideoObj.IsBuy == 0">{{ VideoObj.SalePrice }}元</span>

        <!-- </div> -->

        <span @click="myAplay()" class="buyclass row j-c a-c" v-if="VideoObj.IsBuy == 1">已购买</span>
      </div>
    </div>
    <!-- 评论弹出框 -->
    <div class="quizDialog" v-show="isShowQuiz">
      <!-- <div> -->
      <div class="mask" @click="closeQuiz"></div>
      <div class="quizWrap">
        <img @click="closeQuiz" src="./img/x.png" alt="" class="close" />
        <textarea placeholder="课程很专业，导师讲解非常细致。" class="quizText" v-model="quiztext" @blur="getHeight"></textarea>
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
    <!-- 积分购买 -->
    <div v-if="byyWrapper" class="row j-c">
      <div class="code_mask" @click="codeMask()"></div>
      <div class="buy-wrapper">
        <img class="buyImg" :src="enough ? buyImg : IntegralDeficiency" />
        <div class="buyContent col j-c a-c">
          <div class="money">
            使用<span class="moneyNum">{{ VideoObj.VideoPrice }}积分</span>学习该课程
          </div>
          <div class="balance">当前积分剩余{{ instegral }}积分</div>
          <div class="defineBtm row j-c a-c" v-if="enough" @click="_getStudy()">
            确定学习
          </div>
          <div class="defineBtm row j-c a-c" v-if="!enough" @click="getMore()">
            获取更多积分
          </div>
        </div>
      </div>

    </div>
    <!-- 支付购买 -->
    <div class="becomMemberCon" v-if="becomMemberCon">
      <div class="code_mask" @click.stop="BecomMember(false)"></div>
      <div class="becomMember col j-c a-c">
        <div class="title">填写信息</div>
        <input v-model="userName" class="name" placeholder="请输入姓名" />
        <input v-model="phoneNum" class="phone" type="tel" placeholder="请输入手机号" />
        <!-- <div class="invitationCode" @click="showPopup" :class="{ active: isActive }">
          {{ trade }}
        </div> -->
        <input type="text" class="phone" readonly="readonly" @click="showPopup" :value="trade" />
        <input v-model="invitationCode" class="phone" type="tel" placeholder="推荐人邀请码" />
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
import { getSdkData, getVideoDetail, getEvaluateList, sendEvaluate, getIntegral, getStudy, episodes, payCourse, getUserInfo, VideoView } from 'api/index'
import BScroll from 'better-scroll'
import { Toast } from 'vant';
// import { Dialog } from 'vant';
// import share from 'assets/js/share'
import AreaList from 'assets/js/area';
import { config } from 'assets/js/shareConfig.js'
var wx = require('weixin-js-sdk');

export default {
  data() {
    return {
      datamsg: false,
      title: '',
      playerOptions: {
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
            // src: 'http://cdn.fuyulove.com//VideoUploads/2020/2020-02-29/s_01.mp4'
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
      videoReal: true,
      videoFlag: false,
      defaultIdndex: 0,
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
      buyImg: require('./img/xuexi.png'),
      IntegralDeficiency: require('./img/buzu.png'),
      videpath: '',
      byyWrapper: false,
      enough: true,
      instegral: 0,
      isShowQuiz: false,
      VideoItemFilePathCon: [],
      VideoItemIsFreePathCon: [],
      episodesData: [],
      videoIndex: 0,
      // 支付数据
      areaList: AreaList,
      show: false,
      userName: '',
      phoneNum: '',
      tryVideo: '',
      becomMemberCon: false,
      trade: '所在城市',
      isActive: false,
      adressValue: '',
      VideoContent: '',
      VideoLinkUrl: '',
      invitationCode: ''

    }
  },
  computed: {
    descHeight: function () {
      return window.screen.availHeight / 100 * 2 - 7.28 + 'rem'
    },
    commentHeight: function () {
      return window.screen.availHeight / 100 * 2 - 8 + 'rem'
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
    this._getVideoDetail()
    this._getEvaluateList()
    this._getUserInfo()



  },
  mounted() {

    // 超出滚动
    this.$nextTick(() => {
      this.scroll = new BScroll('.descCon', { click: true, mouseWheel: true })
      console.log(this.scroll)
    })
    // // 超出滚动
    this.$nextTick(() => {
      this.scroll2 = new BScroll('.evaluateCon', { click: true, stopPropagation: true, mouseWheel: true })
      console.log(this.scroll)
    })
    window.addEventListener('resize', () => {
      this.computedHeight()
    })



  },

  methods: {
    computedHeight() {
      let awaitTimer = setTimeout(() => {
        clearTimeout(awaitTimer)
        this.$refs.descCon.style.height = (document.documentElement.clientHeight - '90') / 100 + 'rem'
      }, 10)
    },
    dataMsg() {
      if (this.VideoObj.IsFree == 2 && this.VideoObj.isintegral == 0) {
        console.log('积分课程   客户未购买')
        this._getIntegral()
        return false
      } else {
        window.location.href = this.VideoLinkUrl
      }


    },
    myAplay() {
      this.$router.push({
        path: '/MyApply',
      })
    },
    _getJsSdk(id) {
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
            link: 'http://school.fg1413.com/tradercollegevideo/#/videodetail?id=' + id,
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
            link: 'http://school.fg1413.com/tradercollegevideo/#/videodetail?id=' + id,
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
    personScroll(n) {
      // 默认有六个li子元素，每个子元素的宽度为120px
      let width = n * 1;
      this.$refs.personTab.style.width = width + "rem";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll3 = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
          console.log('横向滚动', this.scroll)
        }

      });
    },
    // 点击免费观看
    freeVideo() {
      this.$refs.videoPlayer.player.play()
    },
    // 保持在小窗口内播放
    onPlayerCanplay(player) {
      console.log('player Canplay!', player)
      var ua = navigator.userAgent.toLocaleLowerCase();
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        $('body').find('video').attr('x-webkit-airplay', true).attr('x5-playsinline', true).attr('webkit-playsinline', true).attr('playsinline', true)
      } else {
        $('body').find('video').attr('webkit-playsinline', "true").attr('playsinline', "true")
      }
    },
    // 点击试看
    tryVid() {
      if (this.VideoObj.VideoFreePath) {
        this.playerOptions['sources'][0]['src'] = this.VideoObj.VideoFreePath
        this.$refs.videoPlayer.player.play()
      } else {
        Toast('暂无试看视频')
      }
    },
    // 监听播放
    onPlayerPlay(player) {
      console.log('播放')
      if (!this.VideoObj.VideoPath) {
        setTimeout(() => { player.pause() }, 100);
        Toast('暂无视频，敬请期待')
        return false
      }
      if (this.VideoObj.IsFree == 2 && this.VideoObj.isintegral == 0) {
        console.log('积分课程   客户未购买')
        setTimeout(() => { player.pause() }, 100);
        this._getIntegral()
        return false
      }
      if (this.VideoObj.IsFree == 1 && this.VideoObj.IsBuy == 0 && this.$refs.video.src !== this.VideoObj.VideoFreePath) {
        console.log('收费课程   客户未购买 看的不是试看')
        setTimeout(() => { player.pause() }, 100);
        this.becomMemberCon = true
        return false
      }
      this._VideoView()
    },
    // 点击积分
    Interry() {
      this._getIntegral()
    },
    // 暂停
    onPlayerPause(player) {
      console.log('暂停', player)
      if (this.playerOptions['sources'][0]['src'] == this.VideoObj.VideoFreePath) {
        this.becomMemberCon = true;
      }

    },
    pay() {
      this.becomMemberCon = true

    },
    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
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
        // this._GetWebChatOpenId()
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
        VideoOrderType: 0,
        videoId: this.$route.query.id,
        videoSectionId: 0,
        VideoOrderPrice: this.VideoObj.SalePrice,
        ActivationCodeNum: this.invitationCode
      }).then(res => {
        // console.log('this.userObj.OpenId', this.userObj.OpenId)
        // console.log(' this.userName', this.userName)
        // console.log('this.phoneNum', this.phoneNum)
        // console.log('this.adressValue[0]', this.adressValue[0])
        // console.log(' this.adressValue[0]', this.adressValue[0])
        // console.log('VideoOrderType', 0)
        // console.log(' this.VideoObj.SalePrice,', this.VideoObj.SalePrice)
        console.log('支付接口', res)
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
                  //  setTimeout(() => {
                  //   this.playerOptions['sources'][0]['src'] = this.videoDefault
                  // }, 1000);
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  Toast('支付失败！');
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                  Toast('支付失败！');
                }
                // that.videoApear()
              });
          }
        }

      })
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
    // 视频详情数据
    _getVideoDetail() {
      getVideoDetail({
        VideoId: this.$route.query.id
      }).then(res => {
        console.log('视频详情数据', res)
        if (res.code === 0) {
          let data = res.data
          this.VideoObj = Object.assign({}, data)
          this.VideoLinkUrl = this.VideoObj.VideoLinkUrl
          if (this.VideoLinkUrl) {
            this.datamsg = true
          }
          console.log(' this.VideoContent', this.VideoContent)
          this._episodes()
          this.title = this.VideoObj.VideoName
          this.desc = this.VideoObj.VideoDesc
          this.VideoContent = this.VideoObj.VideoContent
          const regex = new RegExp('<img', 'gi')
          this.VideoContent = this.VideoContent.replace(regex, `<img style="max-width: 100%; height: auto"`);
          this._getJsSdk(this.VideoObj.VideoId)

          this.computedHeight()


        }
      })
    },

    // 发送邀请
    toInvited() {
      this.$router.push({ path: '/MyExtension' })
    },
    // 精品课程点击  只换路径 收不收费在播放和暂停时控制
    episodeSelect(flag) {
      this.defaultIdndex = flag
      this.videoIndex = flag
      if (this.VideoItemFilePathCon[flag]) {
        this.playerOptions['sources'][0]['src'] = this.VideoItemFilePathCon[flag]
      }
      this.$refs.videoPlayer.player.play()


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
    // 评论数据请求
    _getEvaluateList() {
      getEvaluateList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        videoId: this.$route.query.id
      }).then(res => {
        console.log('评论数据请求', res)
        this.count = res.count
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
          this._getEvaluateList()
          Toast('评论成功')
        }
      })
    },
    homeback() {
      this.$router.replace({ path: '/home/index' })
    },
    // 判断用户积分是否足够
    _getIntegral() {
      getIntegral({
        videoId: this.VideoObj.VideoId
      }).then(res => {
        console.log('判断积分', res)
        this.byyWrapper = true
        this.instegral = res.data
        if (res.code == 0) {
          this.enough = true
        } else if (res.code == 2) {
          this.enough = false
        }
      })
    },
    // 积分发起购买
    _getStudy() {
      getStudy({
        videoId: this.VideoObj.VideoId
      }).then(res => {
        this.byyWrapper = false
        console.log('发起购买', res)
        if (res.code == 0) {
          Toast('购买成功');
          this._getVideoDetail()
          // this.$router.go(0);
        } else if (res.code == 2) {
          this.enough = false
          this.byyWrapper = true
          Toast('您的积分余额不足');
        } else if (res.code == 3) {
          Toast('您已购买该课程');
        } else if (res.code == 1) {
          Toast('购买失败，请重试');
        }


      })
    },




    // 关闭积分购买
    codeMask() {
      this.byyWrapper = false
      // this.videoApear()
    },
    // 获取更多积分
    getMore() {
      this.$router.push({
        path: '/MyIntegral',
      })
    },
    // 关闭支付购买
    BecomMember(flag) {
      this.becomMemberCon = flag
      // this.videoApear()
    },
    // 获取网址上面的链接
    GetRequest() {
      let url = location.search
      let theRequest = {}
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      return theRequest;
    },
    // 获取用户信息
    _getUserInfo() {
      getUserInfo().then(res => {
        console.log('用户信息', res)
        if (res.code === 0) {
          console.log('执行')
          this.userObj = Object.assign({}, res.data)
          if (this.userObj.Telephone) {
            this.phoneNum = this.userObj.Telephone
          }
          if (this.userObj.TrueName) {
            this.userName = this.userObj.TrueName
          }
        }
      })
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
  /* background-color: #fff; */
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
.msgCon {
  /* background: rgba(0, 0, 0, 0.7); */
  position: relative;
  width: 100%;
  height: 100%;
}
.msgCon > .tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 0.32rem;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.msgCon > .tip > img {
  width: 1rem;
  height: 1rem;
}
.videoImg {
  width: 100%;
  height: 4.2rem;
}
.container .sendBtn .btn {
  width: 4.7rem;
  height: 0.65rem;
  border-radius: 0.15rem;
  color: #fff;
  font-size: 0.32rem;
  background-color: #e9bd77;
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
.container .detalItem {
  width: 100%;
  margin-top: 0.2rem;
  background-color: #fff;
  padding-top: 0.2rem;
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
  padding-bottom: 1rem;
}
.desc >>> p > p > span {
  font-size: 0.3rem !important;
}
.desc >>> p > span {
  font-size: 0.3rem !important;
}
.desc >>> p {
  font-size: 0.3rem !important;
  word-wrap: break-word;
  word-break: normal;
  white-space: normal !important;
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
  z-index: 0;
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
  text-align: center;
  background: #ffffff;
}
.btmHome {
  margin-left: 0.2rem;
  color: #555658;
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
  width: 25%;
  white-space: nowrap;
  line-height: 1rem;
  text-align: center;
  background: #c5a064;
  color: #ffffff;
}
.buyclass {
  width: 100%;
  text-align: center;
  font-size: 0.3rem;
  height: 100%;
}
.buy-wrapper {
  width: 4.69rem;
  height: 5.68rem;
  position: fixed;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  top: 3rem;
  margin: 0 auto;
  display: block;

  z-index: 1001;
}
.buyImg {
  width: 4.69rem;
  height: 5.68rem;
}
.buyContent {
  position: absolute;
  top: 2.9rem;
  width: 4.69rem;
}
.money {
  color: #c78415;
  font-size: 0.38rem;
  white-space: nowrap;
}
.moneyNum {
  font-weight: 700;
}
.balance {
  color: #3d3d3d;
  font-size: 0.25rem;
  margin-top: 0.26rem;
}
.defineBtm {
  width: 2.64rem;
  height: 0.73rem;
  background: #c78415;
  border-radius: 0.36rem;
  color: #ffffff;
  margin-top: 0.36rem;
}
.code_mask {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  opacity: 0.6;
}
/* 支付弹出框样式 */
.becomMember {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
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
.becomMember .name {
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
  /* line-height: 1rem; */
}
.courseDetail {
  text-align: left;
  width: 92%;
  margin-top: 0.3rem;
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
  margin-top: 0.52rem;
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

.selectHover {
  background: #e9bd77;
  color: #ffffff;
}
.topContent >>> .video-js .vjs-big-play-button {
  /*
  播放按钮换成圆形
  */
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
