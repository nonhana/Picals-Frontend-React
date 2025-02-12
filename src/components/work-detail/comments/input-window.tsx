import LazyImg from '@/components/common/lazy-img'
import AnimatedDiv from '@/components/motion/animated-div'
import type { AppState } from '@/store/types'
import { Button, Input } from 'antd'
import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { useSelector } from 'react-redux'

interface Replying {
  id: string
  isChild: boolean
  parent_id?: string
}

type InputWindowProps = {
  showWindow: boolean
  replyTo: string
  content: string
  setReplyTo: (replyTo: string) => void
  setReplyData: (replyData: Replying) => void
  setContent: (content: string) => void
  onSubmit: (type: 'up' | 'down') => void
}

const InputWindow: FC<InputWindowProps> = ({
  showWindow,
  content,
  setReplyTo,
  setReplyData,
  setContent,
  onSubmit,
  replyTo,
}) => {
  const { userInfo } = useSelector((state: AppState) => state.user)

  const clearReplyInfo = () => {
    setReplyData({
      id: '',
      isChild: false,
    })
    setReplyTo('')
  }

  return (
    <AnimatePresence>
      {showWindow && (
        <AnimatedDiv
          type='down-to-up'
          className='z-1000 rd-10px box-content m-l--5 fixed bottom-5 bg-white b-solid b-1px p-5 w-150 flex justify-between items-center'>
          <div className='flex gap-10px items-center'>
            <div className='shrink-0 w-10 h-10 rd-full overflow-hidden cursor-pointer'>
              <LazyImg src={userInfo.avatar} alt={userInfo.username} />
            </div>
            <Input
              className={replyTo ? 'w-80' : 'w-90'}
              size='large'
              value={content}
              placeholder={replyTo ? `回复${replyTo}：` : '随便写点东东吧~'}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          {replyTo && (
            <Button shape='round' size='large' type='default' onClick={clearReplyInfo}>
              取消回复
            </Button>
          )}

          <Button shape='round' size='large' type='primary' onClick={() => onSubmit('down')}>
            发布评论
          </Button>
        </AnimatedDiv>
      )}
    </AnimatePresence>
  )
}

export default InputWindow
