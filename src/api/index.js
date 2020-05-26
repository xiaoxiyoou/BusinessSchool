import ajax from './ajax'

// 1. 定义基础路径
// const BASE_URL = '/api'
// const BASE_URL = 'http://demo.fg1413.com/'
// const BASE_URL = 'http://192.168.8.150:1008/'
// const BASE_URL = 'http://mzwechat.fushun.cn/'
// const BASE_URL = 'http://test.fg1413.com'
// const BASE_URL = 'http://demo.fg1413.com'

const BASE_URL = 'http://school.fg1413.com'


// 登录
export const getOpenId = (params) => ajax(BASE_URL + '/VideoUser/GetUserInfo',params)
// 获取sdkdata
// export const getSdkData = (params) => ajax(BASE_URL + '/FuneralService/JsSdk',params)
export const getSdkData = (params) => ajax(BASE_URL + '/Home/JsSdk',params)
// export const getSdkData = (params) => ajax('http://school.fg1413.com/home/jssdk',params)
// 首页轮播图
export const getSwiperList = (params) => ajax(BASE_URL + '/videoad/GetTopListViewData',params)
// 首页分类数据显示
export const getList = (params) => ajax(BASE_URL + '/Video/GetVideoListByCate',params,'POST')
// 首页社员专享
export const geMembertList = (params) => ajax(BASE_URL + '/VideoSection/GetListData',params,'GET')
// 首页学员见证
export const witnessList = (params) => ajax(BASE_URL + '/VideoCase/GetListData',params,'GET')
// 学员见证详情
export const witnessListDetail = (params) => ajax(BASE_URL + '/VideoCase/GetDataModel',params,'GET')
// 已购课程页面
export const alredyBuyList = (params) => ajax(BASE_URL + '/VideoUserOrder/GetListDataByUser',params)
// 线下课程列表接口
export const getOfflineList = (params) => ajax(BASE_URL + '/VideoOfflineCourse/GetListViewDataByPage',params)
// 线下课程详情
export const getOfflineDetail = (params) => ajax(BASE_URL + '/VideoOfflineCourse/GetOffineCourseViewModel',params)
// 线下课程报名
export const getOfflineAdd = (params) => ajax(BASE_URL + '/VideoUserapply/Add',params,'POST')
// 行业分类
export const getBusiness = (params) => ajax(BASE_URL + '/IndustryCategory/GetTopListViewData',params)
// 视频列表页
export const getVideoList = (params) => ajax(BASE_URL + '/video/GetListViewDataByPage',params)
// 个人中心
// 用户基本信息
export const getUserInfo = (params) => ajax(BASE_URL + '/VideoUser/GetDataUserSortByUid',params)
// 手机绑定
export const sendPhoneBound = (params) => ajax(BASE_URL + '/VideoUser/UpdateVideoUserTel',params)
// 视频详情

// 视频详情页
export const getVideoDetail = (params) => ajax(BASE_URL + '/video/GetViewDataModel',params)
// 视频详情留言列表
export const getEvaluateList = (params) => ajax(BASE_URL + '/VideoMessage/GetListViewDataByPage',params)
// 视频留言
export const sendEvaluate = (params) => ajax(BASE_URL + '/VideoMessage/Add',params)
// 课程内容点击
export const VideoCategory = (params) => ajax(BASE_URL + '/VideoCategory/GetTopListViewData',params)
// 社员专享列表
export const NumCategory = (params) => ajax(BASE_URL + '/Video/GetVideoListAllBySection',params)
// 视频列表页点击学习
export const getStudy = (params) => ajax(BASE_URL + '/Video/GetUserDataById',params)
// 视频列表页积分验证
export const getIntegral = (params) => ajax(BASE_URL + '/Video/GetUserAndVideoData',params)
// 视频课程分节

export const episodes = (params) => ajax(BASE_URL + '/VideoItem/GetListData',params)
// 微信支付提交接口
export const payCourse = (params) => ajax(BASE_URL + '/WebChatPay/GenerateOrder',params,'POST')
// 微信支付获取
export const getPayCode = (params) => ajax(BASE_URL + '/WebChatPay/GetWebChatOpenId',params)
// 用户意见反馈
export const sendUserOpinion = (params) => ajax(BASE_URL + '/VideoFeedback/Add',params)
// 已购课程中的付费课程
export const alredyPayCourse = (params) => ajax(BASE_URL + '/Video/GetListPageByUser',params)
// 请求支付ID
export const GetWebChatOpenId = (params) => ajax(BASE_URL + '/WebChatPay/GetWebChatOpenId',params)
// 用户签到
export const toSign = (params) => ajax(BASE_URL + '/VideoUserSign/VideoUserSignAdd',params)
// 修改昵称
export const amendNickName = (params) => ajax(BASE_URL + '/VideoUser/UpdateVideoUserName',params)
// 修改姓名
export const amendName = (params) => ajax(BASE_URL + '/VideoUser/UpdateVideoUserTrueName',params)
// 验证码
export const getSendCode = (params) => ajax(BASE_URL + '/VideoUser/SendCodeService',params)
// 我的社员
export const myNumber = (params) => ajax(BASE_URL + '/VideoUser/GetListDataByParentUserId',params)
// 我的 邀请码
export const myInvitation = (params) => ajax(BASE_URL + '/VideoActivationCodeNum/GetListDataByPage',params)
// 报名课程页面
export const getApplyList = (params) => ajax(BASE_URL + '/VideoUserapply/GetListByUser',params)
//赠课资格
export const myGiveData = (params) => ajax(BASE_URL + '/VideoFreeCode/GetListDataByPage',params)
//我的收益接口
export const myProfit = (params) => ajax(BASE_URL + '/VideoUserFrance/GetListPageByUser',params)
//我的取现明细
export const myCash = (params) => ajax(BASE_URL + '/VideoUserCash/GetListDataByPage',params)
//提现
export const getMyCash = (params) => ajax(BASE_URL + '/VideoUserCash/AddVideoUserCash',params)
//我的推广  邀请卡二维码
export const getQrcode = (params) => ajax(BASE_URL + '/VideoInvite/CreateQRCode',params)
// 买的名额生成邀请码
//我邀请码和用户信息接口
export const getQrcodeUserBuy = (params) => ajax(BASE_URL + '/VideoActivationCodeNum/GetModel',params)
// 我的邀请码二维码接口
export const getQrcodeBuy = (params) => ajax(BASE_URL + '/VideoActivationCodeNum/CreateQRCode',params)
// 赠送的课生成的二维码
// 赠送资格和用户信息接口
export const getQrcodeUserGive = (params) => ajax(BASE_URL + '/VideoFreeCode/GetModel',params)
// 赠送资格码二维码接口
export const getQrcodeGive = (params) => ajax(BASE_URL + '/VideoFreeCode/CreateQRCode',params)
// 赠送资格码二维码接口扫描进入
export const inQrcodeGive = (params) => ajax(BASE_URL + '/VideoUser/UpdateVideoUserTelAndFreeCode',params)
// 购买接口扫描进入
export const inQrcodeBuy= (params) => ajax(BASE_URL + '/VideoUser/UpdateVideoUserTelAndAinviteCode',params)
// 推广扫扫描进去
export const ingetQrcode= (params) => ajax(BASE_URL + '/VideoUser/UpdateVideoUserTelAndUserName',params)
// 用户观看视频
export const VideoView= (params) => ajax(BASE_URL + '/VideoView/Add',params)
// 分享接口
export const shareNum= (params) => ajax(BASE_URL + '/VideoUserShare/Add',params)
// 测试支付接口
export const ceshibuy= (params) => ajax(BASE_URL + '/WebChatPay/JsApiNotifyUrl',params,'POST')
// 判断是否购买社员专享课程
export const isCourseDatail= (params) => ajax(BASE_URL + '/VideoOrder/IsOrderByOrderType',params)
// 观看会员课程与购买资格绑定
export const isBandCouese= (params) => ajax(BASE_URL + '/VideoOrderItem/AddVideoOrderItem',params)
// 赠送码请求
export const getFreeCouese= (params) => ajax(BASE_URL + '/VideoFreeCode/VideoFreeCodeApp',params)
// 完善个人信息
export const cofirmMsg= (params) => ajax(BASE_URL + '/VideoUser/VideoUserSign',params)
// 地址选择
export const UserAddress= (params) => ajax(BASE_URL + '/VideoUser/UpdateVideoUserAddress',params)



