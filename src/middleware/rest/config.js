import { Message } from 'element-ui'
import ajax from './ajax'

// 设置错误提示信息
ajax.setTipFn((tips) => {
  Message.error(tips)
})

export default {
  submit: {
    register: ajax.create('/api/register'),
    login: ajax.create('/api/login'),
    token: ajax.query('/api/token'),
    addMaterial: ajax.create('/api/material'),
    queryMaterial: ajax.create('/api/material/query'),
    
  },
}