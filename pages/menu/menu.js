//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
		sc_h:0,
		foodType:[],
		foods:[]
	},
	foodTypeDetail:function(e){
		var that=this;
		var index=e.currentTarget.dataset.index;
		console.log(index)
		wx.request({
			url: 'http://127.0.0.1/OrderMeal/food/showFoodByTypeId',
			data:{
				typeId:index
			},
			method:"GET",
			success:function(res){
				console.log(res.data);
				that.setData({
					foods:res.data
				})
			}
		})
	},
	toDetail:function(e){
		// console.log(e)
		wx.setStorage({
      data: e.currentTarget.dataset.post,
      key: 'e.currentTarget.dataset.post',
    })
		wx.navigateTo({
			url: '../detail/detail',
		})
	},
	toCart:function(e){
		wx.switchTab({
			url: '/pages/cart/cart',
		})
	},
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
		success:function(res){
			that.setData({
				sc_h: res.windowHeight
			})
		}
	})
		wx.request({
			url: 'http://127.0.0.1/OrderMeal/foodtype/showType',
			method:"GET",
			success:function(res){
				//console.log(res.data);
				that.setData({
					foodType:res.data
				})
			}
		})
		wx.request({
			url: 'http://127.0.0.1/OrderMeal/food/showFood',
			method:"GET",
			success:function(res){
				// console.log(res.data);
				that.setData({
					foods:res.data
				})
			}
		})
	},
	addCart:function(e){
		var foodId = e.currentTarget.dataset.food;
		var openId = wx.getStorageSync('openId');
		console.log(wx.getStorageSync('openId'))
		wx.request({
			url: 'http://127.0.0.1/OrderMeal/cart/addCart',
			data:{
					openId:openId,
					foodId:foodId
			},
			method:"GET",
			success:function(res){
				wx.showToast({
					title: res.data.msg
				})
			}
		})
	}
})
