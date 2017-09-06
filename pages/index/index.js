//index.js
var Family = require('../../utils/family.js')

//获取应用实例
var app = getApp()
Page({
  data: {
    loaded: false,
    groups: []
  },

  //事件处理函数
  addGroup: function () {
    if (!this.data.loaded) {
      return
    }
    wx.navigateTo({
      url: '../group/create/create'
    })
  },
  intoFitment: function(e) {
    var groupId = e.currentTarget.dataset.group
    wx.navigateTo({
      url: '../fitment/index/index?id=' + groupId + '&userId=' + app.globalData.userId
    })
  },
  showStamp: function(e) {
    var groupId = e.currentTarget.dataset.group
    wx.navigateTo({
      url: '../task/create/create?id=' + groupId + '&userId=' + app.globalData.userId
    })
  },
  showTaskList: function(e) {
    var groupId = e.currentTarget.dataset.group
    wx.navigateTo({
      url: '../task/list/list?id=' + groupId + '&userId=' + app.globalData.userId
    })
  },
  showAccountList: function (e) {
    var groupId = e.currentTarget.dataset.group
    wx.navigateTo({
      url: '../account/list/list?id=' + groupId + '&userId=' + app.globalData.userId
    })
  },
  scanGroup: function () {
    if (!this.data.loaded) {
      return
    }
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.navigateTo({
          url: '../group/join/join',
        })
      }
    })
  },
  onLoad: function () {
    var that = this;
    that.login(function(code) {
      that.getUserId(code, function(userId) {
        that.syncUser(userId)
      })
    })
  },
  login: function (cb) {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('code' + res.code)
          typeof cb == 'function' && cb(res.code)
        } else {
          console.log('get user info fail:' + res.errMsg);
        }
      }
    })
  },
  getUserId: function(code, cb) {
    console.log('getUserId')
    wx.request({
      url: 'https://gyb.leanapp.cn/api/login',
      data: {
        code: code
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.userId = res.data.data
        console.log('userid:' + res.data.data)
        typeof cb == 'function' && cb(res.data.data)
      }
    })
  },
  syncUser: function(userId) {
    var that = this
    var option = {
      memberId: userId
    }

    app.getUserInfo(function (userInfo) {
      if (userInfo == null) {
        return;
      }
      console.log(userInfo)
      Family.syncUserInfo({
        id: option.memberId,
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        gender: userInfo.gender
      }, function () {
        Family.listFamilyGroups(option, function (results) {
          that.data.groups = results

          that.fetchGroupMembers(results)
        })
      })
    })
  },
  fetchGroupMembers: function(groups) {
    var that = this
    if (groups == null || groups.length == 0) {
      that.setData({
        loaded: true
      })
      return
    }
    for (var i in groups) {
      (function(id) {
        Family.listFamilyMembers(id, function (members) {
          var thisGroups = that.data.groups
          for (var i in thisGroups) {
            if (thisGroups[i].id == id) {
              thisGroups[i].members = members
              break
            }
          }

          that.setData({
            groups: thisGroups,
            loaded: true
          })
        })
      })(groups[i].id)
    }
  }
})
