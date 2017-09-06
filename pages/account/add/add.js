// add.js
var types = require('../../../data/type.js')
var util = require('../../../utils/util.js')
var Family = require('../../../utils/family.js')

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 2010; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    days: days,
    day: date.getDate(),
    value: [date.getFullYear() - 2010, date.getMonth(), date.getDate() - 1],
    types: types,
    curType: 0,
    cost: '',
    dpHidden: true,
    kbHidden: false,
    func: 'add',
    editing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.groupId = options.id
    this.data.userId = options.userId

    console.log('options-------')
    console.log(options)

    if (options.func && options.func == 'modify') {
      this.data.id = options.aid
      this.setData({
        year: Math.floor(Number(options.m) / 100),
        month: Number(options.m) % 100,
        day: Number(options.d),
        value: [Math.floor(Number(options.m) / 100) - 2010, Number(options.m) % 100 - 1, Number(options.d) - 1],
        curType: Number(options.t),
        cost: options.c,
        memo: options.memo ? decodeURIComponent(options.memo) : '',
        func: 'modify'
      })
    }

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
    console.log('userid:' + this.data.userId)
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

  typeChange: function (e) {
    var type = e.currentTarget.dataset.type || 0
    this.setData({
      curType: type
    })
  },

  dateChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },

  editDate: function () {
    this.setData({
      dpHidden: false,
      kbHidden: true
    })
  },

  inputCost: function () {
    this.setData({
      kbHidden: false,
      dpHidden: true
    })
  },

  cancelInput: function () {
    this.setData({
      kbHidden: true,
      dpHidden: true
    })
  },

  keyboardOp: function (e) {
    var op = e.currentTarget.dataset.op || 0
    var cost = this.data.cost
    this.setData({
      cost: util.formatMoney(cost, op),
      kbHidden: op == 'ok' ? true : false
    })
  },
  toggleMemoInput: function() {
    this.setData({
      editing: this.data.editing ? false : true
    })
  },

  submitRecord: function (e) {
    var cdate = new Date()
    cdate.setFullYear(this.data.year, this.data.month - 1, this.data.day)

    var account = {
      groupId: this.data.groupId,
      memberId: this.data.userId,
      costType: this.data.curType,
      cost: Number(this.data.cost) + 0,
      costDate: this.data.year * 10000 + this.data.month * 100 + this.data.day,
      day: cdate.getDay(),
      memo: e.detail.value.memo
    }

    if (this.data.func == 'modify' && this.data.id) {
      account.id = this.data.id
    }

    Family.keepAccount(account, function() {
      wx.navigateBack({
        delta: 1
      })
    })
  }
})