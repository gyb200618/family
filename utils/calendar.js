function loadDate(baseDate) {
  baseDate = baseDate || new Date()

  var month = baseDate.getMonth()

  var monthStart = new Date(Date.parse(baseDate))
  monthStart.setDate(1)
  var firstDay = monthStart.getDay()
  var lastDate = 0
  var lastDay = 0

  for (var i = 27; i < 31; i++) {
    let cur = addDays(monthStart, i)
    if (cur.getMonth() == month) {
      lastDate = cur.getDate()
      lastDay = cur.getDay()
    } else {
      break
    }
  }

  return {
    firstDay: firstDay,
    lastDate: lastDate,
    lastDay: lastDay
  }
}

function addDays(baseDate, n) {
  var tmpDate = new Date(Date.parse(baseDate))
  tmpDate.setHours(12, 0, 0, 0)

  var t = tmpDate.valueOf()
  var nt = t + n * 24 * 3600 * 1000
  return new Date(nt)
}


module.exports = {
  loadDate: loadDate
}