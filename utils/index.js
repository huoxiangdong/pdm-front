// 驼峰式转换
const hyphenateRE = /\B([A-Z])/ // \B 非单词边界 A-Z 大写字母
export const hyphenate = (str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase() // 将匹配的大写字母转小写加 -
}

const ESC = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '&': '&amp;'
}

function escapeChar (a) {
    return ESC[a] || a
  }
  
export function escape (str) {
    return str.replace(/[<>"&]/g, escapeChar)
  }

 
  


export const genStyle = (style) => {
    let styleText = ''
    for (const key in style) {
      const value = style[key]
      const hyphenatedKey = hyphenate(key)
      if (Array.isArray(value)) {
        for (let i = 0, len = value.length; i < len; i++) {
          styleText += `${hyphenatedKey}:${value[i]};`
        }
      } else {
        styleText += `${hyphenatedKey}:${value};`
      }
    }
    return styleText
  }