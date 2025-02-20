/**
 * @description 将 base64 格式的文件转为 File 对象
 * @param base64 - base64 格式的文件
 * @param fileName - 文件名
 * @returns File 对象
 */
export function base64ToFile(base64: string, fileName: string): File {
  const [mimeTypePart, base64Data] = base64.split(',')
  const mimeType = mimeTypePart.match(/:(.*?);/)![1]

  const byteCharacters = atob(base64Data)
  const byteNumbers = Array.from({ length: byteCharacters.length })
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)

  const file = new File([byteArray], `${fileName}.${mimeType.split('/')[1]}`, { type: mimeType })

  return file
}
