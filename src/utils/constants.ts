// src/utils/constants.ts
// 用以存放项目中的常量

// 下拉框中的选项列表
type DropdownItem = {
  route: string
  name: string
}
export const HEADER_DROPDOWN_LIST: DropdownItem[] = [
  {
    route: '/1',
    name: '我的数据',
  },
  {
    route: '/2',
    name: '我发布的作品',
  },
  {
    route: '/3',
    name: '我的喜欢',
  },
  {
    route: '/4',
    name: '我的收藏',
  },
  {
    route: '/5',
    name: '浏览记录',
  },
  {
    route: '/6',
    name: '个人资料设置',
  },
]

// Header的菜单路由跳转
type HeaderMenuItem = {
  icon: string
} & DropdownItem
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
