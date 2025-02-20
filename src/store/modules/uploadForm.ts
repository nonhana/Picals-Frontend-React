import type { UploadWorkFormInfo } from '@/utils/types'
import { createSlice } from '@reduxjs/toolkit'

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
    uploadSuccess: false,
  },
  reducers: {
    saveImgList(state, action) {
      state.imgList = action.payload
    },
    saveFormInfo(state, action) {
      state.formInfo = action.payload
    },
    saveUploadSuccess(state, action) {
      state.uploadSuccess = action.payload
    },
  },
})

const { saveImgList, saveFormInfo, saveUploadSuccess } = uploadFormStore.actions

const uploadFormReducer = uploadFormStore.reducer

// 导出
export { saveFormInfo, saveImgList, saveUploadSuccess }
export default uploadFormReducer
