// 日期格式化
const formatterPickerDater = (type, val) => {
  if (type === 'year') {
    return `${val}年`
  }
  if (type === 'month') {
    return `${val}月`
  }
  if (type === 'day') {
    return `${val}日`
  }
}
/**
 * @description 将一位数字前面加0
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * @description
 * @param date        时间格式
 * @param splitFlag   时间转换格式，默认 yyyy/MM/dd;
 * @param showType    是否显示时分秒
 *        hour        显示到小时
 *        minute      显示到分钟
 *        second      显示到秒
 *        为空/false   不显示时分秒
 * @returns {string}  yyyy/MM/dd、yyyy/MM/dd hh:mm:ss、 yyyy年MM月dd日、yyyy-MM-dd
 */
const formatTime = (date, splitFlag, showType = false) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  let str = ''
  if (splitFlag) {
    let yearFlag = splitFlag.indexOf('年') > -1
    let monthFlag = splitFlag.indexOf('月') > -1
    let dayFlag = splitFlag.indexOf('日') > -1
    if (yearFlag || monthFlag || dayFlag) {
      yearFlag && (str += formatNumber(year) + '年')
      monthFlag && (str += formatNumber(month) + '月')
      dayFlag && (str += formatNumber(day) + '日')
    } else {
      str = [year, month, day].map(formatNumber).join(splitFlag)
    }
  } else {
    str = [year, month, day].map(formatNumber).join('/') // 默认
  }
  switch (showType) {
    case 'hour':
      str += ' ' + formatNumber(hour)
      break
    case 'minute':
      str += ' ' + [hour, minute].map(formatNumber).join(':')
      break
    case 'second':
      str += ' ' + [hour, minute, second].map(formatNumber).join(':')
      break
    default:
      break
  }
  return str
}
export {
  formatterPickerDater,
  formatTime,
}
