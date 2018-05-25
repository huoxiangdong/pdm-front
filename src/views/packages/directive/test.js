let mChildElX,
    mChildElY,
    // 边界 右下
    borderRight,
    borderBottom,
    // 父元素坐标 大小
    parentRect,
    // 父元素边框宽度
    borderWidth = parseInt((await getComputedStyle(el, null))['borderWidth']), // 父元素(el)边框宽度
    // 鼠标是否按下标志量
    isDown = !1,

if(el.children.length) {
  for(let i = 0; i < el.children.length; i++) {
    // 元素初始状态
    el.children[i].style.transition = 'unset' // 清除默认
    el.children[i].style.position = 'absolute'
    el.children[i].style.margin = '0'
    el.children[i].style.zIndex = '0'

       function down(e) { //鼠标按下 绑定到子元素上
         isDown = 1

         el.children[i].style.zIndex =  zIndex++ // 被拖动的元素用于位于顶层

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