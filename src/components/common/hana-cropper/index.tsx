import { debounce } from 'lodash'
import { FC, useRef, useState } from 'react'
import { ReactCropperElement, Cropper } from 'react-cropper'

import 'cropperjs/dist/cropper.css'
import HanaModal from '../hana-modal'

type HanaCropperProps = {
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
    if (!cropperRef.current) return
    const imageElement = cropperRef.current
    if (!imageElement) return
    const cropper = imageElement.cropper
    setCroppedImg(cropper.getCroppedCanvas().toDataURL())
  }, 100)

  return (
    <HanaModal
      zIndex={3000}
      loading={loading}
      title='裁剪图片'
      visible={visible}
      setVisible={setVisible}
      onOk={() => onSaveHandler(croppedImg)}>
      <Cropper
        src={imgURL}
        ref={cropperRef}
        style={{ height: 500 }}
        guides={false}
        crop={onCrop}
        viewMode={1}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        responsive={true}
        autoCropArea={1}
        aspectRatio={type === 'background' ? 4 / 3 : 1 / 1}
        checkOrientation={false}
      />
    </HanaModal>
  )
}
export default HanaCropper
