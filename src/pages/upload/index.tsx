import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ImgUpload from '@/components/upload/img-upload'
import UploadForm from '@/components/upload/form'
import UploadSuccess from '@/components/upload/success'
import { Button, notification } from 'antd'
import type { UploadWorkFormInfo } from '@/utils/types'
import { uploadWorkAPI, editWorkAPI, getWorkDetailAPI } from '@/apis'
import Empty from '@/components/common/empty'

const Upload: FC = () => {
  const { id: localUserId } = useSelector((state: AppState) => state.user.userInfo)

  const navigate = useNavigate()
  const workStatus = useSearchParams()[0].get('type')
  const workId = useSearchParams()[0].get('workId')
  const editMode = workStatus && workId && workStatus === 'edit'

  const [imgList, setImgList] = useState<string[]>([])
  const [formInfo, setFormInfo] = useState<UploadWorkFormInfo>({
    basicInfo: {
      name: '',
      intro: '',
      reprintType: 1,
      openComment: false,
      isAIGenerated: false,
    },
    labels: [],
  })

  const [showEditForm, setShowEditForm] = useState<boolean>(false)

  useEffect(() => {
    if (editMode) {
      const fetchWorkDetail = async () => {
        try {
          const { data } = await getWorkDetailAPI({ id: workId! })

          if (!data) {
            notification.error({
              message: '作品不存在！',
              description: '请检查作品 ID 是否正确，不要随便输入 ID 哦！',
            })
            return
          }
          if (data.authorId !== localUserId) {
            notification.error({
              message: '无权编辑！',
              description: '只能编辑自己的作品哦！',
            })
            return
          }

          const originWorkInfo: UploadWorkFormInfo = {
            basicInfo: {
              name: data.name,
              intro: data.intro,
              reprintType: data.reprintType,
              openComment: data.openComment,
              isAIGenerated: data.isAIGenerated,
            },
            labels: data.labels.map((label) => label.name),
          }
          if (data.reprintType !== 0) {
            originWorkInfo.illustratorInfo = {
              name: data.illustrator!.name,
              homeUrl: data.illustrator!.homeUrl,
            }
          }
          if (data.reprintType === 1) originWorkInfo.basicInfo.workUrl = data.workUrl
          setImgList(data.imgList)
          setFormInfo(originWorkInfo)
        } catch (error) {
          console.log('出现错误了喵！！', error)
          return
        }
      }
      fetchWorkDetail()
    }
  }, [editMode])

  useEffect(() => {
    if (editMode && formInfo.basicInfo.name) setShowEditForm(true)
  }, [workStatus, formInfo.basicInfo.name])

  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)
  const [submitTrigger, setSubmitTrigger] = useState(0)
  const [uploading, setUploading] = useState(false)

  const uploadWork = async () => {
    try {
      setUploading(true)
      const uploadWorkInfo = {
        ...formInfo.basicInfo,
        labels: formInfo.labels,
        imgList,
        illustratorInfo: formInfo.illustratorInfo,
      }
      if (workStatus && workId && workStatus === 'edit') {
        await editWorkAPI({ id: workId!, ...uploadWorkInfo })
      } else {
        await uploadWorkAPI(uploadWorkInfo)
      }
      setUploadSuccess(true)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='relative w-100% min-h-screen bg-#f5f5f5 flex flex-col items-center gap-5 py-5'>
      {uploadSuccess ? (
        <UploadSuccess workName={formInfo.basicInfo.name} />
      ) : (
        <>
          <ImgUpload imgList={imgList} setImgList={setImgList} />
          {showEditForm || !editMode ? (
            <UploadForm
              formInfo={formInfo}
              setFormInfo={setFormInfo}
              submitTrigger={submitTrigger}
              uploadWork={uploadWork}
            />
          ) : (
            <div className='relative h-100'>
              <Empty text='看到这个，你肯定是做了一些不好的事情，对吗？' />
            </div>
          )}
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
              loading={uploading}
              onClick={() => setSubmitTrigger((prev) => prev + 1)}>
              投稿作品
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Upload
