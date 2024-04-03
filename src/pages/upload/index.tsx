import { FC, useEffect, useState } from 'react'
import ImgUpload from '@/components/upload/img-upload'
import UploadForm from '@/components/upload/form'
import type { UploadFile } from 'antd'
import { Button } from 'antd'
import type { UploadWorkFormInfo, UploadWorkInfo } from '@/utils/types'

const Upload: FC = () => {
  const [imgList, setImgList] = useState<UploadFile[]>([])
  const [formInfo, setFormInfo] = useState<UploadWorkFormInfo>({
    basicInfo: {
      name: '',
      intro: '',
      isReprinted: false,
      openComment: false,
      isAIGenerated: false,
    },
    labels: [],
  })
  const [formInfoCheck, setFormInfoCheck] = useState<boolean>(false)
  const [workInfo, setWorkInfo] = useState<UploadWorkInfo>({
    basicInfo: {
      name: '',
      intro: '',
      isReprinted: false,
      openComment: false,
      isAIGenerated: false,
    },
    labels: [],
    imgList: [],
  })
  const [submitTrigger, setSubmitTrigger] = useState(false)

  useEffect(() => {
    setWorkInfo({
      ...workInfo,
      basicInfo: formInfo.basicInfo,
      labels: formInfo.labels,
      originInfo: formInfo.originInfo,
      imgList: imgList.map((file) => (file.response ? file.response.data.url : file.url)),
    })
  }, [formInfo, imgList])

  useEffect(() => {
    if (!formInfoCheck) return
    console.log('表单验证成功')
  }, [formInfoCheck])

  return (
    <div className='relative w-100% bg-#f5f5f5 flex flex-col items-center gap-5'>
      <ImgUpload imgList={imgList} setImgList={setImgList} />
      <UploadForm
        formInfo={formInfo}
        setFormInfo={setFormInfo}
        submitTrigger={submitTrigger}
        setFormInfoCheck={setFormInfoCheck}
      />
      <Button
        shape='round'
        size='large'
        type='primary'
        onClick={() => setSubmitTrigger(!submitTrigger)}>
        投稿作品
      </Button>
    </div>
  )
}

export default Upload
