/**
 * @description 将 base64 格式的文件转为 File 对象
 * @param base64 - base64 格式的文件
 * @param fileName - 文件名
 * @returns File 对象
 */
export const base64ToFile = (base64: string, fileName: string): File => {
  // 提取 MIME 类型和 base64 数据
  const [mimeTypePart, base64Data] = base64.split(',')
  const mimeType = mimeTypePart.match(/:(.*?);/)![1]

  // 将 base64 数据转换为二进制数据
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)

  // 创建文件对象
  const file = new File([byteArray], `${fileName}.${mimeType.split('/')[1]}`, { type: mimeType })

  return file
}
