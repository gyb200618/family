// create.js
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var remark = []
    for (var i = 1; i <=20; i++) {
      var item = {
        status: false
      }
      if (i == 3) {
        item.bonus = 10
      }
      if (i == 10) {
        item.bonus = 50
      }
      if (i == 20) {
        item.bonus = 100
      }
      remark.push(item)
    }
    this.setData({
      remark: remark
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
  
  },

  remark: function() {
    for (var i in this.data.remark) {
      if (!this.data.remark[i].status) {
        this.data.remark[i].status = true
        break;
      }
    }

    this.setData({
      remark: this.data.remark
    })
  }
})