import { createSlice } from '@reduxjs/toolkit'

export type WorkListType =
  | 'userWorkList'
  | 'likeWorkList'
  | 'favoriteWorkList'
  | 'followingNewWorkList'
  | 'recommendWorkList'
  | 'illustratorWorkList'
  | 'searchResultWorkList'

const viewListStore = createSlice({
  name: 'viewList',
  initialState: {
    prevPosition: '',
    workDetailUserId: '',
    userWorkList: <string[]>[],
    likeWorkList: <string[]>[],
    favoriteWorkList: <string[]>[],
    followingNewWorkList: <string[]>[],
    recommendWorkList: <string[]>[],
    illustratorWorkList: <string[]>[],
    searchResultWorkList: <string[]>[],
    currentList: 'userWorkList' as WorkListType,
    currentIndex: 1,
  },
  reducers: {
    setPrevPosition(state, action) {
      state.prevPosition = action.payload
    },
    setWorkDetailUserId(state, action) {
      state.workDetailUserId = action.payload
    },
    pushToUserWorkList(state, action) {
      state.userWorkList = state.userWorkList.concat(action.payload)
    },
    pushToLikeWorkList(state, action) {
      state.likeWorkList = state.likeWorkList.concat(action.payload)
    },
    pushToFavoriteWorkList(state, action) {
      state.favoriteWorkList = state.favoriteWorkList.concat(action.payload)
    },
    pushToFollowingNewWorkList(state, action) {
      state.followingNewWorkList = state.followingNewWorkList.concat(action.payload)
    },
    pushToRecommendWorkList(state, action) {
      state.recommendWorkList = state.recommendWorkList.concat(action.payload)
    },
    pushToIllustratorWorkList(state, action) {
      state.illustratorWorkList = state.illustratorWorkList.concat(action.payload)
    },
    pushToSearchResultWorkList(state, action) {
      state.searchResultWorkList = state.searchResultWorkList.concat(action.payload)
    },
    setCurrentList(state, action) {
      state.currentList = action.payload as WorkListType
    },
    setCurrentIndex(state, action) {
      state.currentIndex = action.payload
    },
    reset(state) {
      state.prevPosition = ''
      state.workDetailUserId = ''
      state.userWorkList = []
      state.likeWorkList = []
      state.favoriteWorkList = []
      state.followingNewWorkList = []
      state.recommendWorkList = []
      state.illustratorWorkList = []
      state.searchResultWorkList = []
      state.currentList = 'userWorkList'
      state.currentIndex = 1
    },
    resetUserList(state) {
      state.workDetailUserId = ''
      state.userWorkList = []
    },
    resetOtherList(state) {
      state.prevPosition = ''
      state.likeWorkList = []
      state.favoriteWorkList = []
      state.followingNewWorkList = []
      state.recommendWorkList = []
      state.illustratorWorkList = []
      state.searchResultWorkList = []
    },
  },
})

const {
  setPrevPosition,
  setWorkDetailUserId,
  pushToUserWorkList,
  pushToLikeWorkList,
  pushToFavoriteWorkList,
  pushToFollowingNewWorkList,
  pushToRecommendWorkList,
  pushToIllustratorWorkList,
  pushToSearchResultWorkList,
  setCurrentList,
  setCurrentIndex,
  reset,
  resetUserList,
  resetOtherList,
} = viewListStore.actions

const viewListReducer = viewListStore.reducer

export {
  setPrevPosition,
  setWorkDetailUserId,
  pushToUserWorkList,
  pushToLikeWorkList,
  pushToFavoriteWorkList,
  pushToFollowingNewWorkList,
  pushToRecommendWorkList,
  pushToIllustratorWorkList,
  pushToSearchResultWorkList,
  setCurrentList,
  setCurrentIndex,
  reset,
  resetUserList,
  resetOtherList,
}
export default viewListReducer
