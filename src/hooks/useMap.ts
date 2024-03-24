import { useState } from 'react'
import { message } from 'antd'

type MapType<T> = Map<string, T>

export function useMap<T extends object>(
  initialItems: T[],
): [MapType<T>, (id: string, newItem: T) => void, (id: string) => void] {
  const convertArrayToMap = (items: T[]): MapType<T> => {
    const map = new Map<string, T>()
    items.forEach((item) => {
      if (!('id' in item)) {
        message.error('Every item in the array should have a field named "id"!')
        return
      }
      map.set(String(item.id), item)
    })
    return map
  }

  const [map, setMap] = useState<MapType<T>>(convertArrayToMap(initialItems))

  const updateItem = (id: string, newItem: T) => {
    setMap((prev) => {
      const newMap = new Map(prev)
      newMap.set(id, newItem)
      return newMap
    })
  }

  const deleteItem = (id: string) => {
    setMap((prev) => {
      const newMap = new Map(prev)
      newMap.delete(id)
      return newMap
    })
  }

  return [map, updateItem, deleteItem]
}
