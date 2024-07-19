import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FC } from 'react'
import { PhotoView } from 'react-photo-view'

type FavoriteItemProps = {
  id: string
  src: string
}

const DraggableImg: FC<FavoriteItemProps> = ({ id, src }) => {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id,
    transition: {
      duration: 500,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  })
  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styles}
      className='w-29.5 h-29.5 rd-1 overflow-hidden cursor-pointer'>
      <PhotoView key={id} src={src}>
        <img className='w-full h-full object-cover' src={src} alt={src} />
      </PhotoView>
    </div>
  )
}

export default DraggableImg
