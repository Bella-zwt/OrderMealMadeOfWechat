//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ress:{},
    ee:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getSetting({
      success(res){
        //console.log(res.authSetting)
        if(res.authSetting['scope.userInfo']){
          wx.switchTab({
            url: '/pages/main/main',
          })
        }
      },
    })
  },
  onGotUserInfo: function (e) {
    var that = this;
    that.setData({
      ee:e
    })
    wx.setStorage({
      data: e.detail.rawData,
      key: 'e.detail.rawData',
    })
    wx.login({
      success:function(res){
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            appid:"wxfbecf646d924a533",
            secret:"c5fa962b850c542d82bb3feea8616850",
            js_code:res.code,
            grant_type:"authorization_code"
          },
          method:"GET",
          success:function(res){
            that.setData({
              ress:res
            });
           var json_info = JSON.parse(that.data.ee.detail.rawData);
          //  console.log(json_info);
            wx.request({
              url: 'http://127.0.0.1/OrderMeal/cus/login',
              data:{
                openId:that.data.ress.data.openid,
                nickName:json_info.nickName,
                sex:json_info.gender,
                headImg:json_info.avatarUrl
              },
              method:"POST",
              success:function(res){
                console.log(res.data.code)
                wx.setStorage({
                  data: that.data.ress.data.openid,
                  key: 'openId',
                })
              }
            })
          }
        })
        
      },
    })
    wx.switchTab({
      url: '/pages/main/main',
    })
  },
  bindgetuserinfo:function(e){
    if(e.detail.userInfo==undefined){
      wx.showModal({
        content: '您点击了取消授权将无法正常使用，请稍后再试',
        showCancel:false
      })
    }else{
      app.getUserInfo()
    }
  },
  navigate:function(e){
    wx.switchTab({
      url: '/pages/main/main',
    })
  }
})
