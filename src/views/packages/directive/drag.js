let count = 0
export default {
  async bind(el,binding,vnode) {
    console.log(binding)
    console.log('这里是bind')
let mChildElX, // 鼠标与元素距离
    mChildElY,
    // 边界 右下
    borderRight,
    borderBottom,
    // 父元素坐标 大小
    parentRect,
    // 父元素边框宽度
    borderWidth = parseInt((await getComputedStyle(el, null))['borderWidth']), // 父元素(el)边框宽度
    // 鼠标是否按下标志量
    isDown = !1
    // await vnode.context.$nextTick(() => parentRect = el.getBoundingClientRect())
 
if(el.children.length) {

  for(let i = 0; i < el.children.length; i++) {
 
    // 元素初始状态
    el.children[i].style.transition = 'unset' // 清除默认
    el.children[i].style.position = 'absolute'
    el.children[i].style.margin = '0'
    el.children[i].style.zIndex = '0'

       function down(e) { //鼠标按下 绑定到子元素上
         isDown = 1
       
         el.children[i].style.zIndex++ // 被拖动的元素用于位于顶层

         binding.arg && (el.children[i].style.cursor = binding.arg) // 鼠标样式

         let downChildRect = el.children[i].getBoundingClientRect() // 鼠标按下后的子元素位置，可以获取子元素移动后的位置
        
        parentRect = el.getBoundingClientRect() // 页面滚动的时候，el的位置会变的
        // 移动最大距离(右，下)
         borderRight = parentRect.width - (downChildRect.width + borderWidth) //右边
         borderBottom = parentRect.height - (downChildRect.height + borderWidth) // 下边

         // 鼠标与元素左上角的距离 
         mChildElX = e.pageX - (downChildRect.x + window.scrollX) // -元素移动后的位置
         mChildElY = e.pageY - (downChildRect.y + window.scrollY)

         // 全局监听鼠标移动 按下事件
         addEventListener("mousemove", move)
         addEventListener("mouseup", up)
       }
     
       function move(e) { // 鼠标移动
  
        if(!isDown) return
        
         let moveChildRect = el.children[i].getBoundingClientRect()
         // 开始移动的点 ((parentRect.x + borderWidth + window.scrollX) + mChildElX)
         let moveX = e.pageX - ((parentRect.x + borderWidth + window.scrollX) + mChildElX), // 元素X坐标 鼠标X轴与元素X轴的距离 ,
             moveY = e.pageY - ((parentRect.y + borderWidth + window.scrollY) + mChildElY),
           // 边界判断
           border = moveChildRect.left >= parentRect.left && // 左
                    moveChildRect.top >= parentRect.top && // 上
                    moveChildRect.right <= parentRect.right && // 右
                    moveChildRect.bottom <= parentRect.bottom ? true : false // 下

         if (border) {
           // 当移动位置在范围内时，元素跟随鼠标移动。
           el.children[i].style.transform = `translate3d(${ (moveX < 0) ? 0 : (moveX > borderRight ? borderRight- borderWidth : moveX) }px,
                                             ${ (moveY < 0) ? 0 : (moveY > borderBottom ? borderBottom- borderWidth : moveY) }px,0)`
         }
   
       }

       function up() { // 鼠标抬起
         isDown = !1
         el.children[i].style.cursor = 'default'
         removeEventListener("mousemove", move)
         removeEventListener("mouseup", up)
        
        
       }
      el.children[i].addEventListener("mousedown", down) // 子元素添加按下事件  
 } 
}
    
  },
  //inserted(el, binding, vnode) {

      // vnode.context.$forceUpdate()
    //    let offsetX, offsetY, borderRight, borderBottom, parentRect,
    //    borderWidth = parseInt(getComputedStyle(el, null)['borderWidth']), // 父元素(el)边框宽度
    //    index = 999,
    //    isDown = !1,
    //    initChild_X = el.getBoundingClientRect().x + borderWidth,
    //    initChild_Y = el.getBoundingClientRect().y + borderWidth
    // for(let i = 0; i < el.children.length; i++) {
    //    el.children[i].style.transition = 'all 0s linear 0s' // 清除默认
    //    // 若有子元素初始位置
    //    el.children[i].style.position = 'absolute'
    //    el.children[i].style.margin = '0'
       
   
    //   // 这里是元素初始的位置
    //   // let initChild_X = el.children[i].getBoundingClientRect().x,
    //   //     initChild_Y = el.children[i].getBoundingClientRect().y
          
    //       function down(e) { //鼠标按下 绑定到子元素上
    //         console.log(vnode)
    //         isDown = 1
    //         //console.log(el.getBoundingClientRect())
    //         //console.log(el.children[i].getBoundingClientRect())
           
    //          el.children[i].style.zIndex =  index++ // 被拖动的元素用于位于顶层
   
    //         binding.arg && (el.children[i].style.cursor = binding.arg)
            
    //         let downChildRect = el.children[i].getBoundingClientRect() // 鼠标按下后的子元素位置，可以获取子元素移动后的位置
    //             parentRect = el.getBoundingClientRect() // 页面滚动的时候，el的位置会变的
    //              // 移动最大距离(右，下)
    //         borderRight = parentRect.width - (downChildRect.width + borderWidth) //右边
    //         borderBottom = parentRect.height - (downChildRect.height + borderWidth) // 下边

    //         // 鼠标与元素左上角的距离 e.offsetX/Y
    //         // e.offsetX 由于元素嵌套的问题，会不准确
    //         offsetX = e.pageX - (downChildRect.x + window.scrollX) // -元素移动后的位置
    //         offsetY = e.pageY - (downChildRect.y + window.scrollY)
          
           
    //         // 全局监听鼠标移动 按下事件
    //         addEventListener("mousemove", move)
    //         addEventListener("mouseup", up)
    //       }
        
    //       function move(e) { // 鼠标移动
    //        if(!isDown) return
           
    //         let moveChildRect = el.children[i].getBoundingClientRect()
    //         // (initChild_X + leftX) 鼠标位置 移动开始的位置
    //         // moveX/Y 移动距离
    //         // getBoundingClientRect相对于视口, 如果你需要获得相对于整个网页左上角定位的属性值，那么只要给top、left属性值加上当前的滚动位置（通过window.scrollX和window.scrollY），这样就可以获取与当前的滚动位置无关的值
    //         let moveX = e.pageX - (initChild_X + offsetX), // 元素X坐标 鼠标X轴与元素X轴的距离 ,
    //             moveY = e.pageY - (initChild_Y + offsetY),
    //           // 边界判断
    //           border = moveChildRect.left >= parentRect.left && // 左
    //                    moveChildRect.top >= parentRect.top && // 上
    //                    moveChildRect.right <= parentRect.right && // 右
    //                    moveChildRect.bottom <= parentRect.bottom ? true : false // 下

    //         if (border) {
    //           // el.children[i].style.transform = `translate3d(${moveX}px,
    //           //                                   ${ moveY }px,0)`
    //           // 当移动位置在范围内时，元素跟随鼠标移动。
    //           el.children[i].style.transform = `translate3d(${ (moveX < 0) ? 0 : (moveX > borderRight ? borderRight- borderWidth : moveX) }px,
    //                                             ${ (moveY < 0) ? 0 : (moveY > borderBottom ? borderBottom- borderWidth : moveY) }px,0)`
    //         }
      
    //       }

    //       function up() { // 鼠标抬起
    //         isDown = !1
    //         el.children[i].style.cursor = 'default'
            
    //         removeEventListener("mousemove", move)
    //         removeEventListener("mouseup", up)
           
    //       }
    //       el.children[i].addEventListener("mousedown", down) // 子元素添加按下事件  
    // } 
   
  //},
  // componentUpdated(el,binding,vnode,oldVnode) {
    
  //   console.log('更新了')
  //   count++
  //   console.log('更次' + count)
  //  let oldChild =  vnode.children.filter((item,index) => {
  //     return vnode.children[index].key !== (oldVnode.children[index] && oldVnode.children[index].key) 
  //   })
  //   // for(let i = 0;i < oldChild.length; i++) {
     
  //   //   oldChild.elm[i].elm.style.position = 'absolute'
  //   //   //oldChild.elm[i].elm.style.margin = '0'
  //   // }
  //   if(oldChild.length) {
     
  //     let offsetX, offsetY, borderRight, borderBottom, parentRect,
  //     borderWidth = parseInt(getComputedStyle(el, null)['borderWidth']), // 父元素(el)边框宽度
  //     index = 999,
  //     isDown = !1,
  //     initChild_X = el.getBoundingClientRect().x + borderWidth,
  //     initChild_Y = el.getBoundingClientRect().y + borderWidth
  //  for(let i = 0; i < oldChild.length; i++) {
  //   oldChild[i].elm.style.transition = 'all 0s linear 0s' // 清除默认
  //     // 若有子元素初始位置
  //     oldChild[i].elm.style.position = 'absolute'
  //     oldChild[i].elm.style.margin = '0'
      
  
  //    // 这里是元素初始的位置
  //    // let initChild_X = el.children[i].getBoundingClientRect().x,
  //    //     initChild_Y = el.children[i].getBoundingClientRect().y
         
  //        function down(e) { //鼠标按下 绑定到子元素上
          
  //          isDown = 1
  //          //console.log(el.getBoundingClientRect())
  //          //console.log(el.children[i].getBoundingClientRect())
          
  //          oldChild[i].elm.style.zIndex =  index++ // 被拖动的元素用于位于顶层
  
  //          binding.arg && (oldChild[i].elm.style.cursor = binding.arg)
           
  //          let downChildRect = oldChild[i].elm.getBoundingClientRect() // 鼠标按下后的子元素位置，可以获取子元素移动后的位置
  //              parentRect = el.getBoundingClientRect() // 页面滚动的时候，el的位置会变的
  //               // 移动最大距离(右，下)
  //          borderRight = parentRect.width - (downChildRect.width + borderWidth) //右边
  //          borderBottom = parentRect.height - (downChildRect.height + borderWidth) // 下边

  //          // 鼠标与元素左上角的距离 e.offsetX/Y
  //          // e.offsetX 由于元素嵌套的问题，会不准确
  //          offsetX = e.pageX - (downChildRect.x + window.scrollX) // -元素移动后的位置
  //          offsetY = e.pageY - (downChildRect.y + window.scrollY)
         
          
  //          // 全局监听鼠标移动 按下事件
  //          addEventListener("mousemove", move)
  //          addEventListener("mouseup", up)
  //        }
       
  //        function move(e) { // 鼠标移动
  //         if(!isDown) return
          
  //          let moveChildRect = oldChild[i].elm.getBoundingClientRect()
  //          // (initChild_X + leftX) 鼠标位置 移动开始的位置
  //          // moveX/Y 移动距离
  //          // getBoundingClientRect相对于视口, 如果你需要获得相对于整个网页左上角定位的属性值，那么只要给top、left属性值加上当前的滚动位置（通过window.scrollX和window.scrollY），这样就可以获取与当前的滚动位置无关的值
  //          let moveX = e.pageX - (initChild_X + offsetX), // 元素X坐标 鼠标X轴与元素X轴的距离 ,
  //              moveY = e.pageY - (initChild_Y + offsetY),
  //            // 边界判断
  //            border = moveChildRect.left >= parentRect.left && // 左
  //                     moveChildRect.top >= parentRect.top && // 上
  //                     moveChildRect.right <= parentRect.right && // 右
  //                     moveChildRect.bottom <= parentRect.bottom ? true : false // 下

  //          if (border) {
  //            // el.children[i].style.transform = `translate3d(${moveX}px,
  //            //                                   ${ moveY }px,0)`
  //            // 当移动位置在范围内时，元素跟随鼠标移动。
  //            oldChild[i].elm.style.transform = `translate3d(${ (moveX < 0) ? 0 : (moveX > borderRight ? borderRight- borderWidth : moveX) }px,
  //                                              ${ (moveY < 0) ? 0 : (moveY > borderBottom ? borderBottom- borderWidth : moveY) }px,0)`
  //          }
     
  //        }

  //        function up() { // 鼠标抬起
  //          isDown = !1
  //          oldChild[i].elm.style.cursor = 'default'
           
  //          removeEventListener("mousemove", move)
  //          removeEventListener("mouseup", up)
          
  //        }
  //        oldChild[i].elm.addEventListener("mousedown", down) // 子元素添加按下事件  
  //  } 
  //   }
  // console.log(oldChild)
    

  // }

}

