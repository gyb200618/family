var Family = {
  createFamilyGroup: function(data, cb) {
    var groups = []
    try {
      groups = wx.getStorageSync('familyGroup')
      groups.push(data)
      wx.setStorageSync('familyGroup', groups)
      cb(null)
    } catch (e) {
      cb(e)
    }
  },

  syncUserInfo: function(userInfo, cb) {
    wx.request({
      url: 'https://gyb.leanapp.cn/api/user',
      data: userInfo,
      method: 'PUT',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        typeof cb == 'function' && cb()
      },
      fail: function (res) {
        console.log(res)
        typeof cb == 'function' && cb()
      }
    })
  }, 
  listFamilyGroups: function(option, cb) {
    var url = 'https://gyb.leanapp.cn/api/groups'
    if (option.memberId) {
      url += ('?m=' + option.memberId)
    } else {
      url += '/'
    }

    wx.request({
      url: url,
      success: function (res) {
        console.log(res.data.data)
        typeof cb == 'function' && cb(res.data.data)
      }
    })
  },
  listFamilyMembers: function(groupId, cb) {
    var url = 'https://gyb.leanapp.cn/api/groups/' + groupId + '/members/'
    wx.request({
      url: url,
      success: function(res) {
        console.log(res.data.data)
        typeof cb == 'function' && cb(res.data.data)
      }
    })
  },
  keepAccount: function(data, cb) {
    var url = 'https://gyb.leanapp.cn/api/accounts/'
    var method = 'POST'
    if (data.id) {
      url += data.id
      method = 'PUT'
    }
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        typeof cb == 'function' && cb()
      },
      fail: function(res) {
        console.log(res)
        typeof cb == 'function' && cb()
      }
    })
  },
  listAccounts: function(data, cb) {
    wx.request({
      url: 'https://gyb.leanapp.cn/api/accounts/',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        typeof cb == 'function' && cb(res.data.data)
      }
    })
  },
  calCost: function(data, cb) {
    wx.request({
      url: 'https://gyb.leanapp.cn/api/accounts?func=sum',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        typeof cb == 'function' && cb(res.data.data)
      }
    })
  },
  deleteAccount: function(data, cb) {
    wx.request({
      url: 'https://gyb.leanapp.cn/api/accounts/' + data.id,
      data: data,
      method: 'DELETE',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        typeof cb == 'function' && cb(res.data.data)
      }
    })
  }
}

module.exports = Family