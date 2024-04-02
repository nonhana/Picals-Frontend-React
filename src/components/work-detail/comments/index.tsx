import { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import type { AppState } from '@/store/types'
import Comment from './comment'
import InputWindow from './input-window'
import type { CommentItem } from '@/utils/types'
import { workCommentList } from '@/test/data'
import { Input, Button } from 'antd'

type CommentsProps = {
  loading: boolean
}

interface Replying {
  id: string
  isChild: boolean
  parent_id?: string
}

const Comments: FC<CommentsProps> = ({ loading }) => {
  const userInfo = useSelector((state: AppState) => state.user.userInfo)
  const totalCount = 1000
  const [commentList, setCommentList] = useState<CommentItem[]>([])
  const [content, setContent] = useState('')

  const [replyData, setReplyData] = useState<Replying>({
    id: '',
    isChild: false,
  })
  const [replyTo, setReplyTo] = useState('')

  const [showWindow, setShowWindow] = useState(false)

  const inputRef = useRef<HTMLDivElement | null>(null)
  const [inputIsInWindow, setInputIsInWindow] = useState(false)
  let inputRefObserver: IntersectionObserver | null = null

  const workInfoRef = useRef<HTMLElement | null>(null)
  const [workInfoIsInWindow, setWorkInfoIsInWindow] = useState(false)
  let workInfoRefObserver: IntersectionObserver | null = null

  useEffect(() => {
    setCommentList(workCommentList)
  })

  useEffect(() => {
    if (!loading) workInfoRef.current = document.getElementById('work-info')
    if (workInfoRef.current) {
      workInfoRefObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setWorkInfoIsInWindow(true)
          } else {
            setWorkInfoIsInWindow(false)
          }
        })
      })
      workInfoRefObserver.observe(workInfoRef.current)
      return () => {
        workInfoRefObserver?.disconnect()
      }
    }
  }, [loading])

  useEffect(() => {
    if (inputRef.current) {
      inputRefObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInputIsInWindow(true)
          } else {
            setInputIsInWindow(false)
          }
        })
      })
      inputRefObserver.observe(inputRef.current)
      return () => {
        inputRefObserver?.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    setShowWindow((!inputIsInWindow && !workInfoIsInWindow) || replyData.id !== '')
  }, [inputIsInWindow, workInfoIsInWindow, replyData])

  const reply = (data: Replying) => {
    if (replyData.id === data.id) {
      setReplyData({
        id: '',
        isChild: false,
      })
      setReplyTo('')
      return
    }
    setReplyData((prevReplyData) => ({ ...prevReplyData, id: data.id }))
    if (data.isChild) {
      setReplyData((prevReplyData) => ({
        ...prevReplyData,
        isChild: true,
        parent_id: data.parent_id,
      }))
      commentList.forEach((comment) => {
        if (comment.childComments) {
          comment.childComments.forEach((child) => {
            if (child.id === data.id) {
              setReplyTo(child.authorInfo.username)
            }
          })
        }
      })
    } else {
      setReplyData((prevReplyData) => ({ ...prevReplyData, isChild: false }))
      commentList.forEach((comment) => {
        if (comment.id === data.id) {
          setReplyTo(comment.authorInfo.username)
        }
      })
    }
  }

  const submitComment = (content: string) => {
    console.log(content)
  }

  return (
    <div>
      <div className='flex gap-10px items-center'>
        <span className='font-size-18px font-bold color-#3d3d3d'>评论</span>
        <span className='font-size-14px color-#6d757a'>目前共有{totalCount}条评论</span>
      </div>
      <div ref={inputRef} className='my-5 flex justify-between items-center'>
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
            placeholder='随便写点东东吧~'
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <Button shape='round' size='large' type='primary' onClick={() => submitComment(content)}>
          发布评论
        </Button>
      </div>
      {commentList.map((comment) => (
        <Comment key={comment.id} comment={comment} reply={reply} />
      ))}
      <InputWindow replyTo={replyTo} showWindow={showWindow} onSubmit={submitComment} />
    </div>
  )
}

export default Comments
