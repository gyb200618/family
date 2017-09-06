// list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: {
      name: '大润发购物',
      date: '14 August 2017',
      done: false,
      rate: 0,
      detail: [
        {
          description: '香皂',
          status: false
        },
        {
          description: '毛巾',
          status: false
        },
        {
          description: '洗衣液',
          status: false
        },
        {
          description: '牙刷',
          status: false
        },
        {
          description: '零食',
          status: false
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  clickDone: function(e) {
    var idx = e.currentTarget.dataset.idx
    this.data.task.detail[idx].status = true
    var total = 0
    var done = 0
    for (var i in this.data.task.detail) {
      if (this.data.task.detail[i].status) {
        done++
      }
      total++
    }
    this.data.task.rate = total == 0 ? 0 : Number.parseInt(done / total * 100)
    this.setData({
      task: this.data.task 
    })
  }
})