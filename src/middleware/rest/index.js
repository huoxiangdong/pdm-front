/* api 接口 */

import Vue from 'vue'
import Rest from './plugin'
import config from './config'

// 将 rest注册到vue
Vue.use(Rest)

export default new Rest({
    rest: config
})

