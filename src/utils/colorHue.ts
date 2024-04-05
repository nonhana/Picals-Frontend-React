function hexToRgb(hex: string): number[] {
  const sanitizedHex = hex.replace('#', '')
  const bigint = parseInt(sanitizedHex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

export function isWarmHue(color: string): boolean {
  let rgbArray: number[]
  if (color.startsWith('rgb')) {
    const rgbValue = color.replace('rgb(', '').replace(')', '')
    rgbArray = rgbValue.split(',').map((num) => parseInt(num.trim(), 10))
  } else if (color.startsWith('#')) {
    rgbArray = hexToRgb(color)
  } else {
    throw new Error('Unsupported color format. Please use RGB or HEX format.')
  }
  const grayLevel = rgbArray[0] * 0.299 + rgbArray[1] * 0.587 + rgbArray[2] * 0.114
  if (grayLevel >= 192) {
    return true
  } else {
    return false
  }
}
