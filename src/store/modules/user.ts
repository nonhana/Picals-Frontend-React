import { createSlice } from '@reduxjs/toolkit'
import type { UserInfo } from '@/utils/types'
import { LabelItem } from '@/apis/types'

const userStore = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      id: '',
      username: '',
      avatar: '',
      intro: '',
      email: '',
      fanNum: 0,
      followNum: 0,
    } as UserInfo,
    likedLabels: [] as LabelItem[],
    isLogin: false,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    setLikedLabels(state, action) {
      state.likedLabels = action.payload
    },
    addLikedLabel(state, action) {
      state.likedLabels.push(action.payload)
    },
    removeLikedLabel(state, action) {
      state.likedLabels = state.likedLabels.filter((item) => item.id !== action.payload)
    },
    increaseFollowNum(state) {
      state.userInfo.followNum++
    },
    decreaseFollowNum(state) {
      state.userInfo.followNum--
    },
    setLoginStatus(state, action) {
      state.isLogin = action.payload
    },
    logout(state) {
      state.userInfo = {
        id: '',
        username: '',
        avatar: '',
        intro: '',
        email: '',
        fanNum: 0,
        followNum: 0,
      }
      state.likedLabels = []
      state.isLogin = false
    },
  },
})

const {
  setUserInfo,
  setLikedLabels,
  addLikedLabel,
  removeLikedLabel,
  increaseFollowNum,
  decreaseFollowNum,
  setLoginStatus,
  logout,
} = userStore.actions

const userReducer = userStore.reducer

// 导出
export {
  setUserInfo,
  setLikedLabels,
  addLikedLabel,
  removeLikedLabel,
  increaseFollowNum,
  decreaseFollowNum,
  setLoginStatus,
  logout,
}
export default userReducer
