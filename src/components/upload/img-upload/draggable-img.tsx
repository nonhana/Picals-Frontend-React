import type { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { PhotoView } from 'react-photo-view'

interface FavoriteItemProps {
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
      className="h-29.5 w-29.5 cursor-pointer overflow-hidden rd-1"
    >
      <PhotoView key={id} src={src}>
        <img className="h-full w-full object-cover" src={src} alt={src} />
      </PhotoView>
    </div>
  )
}

export default DraggableImg
