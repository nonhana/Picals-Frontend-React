import { createSlice } from '@reduxjs/toolkit'

const userStore = createSlice({
  name: 'user',
  initialState: {
    count: 1,
  },
  reducers: {
    setUserInfo(state, action) {
      state.count = action.payload
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
