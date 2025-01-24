import AnimatedDiv from '@/components/motion/animated-div'
import { FC } from 'react'
import { ProgressBar } from 'react-loader-spinner'

type LoadingProps = {
  loading: boolean
  text?: string
}

const Loading: FC<LoadingProps> = ({ loading, text }) => {
  return (
    loading && (
      <AnimatedDiv
        type='opacity-gradient'
        className='absolute z-9999 top-0 left-0 w-full h-full bg-white bg-op-64 flex items-center justify-center'>
        <div className='flex flex-col gap-10px items-center'>
          <ProgressBar visible={true} height='80' width='80' />
          {text && <span>{text}</span>}
        </div>
      </AnimatedDiv>
    )
  )
}

export default Loading
