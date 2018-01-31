import { Message } from 'element-ui'
import ajax from './ajax'

// 设置错误提示信息
ajax.setTipFn((tips) => {
  Message.error(tips)
})

export default {
  user: {
    register: ajax.create('/api/register'),
    login: ajax.create('/api/login'),
    token: ajax.query('/api/token')
  },
  /* auth: {
    github: ajax.query('/api/auth/github'),
    getGithubUser: ajax.query('/api/auth/github/user')
  } */
}