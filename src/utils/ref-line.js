let lines = {
  // 横
  xt: null, // 上 top
  xc: null, // 中 
  xb: null, // 下 bottom
  // 竖
  yl: null, // 左 left
  yc: null, // 中
  yr: null, // 右 right
}
// 置入参考线
for (let p in lines) {

  let node = lines[p] = document.createElement('div') // 创建div元素

  node.classList.add('ref-line', p) // 为div添加'.ref-line'

  node.style.cssText = `display:none;
                        opacity:0.7;
                        position:absolute;
                        background:#424242;
                        z-index:199111250; 
                        ${p[0] === 'x' ? 'width:913.5px;height:1px;left:49px;' : 'width:1px;height:483px;top:88px;'}`

  // 挂上一些辅助方法
  node.show   = function () { // 显示
      this.style.display = 'block' // 块
  }
  node.hide   = function () {
      this.style.display = 'none' // 隐藏
  }
  node.isShow = function () { // true 在显示
      return this.style.display !== 'none'
  }
 
 
  document.body.appendChild(node) // 插入body
}
// let lineComponet =   {
//     data() {
//       return {
//         text:'111',
//         style: {
//           display: 'block',
//           opacity: '0.7',
//           position: 'absolute',
//           background: '#424242',
//           top:'',
//           right:'',
//           'z-index': 199111250
//         }
//       }

//     },
//     methods: {
//       show() {
//         this.style.display = 'block'
//       },
//       hide() { 
//         this.style.display = 'none'
//       },
//       isShow() {
//         this.style.display !== 'none'
//       }
//     },
//     render (h) {
//       const { text, style,
//              guideLineActive, 
//               show} = this

//       const guideProps = {
//         attrs: {
        
//         },
//         style: '',
//         class: { guide:true},
//         on: {
//          click: show
//         },
//       }
//       return h('div',{},Object.keys(lines).map(key => {
         
//         return lines[key] = h('div',{
//           ...guideProps ,
//           style: {...style,...(key[0] === 'x' ? {width:'100%',height:'1px',left:0} : {width:'1px',height:'100%',top:0})}
         
//         },text)
//       }))
//   }
// }

 class  Guide {
  constructor(options) { // 构造器
      this.options = Object.assign({
          gap: 3 // 间距
      }, options)
      this.$instance
     
    
  }
  
  install(Vue, options) {
 
    let self = this
    Vue.$Guide = Vue.prototype.$Guide = function (el) {
      let instance; // 实例
      let instances = []; // 实例栈 控制关闭
      
      // let GuideConstructor = Vue.extend(lineComponet) // 子类
      // instance = new GuideConstructor() // 实例
      // self.$instance = instance.vm = instance.$mount(); // 挂载
     
      //el.appendChild(instance.vm.$el); // 插入dom
   
      return self
      //console.log(instance.$mount())
  
    }
  }

  check(dragEl, els,dragRect) { // 目标元素,元素集合,目标坐标
      // checkNodes   = typeof checkNodes === 'string' ? document.querySelectorAll(checkNodes) : checkNodes  // 元素集合

      //let dragRect = dragNode.getBoundingClientRect() // 元素位置 & 大小 相对于视口

      this.unlines() // 移除参考线

      Array.from(els).forEach((item) => {
          //item.classList.remove('ref-line-active') // 移除活动的参考线
          // this.$instance.guideLineActive = !1
          item.classList.remove('ref-line-active') // 移除活动的参考线
          if (item === dragEl) return //dragNode 排除被点击的元素
        
          let { top, height, bottom, left, width, right } = item.getBoundingClientRect() // 每一个元素位置&大小 不含被点击元素
          // 所有元素中心线
          let dragWidthHalf = dragRect.width / 2
          let dragHeightHalf = dragRect.height / 2

          let itemWidthHalf = width / 2
          let itemHeightHalf = height / 2

          let conditions = { // 条件判断 (被点击元素 & 所有元素)
            // 对比 先判断是否靠近-> 靠近 -> drag元素对比坐标 = 对比元素对比坐标
            //                        -> 显示参考线 
              top: [
                  // xt-top
                  {   // 对比上
                      isNearly : this._isNearly(dragRect.top, top), // 是否在其附近
                      lineNode : lines.xt, // 参考线 上 横线
                      lineValue: top, // line top = line top
                      dragValue: top  // drag top = line top 
                  },
                  // xt-bottom
                  {   // drag el 底 与 other el top 对比
                      isNearly : this._isNearly(dragRect.bottom, top),
                      lineNode : lines.xt, // 显示上横线
                      lineValue: top,
                      dragValue: top - dragRect.height //
                  },
                  // xc
                  {
                      isNearly : this._isNearly(dragRect.top + dragHeightHalf, top + itemHeightHalf),
                      lineNode : lines.xc,
                      lineValue: top + itemHeightHalf,
                      dragValue: top + itemHeightHalf - dragHeightHalf
                  },
                  // xb-top
                  {
                      isNearly : this._isNearly(dragRect.bottom, bottom),
                      lineNode : lines.xb,
                      lineValue: bottom,
                      dragValue: bottom - dragRect.height
                  },
                  // xb-bottom
                  {
                      isNearly : this._isNearly(dragRect.top, bottom),
                      lineNode : lines.xb,
                      lineValue: bottom,
                      dragValue: bottom
                  },
              ],

              left: [
                  // yl-left
                  {
                      isNearly : this._isNearly(dragRect.left, left),
                      lineNode : lines.yl,
                      lineValue: left,
                      dragValue: left
                  },
                  // yl-right
                  {
                      isNearly : this._isNearly(dragRect.right, left),
                      lineNode : lines.yl,
                      lineValue: left,
                      dragValue: left - dragRect.width
                  },
                  // yc
                  {
                      isNearly : this._isNearly(dragRect.left + dragWidthHalf, left + itemWidthHalf),
                      lineNode : lines.yc,
                      lineValue: left + itemWidthHalf,
                      dragValue: left + itemWidthHalf - dragWidthHalf
                  },
                  // yr-left
                  {
                      isNearly : this._isNearly(dragRect.right, right),
                      lineNode : lines.yr,
                      lineValue: right,
                      dragValue: right - dragRect.width
                  },
                  // yr-right
                  {
                      isNearly : this._isNearly(dragRect.left, right),
                      lineNode : lines.yr,
                      lineValue: right,
                      dragValue: right
                  },
              ]
          }

          for (let key in conditions) { // 执行判断
              // 遍历符合的条件并处理
              conditions[key].forEach((condition) => {
                  if (!condition.isNearly) { return false }
                  // this.$instance.guideLineActive = 1 // 为参考线添加 ref-line-active类
                  item.classList.add('ref-line-active') // 为参考线添加 ref-line-active类
                  // dragEl.style[key]           = `${condition.dragValue}px`
                  condition.lineNode.style[key] = `${condition.lineValue}px` // 参考线样式
                  // this.$instance.style[key] = `${condition.dragValue}px`
                //  condition.lineNode.style.display = 'block'
                  // dragEl.style[key]           = `${condition.dragValue}px`
                  // condition.lineNode.elm.style[key] = `${condition.lineValue}px` // 参考线样式
                  condition.lineNode.show() // 显示参考线
                 
              })
          }
      })
  }

  unlines() {
    Object.values(lines).forEach((item) => item.hide()) // 隐藏参考线
        Array.from(document.querySelectorAll('.ref-line-active')).forEach((item) => item.classList.remove('ref-line-active')) // 移除活动的参考线
      //  this.$instance.hide()
      //  if(this.$instance.guideLineActive) return !this.$instance.guideLineActive
      // Object.values(lines).forEach((item) => item.hide()) // 隐藏参考线
      // Array.from(document.querySelectorAll('.ref-line-active')).forEach((item) => item.classList.remove('ref-line-active')) // 移除活动的参考线
  }

  _isNearly(dragValue, targetValue) { // 被点击元素 & 所有元素   
      return Math.abs(dragValue - targetValue) <= this.options.gap // 点击的元素-其他元素小于3,则在其附近  Math.abs返回指定数字 “x“ 的绝对值
  }
}
export default new Guide()

// Guide.install = function (Vue, options) {

//   Vue.prototype.$Guide = function () {
//     let instance; // 实例
//     let instances = []; // 实例栈 控制关闭
//     let GuideConstructor = Vue.extend(lineComponet) // 子类
//     instance = new GuideConstructor() // 实例
//     instance.vm = instance.$mount(); // 挂载
//     document.body.appendChild(instance.vm.$el); // 插入dom
//     return instance.vm
//     //console.log(instance.$mount())

//   }
// }

// import Vue from 'vue';

// import { PopupManager } from 'element-ui/src/utils/popup';


// let ContextMenuConstructor = Vue.extend(Main) // 子类

// let instance; // 实例
// let instances = []; // 实例栈 控制关闭
// let seed = 1; // id

// const ContextMenu = function(options) {


//   options = options || {};
//   if (typeof options == 'object') {
//     options = {
//       position: options, // 传值
//     };
//   }
  

//   let id = 'contextmenu_' + seed++; // id
// //   let userOnClose = options.onClose;
// //   options.onClose = function() { //关闭时的回调函数
// //     ContextMenu.close(id, userOnClose);
// //   };
  
//   instance = new ContextMenuConstructor({ data: options,store }); // 实例
  
//   instance.id = id;


//   instance.vm = instance.$mount(); // 挂载

//   document.body.appendChild(instance.vm.$el); // 插入dom

//   instance.vm.visible = true; // 可见 v-show="visible"
//   instance.dom = instance.vm.$el; // el代理
  
//   instance.dom.style.zIndex = PopupManager.nextZIndex(); // 设置 z-index属性
//   instances.push(instance);

//   return instance.vm; // 返回实例
// };



// /* ContextMenu.close = function(id, userOnClose) {
//   for (let i = 0, len = instances.length; i < len; i++) {
//     if (id === instances[i].id) {
//       if (typeof userOnClose === 'function') {
//         userOnClose(instances[i]);
//       }
//       instances.splice(i, 1);
//       break;
//     }
//   }
// }; */

// /* ContextMenu.closeAll = function() {
//   for (let i = instances.length - 1; i >= 0; i--) {
//     instances[i].close();
//   }
// }; */

// export default ContextMenu;