import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import type { CommentItem } from '@/utils/types'
import { Icon } from '@iconify/react'
import { Button } from 'antd'

interface Replying {
  id: string
  isChild: boolean
  parent_id?: string
}

type CommentProps = {
  comment: CommentItem
  reply: (replyData: Replying) => void
  style?: React.CSSProperties
}

const Comment: FC<CommentProps> = ({ comment, style, reply }) => {
  const userInfo = useSelector((state: AppState) => state.user.userInfo)
  const [showChildComments, setShowChildComments] = useState(false)

  const handleReply = (id: string, isChild: boolean, parent_id?: string) => {
    reply({
      id,
      isChild,
      parent_id,
    })
  }

  return (
    <>
      <div style={style} className='relative w-150 flex gap-10px mb-20px'>
        <div className='shrink-0 w-10 h-10 rd-full overflow-hidden cursor-pointer'>
          <img
            className='w-full h-full object-cover'
            src={comment.authorInfo.avatar}
            alt={comment.authorInfo.username}
          />
        </div>
        <div className='flex flex-col gap-10px'>
          <div className='flex items-center font-bold font-size-14px'>
            <span className='color-#3d3d3d'>{comment.authorInfo.username}</span>
            {comment.authorInfo.id === userInfo.id && <span className='color-red'>（你）</span>}
            {comment.level === 1 && comment.replyTo && (
              <>
                <Icon width='20px' color='#858585' icon='ant-design:caret-right-filled' />
                <span>{comment.replyTo.username}</span>
                {comment.replyTo.id === userInfo.id && <span className='color-red'>（你）</span>}
              </>
            )}
          </div>
          <div className='line-height-normal font-size-14px color-#3d3d3d text-wrap'>
            <span>{comment.content}</span>
          </div>
          <div className='font-size-14px color-#6d757a'>
            <span>{comment.createdAt}</span>
            <Button size='small' type='link' onClick={() => handleReply(comment.id, false)}>
              回复
            </Button>
            {comment.level === 0 && (
              <Button
                size='small'
                type='link'
                onClick={() => setShowChildComments(!showChildComments)}>
                {showChildComments ? '收起' : '展开'}
              </Button>
            )}
          </div>
        </div>
      </div>
      {comment.childComments && showChildComments && (
        <div>
          {comment.childComments.map((childComment) => (
            <Comment
              style={{
                marginLeft: '50px',
                width: '550px',
              }}
              key={childComment.id}
              comment={childComment}
              reply={() => handleReply(childComment.id, true, comment.id)}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Comment
