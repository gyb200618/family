// detail.js
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
    this.initData()
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

  initData: function() {
    var detail = [
      {
        name: '边桌',
        budget: 400,
        model: 'JT2017',
        price: 300,
        count: 2,
        seller: 'tmall',
        tel: '13012345678',
        showDetail: false
      },
      {
        name: '茶几',
        budget: 800,
        model: '',
        price: 600,
        count: 1,
        seller: 'tmall',
        tel: '13012345678',
        showDetail: false
      },
      {
        name: '电视柜',
        budget: 1000,
        model: '白橡木',
        price: 1200,
        count: 1,
        seller: '蠡口',
        tel: '',
        showDetail: false
      },
      {
        name: '鞋柜',
        budget: 400,
        model: '超薄款',
        price: 300,
        count: 1,
        seller: '宜家',
        tel: '',
        showDetail: false
      }
    ]

    this.setData({
      detail: detail
    })
  },

  toggleDetail: function(e) {
    var idx = e.currentTarget.dataset.idx
    var show = this.data.detail[idx].showDetail
    this.data.detail[idx].showDetail = show ? false : true

    this.setData({
      detail: this.data.detail
    })
  }
})