import type { FC } from 'react'
import type { ReactCropperElement } from 'react-cropper'
import { debounce } from 'lodash'
import { useRef, useState } from 'react'
import { Cropper } from 'react-cropper'

import HanaModal from '../hana-modal'
import 'cropperjs/dist/cropper.css'

interface HanaCropperProps {
  loading: boolean
  visible: boolean
  setVisible: (visible: boolean) => void
  type: 'avatar' | 'background'
  imgURL: string
  onSaveHandler: (imgURL: string) => void
}

const HanaCropper: FC<HanaCropperProps> = ({
  loading,
  visible,
  setVisible,
  type,
  imgURL,
  onSaveHandler,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null)
  const [croppedImg, setCroppedImg] = useState('')

  const onCrop = debounce(() => {
    if (!cropperRef.current)
      return
    const imageElement = cropperRef.current
    if (!imageElement)
      return
    const cropper = imageElement.cropper
    setCroppedImg(cropper.getCroppedCanvas().toDataURL())
  }, 100)

  return (
    <HanaModal
      zIndex={3000}
      loading={loading}
      title="裁剪图片"
      visible={visible}
      setVisible={setVisible}
      onOk={() => onSaveHandler(croppedImg)}
    >
      <Cropper
        src={imgURL}
        ref={cropperRef}
        style={{ height: 500 }}
        guides={false}
        crop={onCrop}
        viewMode={1}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        responsive
        autoCropArea={1}
        aspectRatio={type === 'background' ? 4 / 3 : 1 / 1}
        checkOrientation={false}
      />
    </HanaModal>
  )
}
export default HanaCropper
