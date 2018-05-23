export default {
  inserted(el,binding,vnode) {
   
    let isDown = !1,
        leftX,
        leftY,
        rightX,
        rightY,
        borderRight,
        borderBottom,
        // 移动e.page的距离,多出的部分(e.page = 元素位置+left)
        // 这里是元素初始的位置
        initElLeft = el.getBoundingClientRect().left, 
        initElTop = el.getBoundingClientRect().top,
        parent = Object.values(binding.value)[0],
        parentRect = parent.getBoundingClientRect(),
        moveElRect
        
   
    
function down(e) {
  
  isDown = 1
 let  downElRect = el.getBoundingClientRect()
  // 鼠标与元素左上角的距离 e.offsetX/Y
   leftX = e.pageX - downElRect.left // -元素移动后的位置
   leftY = e.pageY - downElRect.top
  // 鼠标与元素右下角的距离 
   rightX = downElRect.right - leftX 
   rightY = downElRect.bottom - leftY
  // 移动边界
   let borderWidth = parseInt(getComputedStyle(parent,null)['borderWidth'])
   borderRight = parentRect.width - downElRect.width - borderWidth//右
   borderBottom = parentRect.height - downElRect.height - borderWidth // 下

 console.log(parseInt(getComputedStyle(parent,null)['borderWidth']))
  if (binding.modifiers.cursor) el.style.cursor = "move"
  addEventListener("mousemove", move)
  addEventListener("mouseup", up)
}

function move(e) {
  if (!isDown) return
  moveElRect = el.getBoundingClientRect()


  let moveX = e.pageX - (initElLeft + leftX), // 元素X坐标 鼠标X轴与元素X轴的距离 ,(elLeft + leftX) 鼠标位置
      moveY = e.pageY - (initElLeft + leftY),
      // 边界判断
      border = moveElRect.left >= parentRect.left &&
               moveElRect.top >= parentRect.top &&  // 左上角
               moveElRect.right <= parentRect.right &&
               moveElRect.bottom <= parentRect.bottom ? true : false
  
  if (border ) {
    //当移动位置在范围内时，元素跟随鼠标移动。
    el.style.transform = `translate3d(${ (moveX < 0) ? 0 : (moveX >= borderRight ? borderRight : moveX) }px,
                                      ${ (moveY < 0) ? 0 : (moveY >= borderBottom ? borderBottom : moveY) }px,0)`
  }

}

function up() {
  isDown = !1
  removeEventListener("mousemove", move)
  removeEventListener("mouseup", up)
}
el.addEventListener("mousedown", down)
  },
  bind(el, binding, vnode) {
    el.style.transition = '0s' // 清楚默认

    
  },
  update() {

  },
  unbind(el, binding) {}
};
