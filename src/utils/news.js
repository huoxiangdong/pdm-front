
export default {
    name: 'News',
    install(Vue) {
      let self = this

      Vue.$news = Vue.prototype.$news = function () {
         
        let newsConstructor = Vue.extend(self),
          instance = new newsConstructor({ data:{
              test:'ddd'
          }})
        instance.vm = instance.$mount()
        document.body.appendChild(instance.vm.$el)
        return instance.vm

      }
    },

    data() {
       return {

       }
    },
    render() {
      let newsProps = {
          style: {
              color: '#ff5000'
          }

      }
      return (
          <div {...newsProps}>1111</div>
      )  
    }
}