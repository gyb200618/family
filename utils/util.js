function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatMoney(money, op) {
  money = money ? '' + money : ''
  var pos = money.indexOf('.')

  if (op == 'del') {
    if (money.length < 2) {
      return ''
    } else {
      return money.slice(0, -1)
    }
  } else if (op == 'dot') {
    if (pos == -1) {
      return money + '.'
    } else {
      if (pos == money.length - 3) {
        return money
      } else if (pos == money.length - 2) {
        return money + '0'
      } else {
        return money + '00'
      }
    }
  } else if (op == 'ok') {
    if (pos == -1) {
      return money
    } else {
      if (pos == money.length - 3) {
        return money
      } else if (pos == money.length - 2) {
        return money + '0'
      } else {
        return money + '00'
      }
    }
  } else {
    if (pos != -1 && pos == money.length - 3) {
      return money
    } else {
      return money + op
    }
  }
}

function range(start, stop, step) {
  if (arguments.length <= 1) {
    stop = start || 0
    start = 0
  }
  step = step || 1

  var length = Math.max(Math.ceil((stop - start) / step), 0)
  var range = Array(length)

  for (var idx = 0; idx < length; idx++ , start += step) {
    range[idx] = start
  }

  return range
}

module.exports = {
  formatTime: formatTime,
  formatMoney: formatMoney,
  formatNumber: formatNumber,
  range: range
}
