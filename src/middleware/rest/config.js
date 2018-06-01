import { Message } from 'element-ui' // 单独引入 Message(options)
import ajax from './ajax'

// 使用 el message方法弹出错误
ajax.setTipFn((tips) => {
  Message.error(tips)
})

// axios 提交
export default {
  submit: {
    register: ajax.create('/api/Register'),
    login: ajax.create('/api/Login'),
    token: ajax.query('/api/Token'),
    // query 为 Get方法
    addMaterialData: ajax.create('/api/Material'), // config2
    addPartiallyData: ajax.create('/api/Partially'), // config2
    queryMaterialData: ajax.query('/api/Material/Query'),
    updateMaterialData: ajax.create('/api/Material/Update'),
    deleteMaterialData: ajax.query('/api/Material/Delete')
    
  },
}