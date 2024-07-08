import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import type { CommentItem } from '@/utils/types'
import { Icon } from '@iconify/react'
import { Button } from 'antd'
import LazyImg from '@/components/common/lazy-img'

interface Replying {
  id: string
  isChild: boolean
  parentId?: string
  userId?: string
}

type CommentProps = {
  comment: CommentItem
  style?: React.CSSProperties
  reply: (replyData: Replying) => void
  deleteComment: (id: string) => void
}

const Comment: FC<CommentProps> = ({ comment, style, reply, deleteComment }) => {
  const { id } = useSelector((state: AppState) => state.user.userInfo)
  const [showChildComments, setShowChildComments] = useState(false)

  const handleReply = (id: string, isChild: boolean, parentId?: string, userId?: string) => {
    reply({
      id,
      isChild,
      parentId,
      userId,
    })
  }

  return (
    <>
      <div style={style} className='relative w-150 flex gap-10px mb-20px'>
        <div className='shrink-0 w-10 h-10 rd-full overflow-hidden cursor-pointer'>
          <LazyImg src={comment.authorInfo.avatar} alt={comment.authorInfo.username} />
        </div>
        <div className='w-full flex flex-col gap-10px'>
          <div className='flex items-center font-bold font-size-14px'>
            <span className='color-#3d3d3d'>{comment.authorInfo.username}</span>
            {comment.authorInfo.id === id && <span className='color-red'>（你）</span>}
            {comment.level === 1 && comment.replyTo && (
              <>
                <Icon width='20px' color='#858585' icon='ant-design:caret-right-filled' />
                <span>{comment.replyTo.username}</span>
                {comment.replyTo.id === id && <span className='color-red'>（你）</span>}
              </>
            )}
          </div>
          <div className='line-height-normal font-size-14px color-#3d3d3d text-wrap'>
            <span>{comment.content}</span>
          </div>
          <div className='w-full flex justify-between items-center font-size-14px color-#858585'>
            <div>
              <span>{comment.createdAt}</span>
              <Button size='small' type='link' onClick={() => handleReply(comment.id, false)}>
                回复
              </Button>
              {comment.level === 0 && comment.childComments?.length !== 0 && (
                <Button
                  size='small'
                  type='link'
                  onClick={() => setShowChildComments(!showChildComments)}>
                  {showChildComments ? '收起' : '展开'}
                </Button>
              )}
            </div>
            <div className='flex items-center gap-10px'>
              <span>
                {comment.childComments &&
                  comment.childComments?.length !== 0 &&
                  `共有${comment.childComments.length}条${comment.level === 0 ? '回复' : '评论'}`}
              </span>

              {comment.authorInfo.id === id && (
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    deleteComment(comment.id)
                  }}>
                  <Icon width={24} icon='ant-design:delete-outlined' />
                </div>
              )}
            </div>
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
              reply={() => handleReply(childComment.id, true, comment.id, comment.authorInfo.id)}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Comment
