Page({

  /**
   * 页面的初始数据
   */
  data: {
    favourite:"/images/收藏.png",
    order:"/images/文档.png",
    personal:"/images/通讯录.png",
    shop:"/images/商家.png",
    userHead:"/images/用户.png",
    userName:"用户名"
  },
  toMember:function(e){
    wx.navigateTo({
      url: '../member/member',
    })
  },
  toMycollection:function(e){
    wx.navigateTo({
      url: '../mycollection/mycollection',
    })
  },
  toHistory:function(e){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  toStore:function(e){
    wx.navigateTo({
      url: '../store/store',
    })
  },
  toJudge:function(e){
    wx.navigateTo({
      url: '../judge/judge',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'e.detail.rawData',
      success:function(res){
        var detail=res.data;
        var data=JSON.parse(detail);
        console.log(data)
        console.log(data.avatarUrl)
        console.log(data.nickName)
        that.setData({
          userHead:data.avatarUrl,
          userName:data.nickName,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})