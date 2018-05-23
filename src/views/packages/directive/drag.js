export default {
  inserted(el,binding,vnode) {

    let isDown = !1,
    offsetX,
    offsetY,
    eOffsetX,
    eOffsetY,
    left = el.getBoundingClientRect().left, // 移动e.page的距离,多出的部分(e.page = 元素位置+left)
    top = el.getBoundingClientRect().top
    console.log('inserted')
    console.log(el.getBoundingClientRect())
function down(e) {
//  console.log(el.getBoundingClientRect())
//  console.log(e)
  
  isDown = 1
  // 鼠标与元素的距离 e.offsetX/Y
  offsetX = e.pageX - el.getBoundingClientRect().left
  offsetY = e.pageY - el.getBoundingClientRect().top

  // offsetX = e.offsetX + el.offsetLeft//e.offsetX //e.pageX - left
  // offsetY = e.offsetY + el.offsetTop//e.offsetY //e.pageY - top
  // console.log(e)
  // console.log(el.offsetLeft +','+ left +',' + top)
  // console.log('state'+ state)
  // if (e.target != el) {
  //   offsetX = e.offsetX + e.target.offsetLeft + el.offsetLeft
  //   offsetY = e.offsetY + e.target.offsetTop + el.offsetTop
  // } else {
  //   offsetX = e.offsetX + el.offsetLeft, // 如果鼠标位置是在子元素上会有问题，因为获取的offseX是相对于其父元素的
  //   offsetY = e.offsetY + el.offsetTop // 例如 margin默认值,要减去   
  // }
  // x = e.clientX; // pageX
  // y = e.clientY;

  if (binding.modifiers.cursor) el.style.cursor = "move"
  addEventListener("mousemove", move)
  addEventListener("mouseup", up)
}

function move(e) {
  console.log(left+','+top)
  if (!isDown) return
  el.style.transform = `translate3d(${e.pageX - left - offsetX }px,${e.pageY - top - offsetY }px,0)`
  el.style.transition = '0s';
  
  //计算移动后的左偏移量和顶部的偏移量
  // (x - l) 鼠标的位置-元素的位置= 鼠标相对于元素的位置(e.offsetX/Y)
  
}

function up() {
  isDown = !1
  removeEventListener("mousemove", move)
  removeEventListener("mouseup", up)
}
el.addEventListener("mousedown", down)
  },
  bind(el, binding, vnode) {
    
  
  },
  update() {
   
  },
  unbind(el, binding) {}
};
