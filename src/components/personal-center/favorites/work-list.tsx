import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import type { WorkNormalItemInfo } from '@/utils/types'
import WorkFavoriteItem from '@/components/common/work-favorite-item'
import Pagination from '@/components/common/pagination'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Input, Button, Radio, RadioChangeEvent, message, Modal } from 'antd'
import Empty from '@/components/common/empty'
import { favoriteActionsAPI, moveFavoriteWorksAPI, copyFavoriteWorksAPI } from '@/apis'

const { Search } = Input
const { confirm } = Modal

type WorkListProps = {
  total: number
  workList: WorkNormalItemInfo[]
  current: number
  setCurrent: (current: number) => void
  handleSearch: (keyword: string) => void
  searchStatus: boolean
  setSearchStatus: (status: boolean) => void
  refresh: () => Promise<void> // 刷新作品列表
  like: (id: string) => void
}

const WorkList: FC<WorkListProps> = ({
  total,
  workList,
  current,
  setCurrent,
  handleSearch,
  searchStatus,
  setSearchStatus,
  refresh,
  like,
}) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { favoriteList } = useSelector((state: AppState) => state.favorite)
  const searchParams = useSearchParams()[0]
  const folderId = searchParams.get('folderId')

  const [keyword, setKeyword] = useState('')

  const onSearch = () => {
    if (keyword === '') {
      setSearchStatus(false)
      return
    }
    setSearchStatus(true)
    handleSearch(keyword)
  }

  const handleCancelSearch = () => {
    setKeyword('')
    setSearchStatus(false)
  }

  const onPageChange = (page: number) => setCurrent(page)

  /* ----------作品编辑相关---------- */
  //#region
  const [settingStatus, setSettingStatus] = useState(false) // 是否处于批量编辑状态
  const [chooseStatusList, setChooseStatusList] = useState<boolean[]>([]) // 每个作品的选中状态
  const [chosenWorkList, setChosenWorkList] = useState<string[]>([]) // 选中的作品id列表
  const [allChosen, setAllChosen] = useState(false) // 是否全选

  // 重置编辑状态
  const resetSettingStatus = () => {
    setSettingStatus(false)
    setChooseStatusList(new Array(workList.length).fill(false))
    setAllChosen(false)
    setChosenWorkList([])
  }

  // 选中作品，将对应的作品选中状态取反
  const choose = (id: string) => {
    setChooseStatusList((prev) => {
      const targetIndex = workList.findIndex((item) => item.id === id)
      return prev.map((item, index) => (index === targetIndex ? !item : item))
    })
  }
  // 全选或取消全选
  const chooseAllWorks = (e: RadioChangeEvent) => {
    setAllChosen(e.target.value)
    setChooseStatusList(new Array(workList.length).fill(e.target.value))
  }
  // 单个作品取消收藏
  const cancelSingleWork = (id: string) => {
    setChosenWorkList([id])
    cancelConfirm([id])
  }
  // 单个作品移动
  const moveSingleWork = (id: string) => {
    setChosenWorkList([id])
    setMoveModalStatus(true)
  }
  // 单个作品复制
  const copySingleWork = (id: string) => {
    setChosenWorkList([id])
    setCopyModalStatus(true)
  }

  useEffect(() => {
    if (settingStatus) return
    setChooseStatusList(new Array(workList.length).fill(false))
    setAllChosen(false)
    setChosenWorkList([])
  }, [settingStatus, workList])

  useEffect(() => {
    setChosenWorkList(
      workList.reduce((acc, item, index) => {
        if (chooseStatusList[index]) {
          acc.push(item.id)
        }
        return acc
      }, [] as string[]),
    )
  }, [chooseStatusList])
  //#endregion

  /* ----------Modal相关---------- */
  //#region
  const [moveModalStatus, setMoveModalStatus] = useState(false)
  const [moveFolderId, setMoveFolderId] = useState<string>('')
  const [copyModalStatus, setCopyModalStatus] = useState(false)
  const [copyFolderId, setCopyFolderId] = useState<string>('')

  const cancelConfirm = (idList: string[]) => {
    confirm({
      title: `确定要取消收藏${idList.length === 1 ? '该' : '这些'}作品吗？`,
      icon: <ExclamationCircleFilled />,
      content: '该操作无法撤销',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await handleCancelFavorite(idList)
        messageApi.success('取消收藏成功')
      },
    })
  }

  // 批量取消收藏
  const handleCancelFavorite = async (idList: string[]) => {
    try {
      const promises = idList.map((id) => favoriteActionsAPI({ id, favoriteIds: [folderId!] }))
      await Promise.all(promises)
      await refresh()
      resetSettingStatus()
    } catch (error) {
      console.log('出现错误了喵！！', error)
    }
  }

  // 移动作品
  const onChooseMoveFolder = (e: RadioChangeEvent) => {
    setMoveFolderId(e.target.value)
  }
  const moveConfirm = async (idList: string[], targetId: string) => {
    try {
      await moveFavoriteWorksAPI({ idList, fromId: folderId!, toId: targetId })
      setMoveModalStatus(false)
      await refresh()
      resetSettingStatus()
      messageApi.success('移动成功')
    } catch (error) {
      console.log('出现错误了喵！！', error)
    }
  }
  useEffect(() => {
    if (!moveModalStatus) setMoveFolderId(folderId!)
  }, [moveModalStatus, folderId])

  // 复制作品
  const onChooseCopyFolder = (e: RadioChangeEvent) => {
    setCopyFolderId(e.target.value)
  }
  const copyConfirm = async (idList: string[], targetId: string) => {
    try {
      await copyFavoriteWorksAPI({ idList, toId: targetId })
      setCopyModalStatus(false)
      await refresh()
      resetSettingStatus()
      messageApi.success('复制成功')
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    }
  }
  useEffect(() => {
    if (!copyModalStatus) setCopyFolderId(folderId!)
  }, [copyModalStatus, folderId])
  //#endregion

  return (
    <>
      {contextHolder}
      <div className='relative w-954px flex flex-col items-center'>
        {settingStatus && (
          <div className='w-100% h-16 px-5 flex items-center border-1px border-b-solid border-color-#858585'>
            <Button type='default' onClick={() => setSettingStatus(false)}>
              取消批量编辑
            </Button>
          </div>
        )}
        {settingStatus ? (
          <div className='w-100% h-16 px-5 flex justify-between items-center border-1px border-b-solid border-color-#858585'>
            <div className='flex gap-10px items-center'>
              <Radio.Group value={allChosen} onChange={chooseAllWorks}>
                <Radio value={true}>全选</Radio>
                <Radio value={false}>取消全选</Radio>
              </Radio.Group>
              <Button
                disabled={chosenWorkList.length === 0}
                type='link'
                onClick={() => cancelConfirm(chosenWorkList)}>
                取消收藏
              </Button>
              <Button
                disabled={chosenWorkList.length === 0}
                type='link'
                onClick={() => setMoveModalStatus(true)}>
                移动到
              </Button>
              <Button
                disabled={chosenWorkList.length === 0}
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
              <Button type='link' onClick={() => setSettingStatus(true)}>
                批量操作
              </Button>
              {searchStatus && (
                <Button type='link' onClick={handleCancelSearch}>
                  取消搜索
                </Button>
              )}
              <Search
                value={keyword}
                placeholder='输入作品名称'
                onChange={(e) => setKeyword(e.target.value)}
                onSearch={onSearch}
              />
            </div>
          </div>
        )}

        {workList.length === 0 ? (
          <Empty text={searchStatus ? '没有找到相关作品' : '暂无作品，快去收藏一些吧~'} />
        ) : (
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
        )}

        <Pagination total={total} pageSize={12} current={current} onChange={onPageChange} />
      </div>

      <Modal
        title='移动作品'
        width='420px'
        open={moveModalStatus}
        okText='移动'
        cancelText='取消'
        onOk={() => moveConfirm(chosenWorkList, moveFolderId)}
        onCancel={() => setMoveModalStatus(false)}>
        <div className='h-110 overflow-y-scroll'>
          <Radio.Group className='w-full' onChange={onChooseMoveFolder} value={moveFolderId}>
            {favoriteList.map((item) => (
              <Radio
                disabled={item.id === folderId}
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
        onOk={() => copyConfirm(chosenWorkList, copyFolderId)}
        onCancel={() => setCopyModalStatus(false)}>
        <div className='h-110 overflow-y-scroll'>
          <Radio.Group className='w-full' onChange={onChooseCopyFolder} value={copyFolderId}>
            {favoriteList.map((item) => (
              <Radio
                disabled={item.id === folderId}
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
