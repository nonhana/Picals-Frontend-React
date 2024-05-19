// src/utils/constants.ts
// 用以存放项目中的常量

// 下拉框中的选项列表
type UserHeaderItem = {
  value: string
  name: string
}
export const HEADER_DROPDOWN_LIST: UserHeaderItem[] = [
  {
    value: 'works',
    name: '我发布的作品',
  },
  {
    value: 'likes',
    name: '我的喜欢',
  },
  {
    value: 'favorites',
    name: '我的收藏',
  },
  {
    value: 'history',
    name: '浏览记录',
  },
  {
    value: 'profile',
    name: '个人资料设置',
  },
]

// Header的菜单路由跳转
type HeaderMenuItem = {
  icon: string
  route: string
  name: string
}
export const HEADER_MENU_LIST: HeaderMenuItem[] = [
  {
    icon: 'ant-design:picture-filled',
    route: '/home',
    name: '插画',
  },
  {
    icon: 'ant-design:user-outlined',
    route: '/followed-new',
    name: '已关注用户新作',
  },
  {
    icon: 'ant-design:compass-outlined',
    route: '/explore',
    name: '探索页',
  },
]

// 哪些路由前缀要隐藏Header
export const HEADER_WHITE_LIST: RegExp = /^\/login/

// 哪些路由前缀需要对 Sidebar 进行特殊处理
export const SIDEBAR_WHITE_LIST = ['/home', '/followed-new', '/explore']

// 主页显隐侧边栏的触发宽度
export const TRIGGER_MIN_WIDTH = 1305
export const TRIGGER_MAX_WIDTH = 1545
