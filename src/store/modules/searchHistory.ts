import { createSlice } from '@reduxjs/toolkit'

const searchHistoryStore = createSlice({
  name: 'searchHistory',
  initialState: {
    historyList: [] as string[],
  },
  reducers: {
    // 向历史搜索记录中添加一条记录。如果已存在，提取至最前
    addRecord(state, action) {
      const { payload } = action
      const index = state.historyList.indexOf(payload)
      if (index !== -1) {
        state.historyList.splice(index, 1)
      }
      state.historyList.unshift(payload)
    },
    // 清空历史搜索记录
    clear(state) {
      state.historyList = []
    },
  },
})

const { addRecord, clear } = searchHistoryStore.actions

const searchHistoryReducer = searchHistoryStore.reducer

// 导出
export { addRecord, clear }
export default searchHistoryReducer
