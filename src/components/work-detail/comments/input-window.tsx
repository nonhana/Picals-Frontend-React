import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import { CSSTransition } from 'react-transition-group'
import { Button, Input } from 'antd'

type InputWindowProps = {
  showWindow: boolean
  replyTo: string
  onSubmit: (content: string) => void
}

const InputWindow: FC<InputWindowProps> = ({ showWindow, onSubmit, replyTo }) => {
  const userInfo = useSelector((state: AppState) => state.user.userInfo)
  const [content, setContent] = useState('')

  return (
    <CSSTransition in={showWindow} timeout={300} classNames='down-to-up' unmountOnExit>
      <div className='rd-10px box-content m-l--5 fixed bottom-5 bg-#fff b-solid b-1px p-5 w-150 flex justify-between items-center'>
        <div className='flex gap-10px items-center'>
          <div className='shrink-0 w-10 h-10 rd-full overflow-hidden cursor-pointer'>
            <img
              className='w-full h-full object-cover'
              src={userInfo.avatar}
              alt={userInfo.username}
            />
          </div>
          <Input
            className='w-90'
            size='large'
            placeholder={replyTo ? `回复${replyTo}：` : '随便写点东东吧~'}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <Button shape='round' size='large' type='primary' onClick={() => onSubmit(content)}>
          发布评论
        </Button>
      </div>
    </CSSTransition>
  )
}

export default InputWindow
