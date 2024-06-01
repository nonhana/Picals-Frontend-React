import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImgUpload from '@/components/upload/img-upload'
import UploadForm from '@/components/upload/form'
import UploadSuccess from '@/components/upload/success'
import type { UploadFile } from 'antd'
import { Button } from 'antd'
import type { UploadWorkFormInfo, UploadWorkInfo } from '@/utils/types'
import { uploadWorkAPI } from '@/apis'

const Upload: FC = () => {
  const navigate = useNavigate()
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
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)
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
      imgList: imgList.map((file) => (file.response ? file.response.data : file.url)),
    })
  }, [formInfo, imgList])

  const uploadWork = async () => {
    try {
      await uploadWorkAPI({
        ...workInfo.basicInfo,
        labels: workInfo.labels,
        imgList: workInfo.imgList,
      })
      setUploadSuccess(true)
    } catch (error) {
      console.error('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    if (!formInfoCheck) return
    console.log('表单验证成功', workInfo)
    uploadWork()
  }, [formInfoCheck])

  return (
    <div className='relative w-100% min-h-screen bg-#f5f5f5 flex flex-col items-center gap-5 py-5'>
      {uploadSuccess ? (
        <UploadSuccess workName={workInfo.basicInfo.name} />
      ) : (
        <>
          <ImgUpload imgList={imgList} setImgList={setImgList} />
          <UploadForm
            formInfo={formInfo}
            setFormInfo={setFormInfo}
            submitTrigger={submitTrigger}
            setFormInfoCheck={setFormInfoCheck}
          />
          <div className='flex gap-5'>
            <Button
              className='w-50'
              shape='round'
              size='large'
              type='default'
              onClick={() => navigate('/home')}>
              取消投稿
            </Button>
            <Button
              className='w-50'
              shape='round'
              size='large'
              type='primary'
              onClick={() => setSubmitTrigger(!submitTrigger)}>
              投稿作品
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Upload
