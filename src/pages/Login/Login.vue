<template>
  <div class="container"></div>
</template>

<script type="text/ecmascript-6">
import { getOpenId } from 'api/index'

export default {
  data() {
    return {
      redirect: ''
    }
  },
  mounted() {
    this._getCode()
  },
  methods: {
    _getCode() {
      let param = this.GetRequest();
      let code = param.code
      if (code === '' || code === undefined) {
        this.GetCode()
      } else {

        this._GetOpenId(code)

      }
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
    _GetOpenId(code) {

      getOpenId({
        code
      }).then(res => {
        console.log(res)

        if (res.code === 0) {

          console.log('res.data.VideoUserId', res.data.VideoUserId)
          this.$cookies.set('VideoUserId', res.data.VideoUserId)
          localStorage.setItem('VideoUserId', res.data.VideoUserId)
          // 上传打开
          if (res.data.OpenId) {
            localStorage.setItem("openid", res.data.OpenId);
          }
          if (this.$cookies.get('fromUrl')) {
            this.$router.replace({
              // path: localStorage.getItem('fromUrl')+'?shareUserId=1|shareCode=2|freeCode=1'
              path: this.$cookies.get('fromUrl')

            })
          } else {
            this.$router.replace({
              path: 'home/index'
            })

          }
          console.log('fromUrl', this.$cookies.get('fromUrl'))
        } else {
          // this.GetCode()

        }
      })
    },


    GetCode() {

      // let redirectUrl = 'http://192.168.8.151:8080/tradercollegevideo/#' + this.$cookies.get('fromUrl')
      let redirectUrl = 'http://school.fg1413.com/tradercollegevideo/#'+ this.$cookies.get('fromUrl')
      let url = 'http://wxapi.fuyulove.com/sns/getcode.aspx?keys=school&redirect_uri=' + redirectUrl
      window.location.href = url

    },

  }
}
</script>

<style scoped>
</style>
