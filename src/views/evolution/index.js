import Evolution from './main.vue'
// Evolution -> {}.install 
Evolution.install = function(Vue) {
    Vue.component(Evolution.name, Evolution)
}

export default Evolution