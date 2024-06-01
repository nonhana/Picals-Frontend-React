import { createSlice } from '@reduxjs/toolkit'
import type { UserInfo } from '@/utils/types'

const userStore = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      id: '',
      username: '',
      avatar: '',
      email: '',
      fanNum: 0,
      followNum: 0,
    } as UserInfo,
    isLogin: false,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    setLoginStatus(state, action) {
      state.isLogin = action.payload
    },
  },
})

// 解构出increment和decrement方法
const { setUserInfo, setLoginStatus } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 导出
export { setUserInfo, setLoginStatus }
export default userReducer
