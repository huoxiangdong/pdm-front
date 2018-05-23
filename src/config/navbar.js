export const navbars = [{
    level: 1,
    path: '/',
    comp: '/home',
    meta: {
      requireAuth: true, // 添加该字段表示该路由需要登录,路由验证
      //skipAuth: true //略过验证
    }
  },
  {
    level: 2,
    title: "处理中心",
    index: "index",
    comp: ''
  },
  {
    level: 2,
    title: "产品管理",
    index: "/WorkSpace/Design",
    comp: '/layout/workspace/workspace'
  },
  {
    level: 2,
    title: "物料管理",
    index: "/WorkSpace/MaterialBill",
    comp: '/layout/workspace/material/material-bill'
  },
  {
    level: 2,
    title: "报表系统",
    index: "/Report",
    comp: '/layout/workspace/workspace'
  },
  {
    level: 2,
    title: '演化',
    index: '/Evolution',
    comp: "/layout/workspace/workspace"
  }
]
