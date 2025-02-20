/**
 * @description 判断某个插画家的主页地址是否为 Pixiv 用户
 * @description 符合如 https://www.pixiv.net/users/000000 形式的地址
 * @param homeUrl - 插画家的主页地址
 * @returns 是否为 Pixiv 用户
 */
export function verifyPixivUser(homeUrl: string): boolean {
  return /^https:\/\/www.pixiv.net\/users\/\d+$/.test(homeUrl)
}

/**
 * @description 判断某个作品地址是否为 Pixiv 作品
 * @description 符合如 https://www.pixiv.net/artworks/00000000 形式的地址
 * @param workUrl - 作品地址
 * @returns 是否为 Pixiv 作品
 */
export function verifyPixivWork(workUrl: string): boolean {
  return /^https:\/\/www.pixiv.net\/artworks\/\d+$/.test(workUrl)
}
