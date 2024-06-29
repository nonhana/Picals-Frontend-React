import { FC, useEffect, useState, useMemo, useRef } from 'react'
import type { UploadWorkFormInfo } from '@/utils/types'
import { Form, FormProps, Input, Radio, Select, message, Spin, Button, Flex } from 'antd'
import type { SelectProps } from 'antd'
import {
  searchIllustratorsAPI,
  getIllustratorDetailAPI,
  getIllustratorListInPagesAPI,
  searchLabelsAPI,
  getLabelsInPagesAPI,
  newIllustratorAPI,
} from '@/apis'
import type { INewIllustratorReq } from '@/apis/illustrator/types'
import Empty from '@/components/common/empty'
import { debounce } from 'lodash'
import CreateIllustratorModal from '@/components/common/create-illustrator-modal'

type SelectableItemInfo = {
  value: string
  label: string
}

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>
  debounceTimeout?: number
}

const DebounceSelect = <ValueType extends SelectableItemInfo>({
  fetchOptions,
  debounceTimeout = 500,
  ...props
}: DebounceSelectProps<ValueType>) => {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<ValueType[]>([])
  const [current, setCurrent] = useState(1)
  const [isFinal, setIsFinal] = useState(false)
  const pageSize = 20
  const fetchRef = useRef(0)

  const getIllustratorList = async () => {
    try {
      const { data } = await getIllustratorListInPagesAPI({ current, pageSize })
      if (data.length < pageSize) setIsFinal(true)
      const result = data.map((item) => ({ value: item.id, label: item.name }))
      setOptions(options.concat(result as ValueType[]))
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    if (isFinal) return
    getIllustratorList()
  }, [current, isFinal])

  const onPopupScroll = (e: any) => {
    e.persist()
    const { scrollTop, offsetHeight, scrollHeight } = e.target
    if (scrollTop + offsetHeight > scrollHeight - 10) {
      setCurrent((prev) => prev + 1)
    }
  }

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      if (value === '') {
        setCurrent(1)
        return
      }

      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) return
        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  const initialIllustratorList = () => {
    setOptions([])
    setCurrent(1)
    setIsFinal(false)
  }

  return (
    <Select
      filterOption={false}
      onSearch={debounceFetcher}
      onPopupScroll={onPopupScroll}
      notFoundContent={fetching ? <Spin size='small' /> : <Empty showImg={false} />}
      onDropdownVisibleChange={(open) => {
        if (!open) initialIllustratorList()
      }}
      {...props}
      options={options}
    />
  )
}

type UploadFormProps = {
  formInfo: UploadWorkFormInfo
  setFormInfo: React.Dispatch<React.SetStateAction<UploadWorkFormInfo>>
  submitTrigger: number
  uploadWork: () => void
}

const wrapperStyle = 'relative bg-#fff w-155 p-5 rd-6 mb-5'
const titleStyle = 'font-size-20px font-bold color-#6d757a mb-5'
const labelStyle = 'font-size-16px font-bold color-#3d3d3d'

const { TextArea } = Input

const Label: FC<{ text: string }> = ({ text }) => {
  return (
    <div className={labelStyle}>
      <span>{text}</span>
    </div>
  )
}

const UploadForm: FC<UploadFormProps> = ({ formInfo, setFormInfo, submitTrigger, uploadWork }) => {
  /* ----------表单本身逻辑相关---------- */
  const [messageApi, contextHolder] = message.useMessage()
  const [workForm] = Form.useForm()

  const submitWork: FormProps<UploadWorkFormInfo>['onFinish'] = () => uploadWork()

  const handleFailed: FormProps<UploadWorkFormInfo>['onFinishFailed'] = () => {
    messageApi.error('检查一下表单是否填写完整！')
  }

  const changeReprinted = (value: number) => {
    setFormInfo((prevFormInfo) => ({
      ...prevFormInfo,
      basicInfo: {
        ...prevFormInfo.basicInfo,
        reprintType: value,
      },
    }))
    if (value) {
      setFormInfo((prevFormInfo) => ({
        ...prevFormInfo,
        illustratorInfo: {
          name: '',
          homeUrl: '',
        },
      }))
    } else {
      setFormInfo((prevFormInfo) => {
        const { illustratorInfo: _, ...rest } = prevFormInfo
        return rest
      })
    }
  }

  useEffect(() => {
    if (submitTrigger === 0) return
    workForm.submit()
  }, [submitTrigger])

  /* ----------标签选择相关---------- */
  const [labels, setLabels] = useState<SelectableItemInfo[]>([])
  const [current, setCurrent] = useState(1)
  const [isFinal, setIsFinal] = useState(false)
  const pageSize = 20

  const getLabels = async () => {
    try {
      const { data } = await getLabelsInPagesAPI({ current, pageSize })
      if (data.length < pageSize) setIsFinal(true)
      const result = data.map((item) => ({ value: item.name, label: item.name }))
      setLabels(labels.concat(result))
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    if (isFinal) return
    getLabels()
  }, [current, isFinal])

  const onPopupScroll = (e: any) => {
    e.persist()
    const { scrollTop, offsetHeight, scrollHeight } = e.target
    if (scrollTop + offsetHeight > scrollHeight - 10) {
      setCurrent((prev) => prev + 1)
    }
  }

  let timeout: ReturnType<typeof setTimeout> | null
  let currentValue: string

  const searchLabels = async (value: string) => {
    fetchLabels(value, setLabels)
  }

  const fetchLabels = (value: string, callback: (data: SelectableItemInfo[]) => void) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    currentValue = value

    const fake = () => {
      searchLabelsAPI({ keyword: value }).then((result) => {
        if (currentValue === value) {
          const data = result.data.map((item) => ({
            value: item.name,
            label: item.name,
          }))
          callback(data)
        }
      })
    }
    if (value) {
      timeout = setTimeout(fake, 300)
    } else {
      setCurrent(1)
    }
  }

  const initialLabelList = () => {
    setLabels([])
    setCurrent(1)
    setIsFinal(false)
  }

  /* ----------插画家选择相关---------- */
  const fetchIllustratorList = async (keyword: string): Promise<SelectableItemInfo[]> => {
    try {
      const { data } = await searchIllustratorsAPI({ keyword })
      const result = data.map((item) => ({ value: item.id, label: item.name }))
      return result
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return []
    }
  }

  const selectIllustrator = async (value: any) => {
    const { data } = await getIllustratorDetailAPI({ id: value })
    setFormInfo((prevFormInfo) => ({
      ...prevFormInfo,
      illustratorInfo: {
        name: data.name,
        homeUrl: data.homeUrl,
      },
    }))
    workForm.setFieldsValue({ illustratorInfo: { name: data.name, homeUrl: data.homeUrl } })
  }

  /* ----------新增插画家相关---------- */
  const [modalStatus, setModalStatus] = useState(false)
  const [newIllustratorInfo, setNewIllustratorInfo] = useState<INewIllustratorReq>({
    name: '',
    homeUrl: '',
  })
  const [homeUrlPrefix, setHomeUrlPrefix] = useState('https://www.pixiv.net/users/')
  const [illustratorId, setIllustratorId] = useState('')

  useEffect(() => {
    setNewIllustratorInfo({
      ...newIllustratorInfo,
      homeUrl: homeUrlPrefix + illustratorId,
    })
  }, [homeUrlPrefix, illustratorId])

  const confirmAction = async () => {
    try {
      if (illustratorId === '') {
        messageApi.error('请填写插画家ID！')
        return
      }
      await newIllustratorAPI(newIllustratorInfo)
      setModalStatus(false)
      messageApi.success('新建插画家成功，现在可以通过搜索框选择啦！')
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }

  useEffect(() => {
    if (!modalStatus) {
      setNewIllustratorInfo({ name: '', homeUrl: '' })
      setHomeUrlPrefix('https://www.pixiv.net/users/')
      setIllustratorId('')
    }
  }, [modalStatus])

  return (
    <>
      {contextHolder}
      <Form
        name='workForm'
        form={workForm}
        size='large'
        labelAlign='left'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={formInfo}
        onFinish={submitWork}
        onFinishFailed={handleFailed}
        autoComplete='off'>
        <div className={wrapperStyle}>
          <div className={titleStyle}>
            <span>基本信息填写</span>
          </div>

          <Form.Item<UploadWorkFormInfo>
            label={<Label text='作品名称' />}
            name={['basicInfo', 'name']}
            rules={[{ required: true, message: '请输入作品名称哦~' }]}>
            <Input
              placeholder='请输入作品名称'
              showCount
              maxLength={64}
              value={formInfo.basicInfo.name}
              onChange={(e) =>
                setFormInfo({
                  ...formInfo,
                  basicInfo: { ...formInfo.basicInfo, name: e.target.value },
                })
              }
            />
          </Form.Item>

          <Form.Item<UploadWorkFormInfo>
            label={<Label text='作品简介' />}
            name={['basicInfo', 'intro']}
            rules={[{ required: true, message: '请输入作品简介' }]}>
            <TextArea
              placeholder='请输入简介~不超过1024个字哦！'
              showCount
              maxLength={1024}
              autoSize={{ minRows: 4, maxRows: 8 }}
              value={formInfo.basicInfo.intro}
              onChange={(e) =>
                setFormInfo({
                  ...formInfo,
                  basicInfo: { ...formInfo.basicInfo, intro: e.target.value },
                })
              }
            />
          </Form.Item>

          <Form.Item<UploadWorkFormInfo>
            label={<Label text='是否转载' />}
            name={['basicInfo', 'reprintType']}
            rules={[{ required: true, message: '请选择是否转载作品！' }]}>
            <Radio.Group
              value={formInfo.basicInfo.reprintType}
              onChange={(event) => changeReprinted(event.target.value)}>
              <Radio value={2}>合集作品</Radio>
              <Radio value={1}>转载作品</Radio>
              <Radio value={0}>原创作品</Radio>
            </Radio.Group>
          </Form.Item>

          {formInfo.basicInfo.reprintType !== 0 && (
            <>
              {formInfo.basicInfo.reprintType === 1 && (
                <Form.Item<UploadWorkFormInfo>
                  label={<Label text='作品URL' />}
                  name={['basicInfo', 'workUrl']}
                  rules={[
                    { required: true, message: '请输入收藏作品的源地址！' },
                    { type: 'url', message: '请输入正确的URL地址！' },
                  ]}>
                  <Input
                    placeholder='请输入收藏作品的源地址'
                    value={formInfo.basicInfo.workUrl}
                    onChange={(e) =>
                      setFormInfo({
                        ...formInfo,
                        basicInfo: { ...formInfo.basicInfo, workUrl: e.target.value },
                      })
                    }
                  />
                </Form.Item>
              )}

              <Form.Item<UploadWorkFormInfo>
                label={<Label text='原作者名' />}
                name={['illustratorInfo', 'name']}
                rules={[{ required: true, message: '请输入原作者的名称！' }]}>
                <Flex gap={20}>
                  <DebounceSelect
                    showSearch
                    value={formInfo.illustratorInfo?.name}
                    placeholder='输入插画家的名字进行搜索~'
                    fetchOptions={fetchIllustratorList}
                    onChange={selectIllustrator}
                  />
                  <Button type='primary' onClick={() => setModalStatus(true)}>
                    新增插画家
                  </Button>
                </Flex>
              </Form.Item>

              <Form.Item<UploadWorkFormInfo>
                label={<Label text='作者主页' />}
                name={['illustratorInfo', 'homeUrl']}
                rules={[
                  { required: true, message: '请输入原作者的主页url地址！' },
                  { type: 'url', message: '请输入正确的URL地址！' },
                ]}>
                <Input
                  placeholder='原作者主页，如Pixiv作者的主页'
                  value={formInfo.illustratorInfo?.homeUrl}
                  disabled
                  onChange={(e) =>
                    setFormInfo({
                      ...formInfo,
                      illustratorInfo: { ...formInfo.illustratorInfo!, homeUrl: e.target.value },
                    })
                  }
                />
              </Form.Item>
            </>
          )}
        </div>

        <div className={wrapperStyle}>
          <div className={titleStyle}>
            <span>作品标签添加</span>
          </div>
          <Form.Item<UploadWorkFormInfo>
            label={<Label text='作品标签' />}
            name='labels'
            rules={[{ required: true, message: '作品标签是必须要选的！' }]}>
            <Select
              mode='tags'
              style={{ width: '100%' }}
              placeholder='选择不超过10个标签，或者自己输入'
              maxCount={10}
              onSearch={searchLabels}
              onChange={(value) => {
                setFormInfo((prevFormInfo) => ({
                  ...prevFormInfo,
                  labels: value,
                }))
              }}
              onDropdownVisibleChange={(open) => {
                if (!open) initialLabelList()
              }}
              options={labels}
              onPopupScroll={onPopupScroll}
              notFoundContent={<Empty showImg={false} />}
            />
          </Form.Item>
        </div>

        <div className={wrapperStyle}>
          <div className={titleStyle}>
            <span>其他信息</span>
          </div>
          <Form.Item<UploadWorkFormInfo>
            label={<Label text='开启评论' />}
            name={['basicInfo', 'openComment']}
            rules={[{ required: true, message: '请选择是否开启评论！' }]}>
            <Radio.Group
              value={formInfo.basicInfo.openComment}
              onChange={(e) =>
                setFormInfo({
                  ...formInfo,
                  basicInfo: { ...formInfo.basicInfo, openComment: e.target.value },
                })
              }>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<UploadWorkFormInfo>
            label={<Label text='AI生成作品' />}
            name={['basicInfo', 'isAIGenerated']}
            rules={[{ required: true, message: '请选择是否为AI生成作品！' }]}>
            <Radio.Group
              value={formInfo.basicInfo.isAIGenerated}
              onChange={(e) =>
                setFormInfo({
                  ...formInfo,
                  basicInfo: { ...formInfo.basicInfo, isAIGenerated: e.target.value },
                })
              }>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className={wrapperStyle}>
          <div className={titleStyle}>
            <span>其他须知</span>
          </div>
          <div className='flex flex-col gap-10px font-size-14px font-bold color-#3d3d3d line-height-normal'>
            <span>
              这个小站只是因纯粹的热爱而搭建，大家所上传的图片全部都会在后台管理系统进行审核，通过后会在本站进行展示。
            </span>
            <span>包含以下要素的作品将不予上传：</span>
            <ul className='flex flex-col m-0 pl-5 gap-10px'>
              <li>
                <span>现实世界的照片（这是二次元，二次元，二次元）；</span>
              </li>
              <li>
                <span>转载时，原作者明确要求不能转载的；</span>
              </li>
              <li>
                <span>
                  他人制作的作品，发售中的商品图像，第三者持有权利的图像，游戏、视频作品的截图，包含屏幕截图图像的作品。
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Form>

      <CreateIllustratorModal
        modalStatus={modalStatus}
        confirmAction={confirmAction}
        cancelAction={() => setModalStatus(false)}
        formInfo={newIllustratorInfo}
        setFormInfo={setNewIllustratorInfo}
        homeUrlPrefix={homeUrlPrefix}
        setHomeUrlPrefix={setHomeUrlPrefix}
        illustratorId={illustratorId}
        setIllustratorId={setIllustratorId}
      />
    </>
  )
}

export default UploadForm
