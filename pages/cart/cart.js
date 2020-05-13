Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[]
  },
  minus: function(e) {
    var id=e.currentTarget.dataset.id;
    var fid=e.currentTarget.dataset.fid;
    var num = this.data.items[id].cart.num;
    // 如果大于1时，才可以减  
    if (num > 1) {  
      var id=e.currentTarget.dataset.id;
      var openId = wx.getStorageSync('openId');
      var num = this.data.items[id].cart.num;
      var _this = this;
      wx.request({
        url: 'http://127.0.0.1/OrderMeal/cart/subNum',
        data:{
          openId:openId,
          foodId:fid
        },
        method:"GET",
        success:function(res){
            if(res.statusCode==200){
              if(res.data.code==200){
                 // 不作过多考虑自增1 
                // this.data.items[id].cart.num++; 
                num --;  
                // 只有大于一件的时候，才能normal状态，否则disable状态  
                var minusStatus = num <= 1 ? 'disabled' : 'normal';  
                // 将数值与状态写回  
                var flag="items["+id+"].cart.num";
                var condition="items["+id+"].minusStatus";
                _this.setData({  
                    [flag]: num,  
                    condition: minusStatus  
                });   
              }else{
                wx.showToast({
                  title: '出错啦！请稍后再试',
                });
              }
            }else{
              wx.showToast({
                title: '出错啦！请稍后再试',
              });
            }
          }
      }); 
    }else{
      wx.showToast({
        title: '已经不能再减啦:)',
      });
    }
},  
/* 点击加号 */  
plus: function(e) {  
  var id=e.currentTarget.dataset.id;
  var fid=e.currentTarget.dataset.fid;
  var openId = wx.getStorageSync('openId');
  var num = this.data.items[id].cart.num;
  var _this = this;
  wx.request({
    url: 'http://127.0.0.1/OrderMeal/cart/addNum',
    data:{
      openId:openId,
      foodId:fid
    },
    method:"GET",
    success:function(res){
        if(res.statusCode==200){
          if(res.data.code==200){
             // 不作过多考虑自增1 
            // this.data.items[id].cart.num++; 
            num ++;  
            // 只有大于一件的时候，才能normal状态，否则disable状态  
            var minusStatus = num < 1 ? 'disabled' : 'normal';  
            // 将数值与状态写回  
            var flag="items["+id+"].cart.num";
            var condition="items["+id+"].minusStatus";
            _this.setData({  
                [flag]: num,  
                condition: minusStatus  
            });   
          }else{
            wx.showToast({
              title: '出错啦！请稍后再试',
            });
          }
        }else{
          wx.showToast({
            title: '出错啦！请稍后再试',
          });
        }
    }
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
deleteAllCart:function(){
  var openId = wx.getStorageSync('openId');
  var _this = this;
  wx.request({
    url: 'http://127.0.0.1/OrderMeal/cart/deleteAllCart',
    method:"GET",
    data:{
      openId:openId
    },
    success:function(res){
      if(res.statusCode==200){
        if(res.data.code==200){
          _this.setData({
            items:[]
          });
          wx.showToast({
            title: '购物车已清空',
          });
        }else{
          wx.showToast({
            title: '出错啦！请稍后再试',
          });
        }
      }else{
        wx.showToast({
          title: '出错啦！请稍后再试',
        });
      }
    }
  })
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