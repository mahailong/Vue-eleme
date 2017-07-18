/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id: 12345, a: b}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = encodeURIComponent(tempArr[0])
      let val = encodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}

/**
 * 转换时间格式
 * @param {Number} date
 * @param {Sting} fmt
 */
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : `00${str}`.substr(str.length))
      }
    }
    return fmt
  }
}

/**
 * 在localStorage中存储商家信息
 * @param {*} id
 * @param {*} key
 * @param {*} value
 */
export function saveToLocal (id, key, value) {
  let seller = localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  localStorage.__seller__ = JSON.stringify(seller)
}

/**
 * 读取localStorage中的商家信息
 * @param {*} id
 * @param {*} key
 * @param {*} value
 */
export function loadFromLocal (id, key, def) {
  let seller = localStorage.__seller__
  if (!seller) return def
  seller = JSON.parse(seller)
  if (!seller[id]) return def
  let value = seller[id][key]
  return value || def
}
