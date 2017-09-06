//app.js
App({
  onLaunch: function () {
    try {
      var res = wx.getSystemInfoSync()
      this.globalData.width = res.windowWidth
      this.globalData.height = res.windowHeight
    } catch (e) {
      console.log(e)
    }
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          console.log('begin get user')
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail: function (error) {
              console.log(error)
              typeof cb == "function" && cb(null)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    userId: null,
    code: null
  }
})