import { TinyColor } from '@ctrl/tinycolor'

export const isWarmHue = (color: string): boolean => {
  const colorObj = new TinyColor(color)
  return colorObj.isLight()
}
