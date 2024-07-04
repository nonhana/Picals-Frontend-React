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
export const HEADER_MENU_LIST_VISITOR: HeaderMenuItem[] = [
  {
    icon: 'ant-design:picture-filled',
    route: '/home',
    name: '插画',
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

// 上传文件的最大大小
export const MAX_WORK_SIZE = 1024 * 1024 * 10 // 上传作品，每张图片最大10MB
export const MAX_INFO_SIZE = 1024 * 1024 * 5 // 修改个人信息（如头像），每张图片最大5MB

// 加载时的提示语
export const LOADING_TIP = '加载中，请稍等...'

// 浏览列表名称映射
export const VIEW_LIST_MAP = {
  userWorkList: '用户作品',
  likeWorkList: '喜欢作品',
  favoriteWorkList: '收藏作品',
  followingNewWorkList: '关注作品',
  recommendWorkList: '推荐作品',
  illustratorWorkList: '原作作品',
  searchResultWorkList: '搜索结果',
}

// 浏览列表图标映射
export const VIEW_LIST_ICON_MAP = {
  userWorkList: 'material-symbols:person-outline',
  likeWorkList: 'material-symbols:favorite-outline',
  favoriteWorkList: 'material-symbols:star-outline',
  followingNewWorkList: 'material-symbols:bookmark-outline',
  recommendWorkList: 'material-symbols:recommend-outline',
  illustratorWorkList: 'material-symbols:school-outline',
  searchResultWorkList: 'material-symbols:search',
}
