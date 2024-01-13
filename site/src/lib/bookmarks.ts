import path from 'path'
import fs from 'fs'
import { getFavicon } from './external'

const bookmarksContent = path.join(process.cwd(), 'bookmarks.json')

type Bookmark = {
  url: string
  domain: string
  title: string
  date: Date
  favicon?: string
}

export const getBookmarks = async (): Promise<Bookmark[]> => {
  const bookmarks = await fs.promises.readFile(bookmarksContent, 'utf8')
  try {
    const bm = JSON.parse(bookmarks)
    for (let i = 0; i < bm.length; i++) {
      const favicon = await getFavicon(bm[i].url)
      bm[i].favicon = favicon
      bm[i].domain = new URL(bm[i].url).hostname
      bm[i].date = new Date(bm[i].date)
    }
    return bm
  } catch (err) {
    return []
  }
}
