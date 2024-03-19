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
