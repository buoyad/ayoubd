export const getFavicon = async (url: string, size: number = 64) => {
  const reqURL = `https://www.google.com/s2/favicons?domain=${url}&sz=${size}`
  const response = await fetch(reqURL)
  let contentType = response.headers.get('Content-Type')
  let buffer = Buffer.from(await response.arrayBuffer())
  return 'data:' + contentType + ';base64,' + buffer.toString('base64')
}
