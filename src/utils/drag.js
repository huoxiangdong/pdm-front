export default class Drag {
    constructor (el,options = {}) {
        this.options = options
     
        this.events = {}
        this.$el   = el
        this.$childrens = [] // 子元素集合
        // this.$moveChildRect
        this.EVENTS = this._isTouch()
        ? ["touchstart", "touchmove", "touchend"] // 移动
        : ["mousedown", "mousemove", "mouseup"] // 桌面
        
        this.init() // 执行的方法
    }

    on(type, fn) { // 传入监听事件&回调函数
        this._getEventCall(type).push(fn) // 将事件、回调存入events对象 
        return this
    }

    remove(type, fn) { // 移除回调函数
        var event = this._getEventCall(type)
        if (!fn) { // 若没有回调
            this.events[type] = []
        } else {
            // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目
            event.splice(event.indexOf(fn), 1) // 元素索引，删除元素个数
        }
        return this
    }

    trigger(type) { //  触发器
        var event  = this._getEventCall(type) // 获取事件回调
        var params = Array.prototype.slice.call(arguments, 1) // 截取下标为1的实参 [事件e,被点击元素]
    
        event.forEach(function (fn) {
            fn.apply(fn, params) // 将截取的实参传入回调
        })

        return this
    }
    _getEventCall(type) { // 将事件类型存入events对象
        if (!this.events[type]) this.events[type] = [] // events对象若没有该类型事件，挂载为key，value为事件回调
 
        return this.events[type] // 返回事件回调[]
    }
    _getEventInfo(e) { // 事件信息
        return this._isTouch() ? e.targetTouches[0] : e
    }

    async init(){
        let self = this
        let mChildElX,
            mChildElY,
            // 边界 右下
            borderRight,
            borderBottom,
            // 父元素坐标 大小
            parentRect,
            // 父元素边框宽度
            borderWidth = parseInt((await getComputedStyle(this.$el, null))['borderWidth']), // 父元素(el)边框宽度
            // 鼠标是否按下标志量
            isDown = !1
        if(this.$el.children.length) {
            for(let i = 0; i < this.$el.children.length; i++) {
                this.$childrens.push(this.$el.children[i])
                // 元素初始状态
                this.$el.children[i].style.transition = 'unset' // 清除默认
                this.$el.children[i].style.position = 'absolute'
                this.$el.children[i].style.margin = '0'
                this.$el.children[i].style.zIndex = '0' // 这个需另处理

                this.$el.children[i].addEventListener(this.EVENTS[0], function (e) { // down事件
                    isDown = 1
                    //self.$targetEl = self.$el.children[i]
                    console.log('按下')
                    // console.log(self.$el.children[i])
                    e = self._getEventInfo(e) // e
                    // 写到这里了
                    self.$el.children[i].style.zIndex++ // 被拖动的元素用于位于顶层

                    self.options.cursor && (self.$el.children[i].style.cursor = self.options.cursor) // 鼠标样式
           
                    let downChildRect = self.$el.children[i].getBoundingClientRect() // 鼠标按下后的子元素位置，可以获取子元素移动后的位置
                   
                    parentRect = self.$el.getBoundingClientRect() // 页面滚动的时候，el的位置会变的
                   // 移动最大距离(右，下)
                    borderRight = parentRect.width - (downChildRect.width + borderWidth) //右边
                    borderBottom = parentRect.height - (downChildRect.height + borderWidth) // 下边
           
                    // 鼠标与元素左上角的距离 
                    mChildElX = e.pageX - (downChildRect.x + window.scrollX) // -元素移动后的位置
                    mChildElY = e.pageY - (downChildRect.y + window.scrollY)
           
                    // 全局监听鼠标移动 按下事件
                    document.addEventListener(self.EVENTS[2], up)
                    document.addEventListener(self.EVENTS[1], move) // move事件 执行回调

                    self.trigger('start',{e, dragEl:self.$el.children[i],els:self.$childrens,parentRect}) // 处理移动端事件 
                   
                    function move(e) {
                        if(!isDown) return // 标志量
                        
                         e  = self._getEventInfo(e) // e

                        let moveChildRect = self.$el.children[i].getBoundingClientRect()
                        // self.$moveChildRect = moveChildRect
                        // 开始移动的点 ((parentRect.x + borderWidth + window.scrollX) + mChildElX)
                        // // 元素X坐标 鼠标X轴与元素X轴的距离 ,
                        let moveX = e.pageX - ((parentRect.x + borderWidth + window.scrollX) + mChildElX), 
                            moveY = e.pageY - ((parentRect.y + borderWidth + window.scrollY) + mChildElY),

                            $moveX = (moveX < 0) ? 0 : (moveX > borderRight ? borderRight- borderWidth : moveX),
                            $moveY = (moveY < 0) ? 0 : (moveY > borderBottom ? borderBottom- borderWidth : moveY),
                          // 边界判断
                          border = moveChildRect.left >= parentRect.left && // 左
                                   moveChildRect.top >= parentRect.top && // 上
                                   moveChildRect.right <= parentRect.right && // 右
                                   moveChildRect.bottom <= parentRect.bottom ? true : false // 下
                           
                        if (border) {
                          // 当移动位置在范围内时，元素跟随鼠标移动。
                          self.$el.children[i].style.transform = `translate3d(${ $moveX }px,${ $moveY }px,0)`
                        }
        
                        self.trigger('move', {e, dragEl:self.$el.children[i],els:self.$childrens,moveChildRect,parentRect}); // 移动端 move
                    }
        
                    document.addEventListener(self.EVENTS[2], up) // 释放

                    function up(e) {
                        isDown = !1
                        document.removeEventListener(self.EVENTS[1], move)
                        document.removeEventListener(self.EVENTS[2], up)
                        self.trigger('up', {e, dragEl:self.$el.children[i],els:self.$childrens})
                    }
                }) // down事件

            }
            

        }
        
    }

    // 移动平台判断
    _isTouch(e) { 
        return 'ontouchstart' in window ||
            window.DocumentTouch && document instanceof window.DocumentTouch || // 是谁构造的
            navigator.maxTouchPoints > 0 || // 返回当前设备能够支持的最大同时触摸的点数
            window.navigator.msMaxTouchPoints > 0
    }
    
}

  

Drag.install = function (Vue) {
   
    Vue.directive('drag', {
        inserted (el, binding, vnode) {
         console.log('测试指令')    
        let Guide = Vue.$Guide() 
        new Drag(el, { cursor: binding.arg })

            .on('move', ({ dragEl,els,moveChildRect,parentRect }) =>  Guide.diff(dragEl,els,moveChildRect,parentRect))

            .on('up', () =>  Guide.undiff())   
        }
      }) 
  }
  




// //  参考   
// (function () {

//     /**
//      * Install plugin
//      * @param Vue
//      * @param axios
//      */
    
//     function plugin(Vue, axios) {
    
//       if (plugin.installed) { return }

//       plugin.installed = true
    
//       if (!axios) {
//         console.error('You have to install axios')
//         return
//       }
    
//       Vue.axios = axios
    
//       Object.defineProperties(Vue.prototype, {
    
//         axios: {
//           get() {
//             return axios
//           }
//         },
    
//         $http: {
//           get() {
//             return axios
//           }
//         }
    
//       })
//     }
    
//     if (typeof exports == "object") {
//       module.exports = plugin
//     } else if (typeof define == "function" && define.amd) {
//       define([], function(){ return plugin })
//     } else if (window.Vue && window.axios) {
//       Vue.use(plugin, window.axios)
//     }
    
//     })();