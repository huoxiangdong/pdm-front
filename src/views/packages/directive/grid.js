export default {
    install(Vue) {   
        Vue.directive('grid', {
            bind(el,binding,vnode) {
            console.info('Grid布局指令')
            const { value } = binding,
                  { children } = vnode

            function r(str) {
              if(str) return str.match(/[^,]+/g)   
            }
           
        
            const numReg = /\d+/g,
                  gap = r(value.gap),
                  col = r(value.col),
                  row = r(value.row)
    
            const gridSty = {
                display: binding.arg || 'grid',
                'grid-template-columns':`${col[0]}fr ${col[1]}fr`,
                // 'grid-template-rows':`${row[0]}fr ${row[1]}fr ${row[2]}fr`,
                'grid-column-gap': `${gap[0]}rem`,
                'grid-row-gap': `${gap[1]}rem`,
                // 'grid-template-rows': '100px 100px auto',
                // 'place-items':'start stretch',
                //background: '#ff5000'
            }
            
            Object.assign(el.style,gridSty)
            children.forEach(() => {
                Object.keys(value.child).forEach(key => {
                    const itemSty = {
                        'grid-column': `${r(value.child[key])[0]}`,
                        'grid-row': `${r(value.child[key])[1]}`,
                        'align-self':`${
                            (r(value.child[key])[2] === '0' ? 'start' : 
                             r(value.child[key])[2] === '1' ? 'center' : 
                             r(value.child[key])[2] === '2' ? 'end' : 'stretch' )}`
                    }
                    console.log(r(value.child[key]))
                    Object.assign(children[key].elm.style,itemSty)
                   
                })
                
            });
           
           }
          })
    }
}