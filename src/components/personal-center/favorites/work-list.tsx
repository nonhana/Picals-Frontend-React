import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import type { WorkFavoriteItemInfo } from '@/utils/types'
import WorkFavoriteItem from '@/components/common/work-favorite-item'
import Pagination from '@/components/common/pagination'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Input, Button, Radio, RadioChangeEvent, message, Modal } from 'antd'

const { Search } = Input
const { confirm } = Modal

type WorkListProps = {
  workList: WorkFavoriteItemInfo[]
}

const WorkList: FC<WorkListProps> = ({ workList }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { favoriteList } = useSelector((state: AppState) => state.favorite)
  const { favoriteId } = useParams()

  /* ----------搜索相关---------- */
  const [keyword, setKeyword] = useState('')
  const onSearch = (value: string) => {
    console.log(value)
  }

  /* ----------分页相关---------- */
  const total = 100
  const pageSize = 12
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  /* ----------Modal相关---------- */
  //#region
  const [moveModalStatus, setMoveModalStatus] = useState(false)
  const [moveFolderId, setMoveFolderId] = useState<string>(favoriteId || '')
  const [copyModalStatus, setCopyModalStatus] = useState(false)
  const [copyFolderId, setCopyFolderId] = useState<string>(favoriteId || '')

  const cancelConfirm = () => {
    confirm({
      title: '确定要取消收藏该作品吗？',
      icon: <ExclamationCircleFilled />,
      content: '该操作无法撤销',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('cancel ' + choosedWorkList)
        messageApi.success('取消收藏成功')
      },
    })
  }

  const onChooseMoveFolder = (e: RadioChangeEvent) => {
    setMoveFolderId(e.target.value)
  }
  const moveConfirm = (folderId: string) => {
    console.log('move ' + choosedWorkList + ' to ' + folderId)
    setMoveModalStatus(false)
    messageApi.success('移动成功')
  }
  const cancelMove = () => {
    setMoveModalStatus(false)
    setMoveFolderId(favoriteId || '')
  }

  const onChooseCopyFolder = (e: RadioChangeEvent) => {
    setCopyFolderId(e.target.value)
  }
  const copyConfirm = (folderId: string) => {
    console.log('copy ' + choosedWorkList + ' to ' + folderId)
    setCopyModalStatus(false)
    messageApi.success('复制成功')
  }
  const cancelCopy = () => {
    setCopyModalStatus(false)
    setCopyFolderId(favoriteId || '')
  }
  //#endregion

  /* ----------作品编辑相关---------- */
  //#region
  const [settingStatus, setSettingStatus] = useState(false) // 是否处于批量编辑状态
  const [chooseStatusList, setChooseStatusList] = useState<boolean[]>([]) // 每个作品的选中状态
  const [choosedWorkList, setChoosedWorkList] = useState<string[]>([]) // 选中的作品id列表
  const [allChoosen, setAllChoosen] = useState(false) // 是否全选

  const like = (id: string) => {
    console.log(id)
  }
  // 选中作品，将对应的作品选中状态取反
  const choose = (id: string) => {
    setChooseStatusList((prev) =>
      prev.map((item, index) =>
        index === workList.findIndex((item) => item.id === id) ? !item : item,
      ),
    )
  }
  // 全选或取消全选
  const chooseAllWorks = (e: RadioChangeEvent) => {
    setAllChoosen(e.target.value)
    setChooseStatusList(new Array(workList.length).fill(e.target.value))
  }
  // 单个作品取消收藏
  const cancelSingleWork = (id: string) => {
    setChoosedWorkList([id])
    cancelConfirm()
  }
  // 单个作品移动
  const moveSingleWork = (id: string) => {
    setChoosedWorkList([id])
    setMoveModalStatus(true)
  }
  // 单个作品复制
  const copySingleWork = (id: string) => {
    setChoosedWorkList([id])
    setCopyModalStatus(true)
  }

  useEffect(() => {
    if (settingStatus) return
    setChooseStatusList(new Array(workList.length).fill(false))
    setAllChoosen(false)
    setChoosedWorkList([])
  }, [settingStatus])

  useEffect(() => {
    setChoosedWorkList(
      workList.reduce((acc, item, index) => {
        if (chooseStatusList[index]) {
          acc.push(item.id)
        }
        return acc
      }, [] as string[]),
    )
  }, [chooseStatusList])
  //#endregion

  return (
    <>
      {contextHolder}
      <div className='relative w-954px flex flex-col items-center'>
        {settingStatus && (
          <div className='w-100% h-16 px-5 flex items-center border-1px border-b-solid border-color-#858585'>
            <Button type='default' onClick={() => setSettingStatus(!settingStatus)}>
              取消批量编辑
            </Button>
          </div>
        )}
        {settingStatus ? (
          <div className='w-100% h-16 px-5 flex justify-between items-center border-1px border-b-solid border-color-#858585'>
            <div className='flex gap-10px items-center'>
              <Radio.Group value={allChoosen} onChange={chooseAllWorks}>
                <Radio value={true}>全选</Radio>
                <Radio value={false}>取消全选</Radio>
              </Radio.Group>
              <Button disabled={choosedWorkList.length === 0} type='link' onClick={cancelConfirm}>
                取消收藏
              </Button>
              <Button
                disabled={choosedWorkList.length === 0}
                type='link'
                onClick={() => setMoveModalStatus(true)}>
                移动到
              </Button>
              <Button
                disabled={choosedWorkList.length === 0}
                type='link'
                onClick={() => setCopyModalStatus(true)}>
                复制到
              </Button>
            </div>
            <span className='font-size-14px color-#6d757a'>
              已选择{chooseStatusList.filter((item) => item).length}个作品
            </span>
          </div>
        ) : (
          <div className='w-100% h-16 px-5 flex justify-end border-1px border-b-solid border-color-#858585'>
            <div className='flex gap-5 items-center'>
              <Button type='link' onClick={() => setSettingStatus(!settingStatus)}>
                批量操作
              </Button>
              <Search
                value={keyword}
                placeholder='输入作品名称'
                onChange={(e) => setKeyword(e.target.value)}
                onSearch={onSearch}
              />
            </div>
          </div>
        )}

        <div className='mt-5 w-826px flex flex-wrap gap-30px'>
          {workList.map((item, index) => (
            <WorkFavoriteItem
              key={item.id}
              itemInfo={item}
              settingStatus={settingStatus}
              chooseStatus={chooseStatusList[index]}
              choose={choose}
              like={like}
              cancel={cancelSingleWork}
              move={moveSingleWork}
              copy={copySingleWork}
            />
          ))}
        </div>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={onPageChange}
        />
      </div>

      <Modal
        title='移动作品'
        width='420px'
        open={moveModalStatus}
        okText='移动'
        cancelText='取消'
        onOk={() => moveConfirm(moveFolderId)}
        onCancel={cancelMove}>
        <div className='h-110 overflow-y-scroll'>
          <Radio.Group className='w-full' onChange={onChooseMoveFolder} value={moveFolderId}>
            {favoriteList.map((item) => (
              <Radio
                disabled={item.id === favoriteId}
                key={item.id}
                value={item.id}
                className='w-full h-15 px-5 flex justify-between items-center'>
                <div className='w-70 flex justify-between'>
                  <span>{item.name}</span>
                  <span>作品数：{item.workNum}</span>
                </div>
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </Modal>

      <Modal
        title='复制作品'
        width='420px'
        open={copyModalStatus}
        okText='复制'
        cancelText='取消'
        onOk={() => copyConfirm(copyFolderId)}
        onCancel={cancelCopy}>
        <div className='h-110 overflow-y-scroll'>
          <Radio.Group className='w-full' onChange={onChooseCopyFolder} value={copyFolderId}>
            {favoriteList.map((item) => (
              <Radio
                disabled={item.id === favoriteId}
                key={item.id}
                value={item.id}
                className='w-full h-15 px-5 flex justify-between items-center'>
                <div className='w-70 flex justify-between'>
                  <span>{item.name}</span>
                  <span>作品数：{item.workNum}</span>
                </div>
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </Modal>
    </>
  )
}

export default WorkList
