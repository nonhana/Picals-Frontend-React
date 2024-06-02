import { FC } from 'react'
import { ProgressBar } from 'react-loader-spinner'
import { CSSTransition } from 'react-transition-group'

type LoadingProps = {
  loading: boolean
  text?: string
}

const Loading: FC<LoadingProps> = ({ loading, text }) => {
  return (
    <CSSTransition in={loading} timeout={300} classNames='opacity-gradient' unmountOnExit>
      <div className='absolute z-9999 top-0 left-0 w-full h-full bg-white bg-op-64 flex items-center justify-center'>
        <div className='flex flex-col gap-10px items-center'>
          <ProgressBar visible={true} height='80' width='80' />
          {text && <span>{text}</span>}
        </div>
      </div>
    </CSSTransition>
  )
}

export default Loading
