import { createSlice } from '@reduxjs/toolkit'
import type { UploadWorkFormInfo } from '@/utils/types'

const uploadFormStore = createSlice({
  name: 'uploadForm',
  initialState: {
    imgList: [] as string[],
    formInfo: {
      basicInfo: {
        name: '',
        intro: '',
        reprintType: 1,
        openComment: true,
        isAIGenerated: false,
      },
      labels: [],
    } as UploadWorkFormInfo,
  },
  reducers: {
    saveImgList(state, action) {
      state.imgList = action.payload
    },
    saveFormInfo(state, action) {
      state.formInfo = action.payload
    },
    reset(state) {
      state.imgList = []
      state.formInfo = {
        basicInfo: {
          name: '',
          intro: '',
          reprintType: 1,
          openComment: true,
          isAIGenerated: false,
        },
        labels: [],
      }
    },
  },
})

const { saveImgList, saveFormInfo, reset } = uploadFormStore.actions

const uploadFormReducer = uploadFormStore.reducer

// 导出
export { saveImgList, saveFormInfo, reset }
export default uploadFormReducer
