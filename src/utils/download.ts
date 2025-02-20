/**
 * 获取 Blob
 * @param  {string} url - 目标文件地址
 * @return {Promise<Blob>} - 返回 Blob 对象的 Promise
 */
async function getBlob(url: string): Promise<Blob> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`网络请求失败: ${response.statusText}`)
  }
  return response.blob()
}

/**
 * 保存文件
 * @param  {Blob} blob - 需要保存的 Blob 对象
 * @param  {string} filename - 想要保存的文件名称
 */
function saveAs(blob: Blob, filename: string): void {
  const link = document.createElement('a')
  const body = document.body

  link.href = URL.createObjectURL(blob)
  link.download = filename

  // 隐藏链接
  link.style.display = 'none'
  body.appendChild(link)

  link.click()
  body.removeChild(link)

  URL.revokeObjectURL(link.href)
}

/**
 * 下载文件
 * @param  {string} url - 目标文件地址
 * @param  {string} filename - 想要保存的文件名称
 */
export async function download(url: string, filename: string): Promise<void> {
  try {
    const blob = await getBlob(url)
    saveAs(blob, filename)
  }
  catch (error) {
    return Promise.reject(error)
  }
}
