Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[]
    // items:[{
    //   id:0,
    //   num:1,
    //   minusStatus: 'disabled'
    // },
    // {
    //   id:1,
    //   num:1,
    //   minusStatus: 'disabled'
    // },
    // {
    //   id:2,
    //   num:1,
    //   minusStatus: 'disabled'
    // },
    // {
    //   id:3,
    //   num:1,
    //   minusStatus: 'disabled'
    // },
    // {
    //   id:4,
    //   num:1,
    //   minusStatus: 'disabled'
    // }]
  },
  minus: function(e) {
    var id=e.currentTarget.dataset.id;
    var num = this.data.items[id].cart.num;
    // 如果大于1时，才可以减  
    if (num > 1) {  
        num --;  
    }  
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';  
    // 将数值与状态写回  
    var flag="items["+id+"].cart.num";
    // console.log(flag);
    var condition="items["+id+"].minusStatus";
    this.setData({  
        [flag]: num,  
        condition: minusStatus  
    });  
},  
/* 点击加号 */  
plus: function(e) {  
  var id=e.currentTarget.dataset.id;
  var num = this.data.items[id].cart.num;
    // 不作过多考虑自增1 
    // this.data.items[id].cart.num++; 
    num ++;  
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';  
    // 将数值与状态写回  
    var flag="items["+id+"].cart.num";
    var condition="items["+id+"].minusStatus";
    this.setData({  
        [flag]: num,  
        condition: minusStatus  
    });   
},
change: function(e) { 
  var num = e.detail.value;
  // 将数值与状态写回  
  var id=e.currentTarget.dataset.id;
  var flag="items["+id+"].num";
  this.setData({  
      flag: num  
  });  
},

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openId = wx.getStorageSync('openId');
    var _this = this;
    console.log(openId+"===cart")
    wx.request({
      url: 'http://127.0.0.1/OrderMeal/cart/loadCart',
      data:{
        openId:openId
      },
      method:"GET",
      success:function(res){
        var cart = res.data.foods;
        console.log(cart);
        _this.setData({
          items:cart
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
    var openId = wx.getStorageSync('openId');
    var _this = this;
    console.log(openId+"===cart")
    wx.request({
      url: 'http://127.0.0.1/OrderMeal/cart/loadCart',
      data:{
        openId:openId
      },
      method:"GET",
      success:function(res){
        var cart = res.data.foods;
        console.log(cart);
        _this.setData({
          items:cart
        })
      }
    })
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