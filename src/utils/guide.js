export default {
  name: 'Guide',
  install(Vue) {
       let self = this
            Vue.$Guide = Vue.prototype.$Guide = function() {
                console.log('执行')
                
               let guideConstructor = Vue.extend(self)
               let instance = new guideConstructor()
               instance.vm = instance.$mount()
               document.body.appendChild(instance.vm.$el)
               return instance.vm
            }
    },
    data() {
        return {
          lines: {
            // 横
            xt: null, // 上 top
            xc: null, // 中 
            xb: null, // 下 bottom
            // 竖
            yl: null, // 左 left
            yc: null, // 中
            yr: null, // 右 right
          },
       
        gap: 3
        }
    },
    methods: {
       show(line) {
         line.elm.style.display = 'block' 
      
       },
       hide(line) {
           line.elm.style.display = 'none'
       },
       isShow(line) {
           return line.elm.style.display != 'none'
       },
       diff(dragNode, diffNodes,dragRect,parentRect) { // 所有元素 & 元素选择器 
        console.log(this.lines)
        let { lines,
              show,undiff,_isNearly} = this
        // checkNodes   = typeof checkNodes === 'string' ? document.querySelectorAll(checkNodes) : checkNodes  // 元素集合

        // let dragRect = dragNode.getBoundingClientRect() // 元素位置 & 大小 相对于视口
       
        undiff() // 移除参考线
        
       diffNodes.forEach((item) => {
            item.classList.remove('guide-line-active') // 移除活动的参考线
            if (item === dragNode) return //dragNode 排除被点击的元素
            
            let {top, height, bottom, left, width, right} = item.getBoundingClientRect() // 每一个元素位置&大小 不含被点击元素
             //console.log(diffNodes[0].getBoundingClientRect().top +','+ window.scrollY)
             console.log(diffNodes[0].getBoundingClientRect().bottom +','+ window.scrollY)

            // top = top + window.scrollY
            // bottom = bottom + window.scrollY
            // left = left + window.scrollX
            // right = right + window.scrollX

            // dragRect.top = dragRect.top + window.scrollY
            // dragRect.bottom = dragRect.bottom + window.screenY
            // dragRect.left = dragRect.top + window.scrollX
            // dragRect.right = dragRect.top + window.scrollX
            // 中间
            let dragWidthHalf = dragRect.width / 2
            let itemWidthHalf = width / 2

            let dragHeightHalf = dragRect.height / 2
            let itemHeightHalf = height / 2

            let conditions = { // 条件判断 (被点击元素 & 所有元素)
                top: [
                    // xt-top
                    {
                        isNearly : _isNearly(dragRect.top, top), // 是否在其附近
                        lineNode : lines.xt, // 参考线
                        lineValue: top,
                        dragValue: top
                    },
                    //xt-bottom
                    {
                        isNearly : _isNearly(dragRect.bottom, top),
                        lineNode : lines.xt,
                        lineValue: top,
                        dragValue: top - dragRect.height
                    },
                    // xc
                    {
                        isNearly : _isNearly(dragRect.top + dragHeightHalf, top + itemHeightHalf),
                        lineNode : lines.xc,
                        lineValue: top + itemHeightHalf,
                        dragValue: top + itemHeightHalf - dragHeightHalf
                    },
                    // xb-top
                    {
                        isNearly : _isNearly(dragRect.bottom, bottom),
                        lineNode : lines.xb,
                        lineValue: bottom,
                        dragValue: bottom - dragRect.height
                    },
                    // xb-bottom
                    {
                        isNearly : _isNearly(dragRect.top, bottom),
                        lineNode : lines.xb,
                        lineValue: bottom,
                        dragValue: bottom
                    },
                ],

                left: [
                    // yl-left
                    {
                        isNearly : _isNearly(dragRect.left, left),
                        lineNode : lines.yl,
                        lineValue: left,
                        dragValue: left
                    },
                    // yl-right
                    {
                        isNearly : _isNearly(dragRect.right, left),
                        lineNode : lines.yl,
                        lineValue: left,
                        dragValue: left - dragRect.width
                    },
                    // yc
                    {
                        isNearly : _isNearly(dragRect.left + dragWidthHalf, left + itemWidthHalf),
                        lineNode : lines.yc,
                        lineValue: left + itemWidthHalf,
                        dragValue: left + itemWidthHalf - dragWidthHalf
                    },
                    // yr-left
                    {
                        isNearly : _isNearly(dragRect.right, right),
                        lineNode : lines.yr,
                        lineValue: right,
                        dragValue: right - dragRect.width
                    },
                    // yr-right
                    {
                        isNearly : _isNearly(dragRect.left, right),
                        lineNode : lines.yr,
                        lineValue: right,
                        dragValue: right
                    },
                ]
            }
          // 执行判断
            for (let key in conditions) { 
                // 遍历符合的条件并处理
                conditions[key].forEach((condition) => {  
                    if (!condition.isNearly) return
               
                    //  console.log('判断')
                    //  console.log(this)
                    // isActive = true
                    // console.log(isActive)
                    item.classList.add('guide-line-active') // 为参考线添加 ref-line-active类
                    // dragNode.style[key]           = `${condition.dragValue}px`
                    // condition.lineNode.elm.style.width = `${parentRect.width}px`
                    //  condition.lineNode.elm.style['left'] = `${parentRect.x}px`
                    // condition.lineNode.elm.style['top'] = `${parentRect.y}px`
                     condition.lineNode.key[0] == 'x'?
                     (condition.lineNode.elm.style['width'] = `${parentRect.width}px`,
                     condition.lineNode.elm.style['left'] = `${parentRect.x}px`)
                     :(condition.lineNode.elm.style['height'] = `${parentRect.height}px`,
                     condition.lineNode.elm.style['top'] = `${parentRect.y}px`)
                    
                    //  dragNode.style[key]           = `${condition.dragValue}px`
                    condition.lineNode.elm.style[key] = `${condition.lineValue }px` // 参考线样式          
                    show(condition.lineNode) // 显示参考线
                  
                    
                })
            }
        })
    },
    undiff() {
        Object.values(this.lines).forEach((line) => this.hide(line)) // 隐藏参考线
        // Array.from(document.querySelectorAll('.ref-line-active')).forEach((item) => item.classList.remove('ref-line-active')) // 移除活动的参考线
    },
    _isNearly(dragValue, targetValue) { // 被点击元素 & 所有元素   
        return Math.abs(dragValue - targetValue) <= this.gap // 点击的元素-其他元素小于3,则在其附近 Math.abs返回指定数字 “x“ 的绝对值
    }
    },
    render(h) {
      let  { lines } = this
   
    let renderLine = function() {  
        return Object.keys(lines).map(title => {
            let linesProps = {
                style: {     display: 'none',
                             opacity: '0.7',
                             position: 'absolute',
                             background: '#ff5000',
                             'z-index': 19891114,
                             ...(title[0] === 'x' ? {width:'100%',height:'1px',left:0} : {width:'1px',height:'100%',top:0})
                            },
                class: {'ref-line':true },
                key: title
            }
            return lines[title] = (<div {...linesProps}>{title}</div>)
        })
    }
    return ( <div >{ renderLine() }</div>)
  
    }
}

