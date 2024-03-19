import { createSlice } from '@reduxjs/toolkit'
import type { UserInfo } from '@/utils/types'

const userStore = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      id: '1',
      username: 'picals',
      avatar: 'https://dummyimage.com/400X400',
      email: '1209220829@qq.com',
      fanNum: 100,
      followNum: 100,
    } as UserInfo,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
  },
})

// 解构出increment和decrement方法
const { setUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 导出
export { setUserInfo }
export default userReducer
