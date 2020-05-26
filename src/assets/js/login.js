import {
    getOpenId
} from 'api/index'
export default {
    _getCode() {
        let param = this.GetRequest();
        let code = param.code
        console.log('code', code)
        if (code === '' || code === undefined) {
            this.GetCode()
        } else {
            this.GetOpenId(code)
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
    GetCode: function () {

        let redirectUrl = window.location.href.split("#")[0]
        console.log('redirectUrl', redirectUrl)
        let url = 'http://wxapi.fuyulove.com/sns/getcode.aspx?keys=school&redirect_uri=' + redirectUrl
        window.location.href = url
    },
    GetOpenId(code) {
        getOpenId({
            code
        }).then(res => {
            console.log(res)
            if (res.code === 0) {
                console.log('res.data.VideoUserI', res.data.VideoUserId)
                this.$cookies.set('VideoUserId', res.data.VideoUserId)
                localStorage.setItem('VideoUserId', res.data.VideoUserId)
                // 上传打开
                if (res.data.OpenId) {
                    localStorage.setItem("openid", res.data.OpenId);
                }
                this.$router.replace({
                    // path: localStorage.getItem('fromUrl')+'?shareUserId=1|shareCode=2|freeCode=1'
                    path: localStorage.getItem('fromUrl')

                })
                console.log('fromUrl', localStorage.getItem('fromUrl'))
            }
        })
    }




}