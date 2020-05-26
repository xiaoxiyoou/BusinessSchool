import Vue from 'vue'
import {
  getSdkData,
  shareNum
} from 'api/index'
import 'assets/js/vant'
import {
  Toast
} from 'vant'
var wx = require('weixin-js-sdk')
export default function wxShare(title, desc) {
  getSdkData({
    // tempurl: encodeURIComponent(location.href.split('#')[0]),
    tempurl: location.href,
  }).then(res => {

    console.log('分享接口', res)

    config(res.data)

  })
  const config = (data) => {

    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.data.appid, // 必填，公众号的唯一标识
      timestamp: data.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
      signature: data.data.signature, // 必填，签名，见附录1
      jsApiList: [
        'getLocation',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'chooseImage',
        'uploadImage',
        'downloadImage',
        'chooseWXPay',
        'getLocalImgData'
      ]
    })
    // var link = 'http://school.fg1413.com/tradercollegevideo/#' + location.href.split('#')[1]
    var link = 'http://school.fg1413.com/tradercollegevideo/#' +  localStorage.getItem('fromUrlTwo')
    console.log(link)
    wx.ready(() => {
      // console.log('分享')
      wx.onMenuShareAppMessage({
        title: title,
        link: link,
        desc: desc,
        imgUrl: 'http://school.fg1413.com/tradercollegevideo/img/share.png',
        success: () => {
          shareNum().then(res => {
            console.log('分享计数', res)
            if (res.code == 0) {
              console.log('分享成功')
            } else {
              // Toast('今日分享次数已达到上限')
            }
          })



        }
      })
      wx.onMenuShareTimeline({
        title: title,
        link: link,
        desc: desc,
        imgUrl: 'http://school.fg1413.com/tradercollegevideo/img/share.png',
        success: () => {
          shareNum().then(res => {
            console.log('分享计数', res)
            if (res.code == 0) {
              console.log('分享成功')
            } else {
              Toast('今日分享次数已达到上限')
            }
          })


        }
      })
    })
    wx.error(function () {})

  }


}
// 为Vue的原型对象添加该方法，则所有vue实例都能继承该方法
Vue.prototype.$wxShare = wxShare
// wxShare()