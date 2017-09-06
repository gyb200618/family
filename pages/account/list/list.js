// list.js
var util = require('../../../utils/util.js')
var Family = require('../../../utils/family.js')
var types = require('../../../data/type.js')

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRefresh: false,
    dragging: false,
    del: 0,
    timer: null,
    types: types,
    months: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
    accounts: [],
    eventDealt: false,
    eventData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.groupId = options.id
    this.data.userId = options.userId
    
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
    this.reload()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  loadMore: function () {

  },
  refresh: function () {
    // console.log('refresh')
    // var that = this
    // setTimeout(function() {
    //   that.setData({
    //     isRefresh: true
    //   })
    // }, 4000)
  },

  loadAccounts: function() {
    var that = this
    Family.listAccounts({
      g: that.data.groupId
    }, function (results) {
      that.setData({
        accounts: results
      })
    })
  },

  calCost: function(month) {
    var that = this
    Family.calCost({
      g: that.data.groupId,
      d: month
    }, function(result) {
      that.setData({
        total: result
      })
    })
  },

  record: function () {
    var that = this
    wx.navigateTo({
      url: '../add/add?id=' + that.data.groupId + '&userId=' + this.data.userId
    })
  },

  tapAccountItem: function(e) {
    if (this.data.eventDealt) {
      return
    }

    this.data.eventDealt = true
    console.log('touch ing')
    if (this.data.eventData.amemid != this.data.userId) {
      return
    }

    console.log('touch process')

    this.dealItemTap(false)
  },
  touchStart: function(e) {
    console.log('touch start')
    let that = this
    that.data.touchStartTime = e.timeStamp
    that.data.eventDealt = false
    that.data.eventData = e.currentTarget.dataset

    that.data.timer = setTimeout(function() {
      if (that.data.eventDealt) {
        return
      }

      that.data.eventDealt = true

      that.dealItemTap(true)
    }, 500)
  },
  dealItemTap: function(timeout) {
    var id = this.data.eventData.aid
    var type = this.data.eventData.atype
    var cost = this.data.eventData.acost
    var month = this.data.eventData.amonth
    var date = this.data.eventData.adate
    var memo = encodeURIComponent(this.data.eventData.amemo)

    var touchTime = this.data.touchEndTime - this.data.touchStartTime
    if (timeout || touchTime > 350) {
      wx.vibrateShort({
        
      })
      this.setData({
        del: id
      })
    } else {
      wx.navigateTo({
        url: '../add/add?func=modify&id=' + this.data.groupId + '&userId=' + this.data.userId
        + '&aid=' + id + '&t=' + type + '&c=' + cost + '&m=' + month + '&d=' + date + '&memo=' + memo
      })
    }
  },
  touchEnd: function(e) {
    console.log('touch end')
    let that = this
    that.data.touchEndTime = e.timeStamp
    clearTimeout(that.data.timer)
    that.data.timer = null
  },

  drag: function(e) {
    if (!this.data.dragging) {
      this.data.start = e.changedTouches[0].clientY
      this.data.dragging = true 
    } 

    if (this.animation) {

    } else {
      this.animation = wx.createAnimation({
        duration: 100 
      })
    }

    this.animation.height(Math.min(320 + e.changedTouches[0].clientY - this.data.start, app.globalData.height)).step()

    this.setData({
      animationData: this.animation.export()
    })
  },
  deleteAccount: function(e) {
    let that = this
    var id = e.currentTarget.dataset.aid
    if (id == this.data.del) {
      Family.deleteAccount({
        id: id,
        groupId: this.data.groupId,
        memberId: this.data.userId
      }, function() {
        that.reload()        
      })
    }
  },
  tapOuter: function() {
    console.log('tap outer')
    this.setData({
      del: 0
    })
  },
  reload: function() {
    this.loadAccounts()

    var now = new Date()
    this.calCost(now.getFullYear() * 100 + now.getMonth() + 1)
  }
})