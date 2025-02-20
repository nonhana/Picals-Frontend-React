import { TinyColor } from '@ctrl/tinycolor'

export function isWarmHue(color: string): boolean {
  const colorObj = new TinyColor(color)
  return colorObj.isLight()
}
