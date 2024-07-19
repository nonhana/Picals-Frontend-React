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
export { saveImgList, saveFormInfo, saveUploadSuccess }
export default uploadFormReducer
